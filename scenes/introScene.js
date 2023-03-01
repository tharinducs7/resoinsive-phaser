// import { GALLERY } from '../assets/images/index.js';

export default class Intro extends Phaser.Scene {

    // Vars
    handlerScene = false
    sceneStopped = false

    constructor() {
        super({ key: 'Intro' })
    }

    preload() {
        this.sceneStopped = false
        this.width = this.game.screenBaseSize.width
        this.height = this.game.screenBaseSize.height
        this.handlerScene = this.scene.get('handler')
        this.handlerScene.sceneRunning = 'Intro'
    }

    makeLayout() {
        this.add.image(this.width / 2, this.height / 2, 'background').setOrigin(.5)

        this.curtainContainer = this.add.container(this.width / 2, this.height / 2.3);
        this.curtainContainer.setSize(500, 500).setAlpha(0);

        this.galleryCurtainLeft = this.add.image(-140, 0, 'Curtain_Left').setOrigin(.5).setScale(0.25)
        this.galleryCurtainRight = this.add.image(110, 0, 'Curtain_Right').setOrigin(.5).setScale(0.25)

        this.curtainContainer.add([
            this.galleryCurtainLeft,
            this.galleryCurtainRight
        ])

        this.dummy = this.add.image(this.width / 2.2, this.height / 3, 'dummy').setOrigin(.5).setScale(1).setAlpha(0)
       
        this.beams = this.add.image(this.width / 2, this.height / 2, 'beams').setOrigin(.5).setScale(.16)
        this.fg = this.add.image(this.width / 2, this.height / 2, 'foreground').setOrigin(.5).setScale(.6)

        this.imageGroup = this.add.group();
        this.imageGroup.addMultiple([this.beams, this.fg]);
        //this.imageGroup.setTint(0xff0000);

        this.prize = this.add.image(this.width / 2.2, this.height / 1.7, 'prize').setOrigin(.5).setScale(1).setAlpha(0)

        let lights = this.add.image(0, 0, 'lights').setOrigin(.5).setScale(0.5)
        console.log(lights, "lights");
        //   lights.setScale(0.5);
        console.log(lights, "lights");
        lights.displayWidth = this.width * 5;
        lights.displayHeight = this.height;
        //  this.add.image(this.width / 2, this.height / 2, 'Curtain_Left').setOrigin(.5).setScale(1)

        this.overlayContainer = this.add.container(this.width / 2, this.height / 2);
        this.overlayContainer.setSize(500, 500);
        let overlayBoxImage = this.add.image(0, 0, 'overlayBox').setOrigin(.5).setScale(0.2)
        let text = this.add
            .text(0, 0, "test", {
                fontSize: 30,
                color: '#FED659',
            })
            .setAlign('center')
            .setOrigin(0.5, 0.5);
        this.overlayContainer.add(overlayBoxImage)
        this.overlayContainer.add(text)

        this.overlayContainer.setInteractive().on('pointerdown', () => {
            this.foregroundTween.timeScale = 10;
            this.overlayContainer.setAlpha(0)
            this.curtainContainer.setAlpha(1)
            let tween = this.tweens.add({
                targets: this.imageGroup,
                scaleX: 1,   // set the target X scale to 2 times the starting scale
                scaleY: 1,   // set the target Y scale to 2 times the starting scale
                duration: 1000,  // set the duration of the tween animation to 1 second
                ease: 'Linear',  // set the easing function for the tween animation
            });


            const cam = this.cameras.main;
            cam.pan(this.width / 2, this.height / 2, 2000, 'Power2');
            cam.zoomTo(1, 3000);
            this._setupCurtainAnimations()
            
            this.dummy.setAlpha(1)
            this.prize.setAlpha(1)
        });

    }

    create() {
        const { width, height } = this
        // CONFIG SCENE         
        this.handlerScene.updateResize(this)
        if (this.game.debugMode)
            this.add.image(0, 0, 'guide').setOrigin(0).setDepth(1)
        // CONFIG SCENE 

        // GAME OBJECTS  
        this.configWidth = this.game.config.width;
        this.configHeight = this.game.config.height;

        this.makeLayout();
        this.setupForegroundAnimations()
        this.setupBeamAnimations()
        // GAME OBJECTS  
    }

    _setupCurtainAnimations() {
        this.tweens.add({
            targets: this.galleryCurtainLeft,
            // alpha: { value: 1, duration: 600 },
            x: this.galleryCurtainLeft.x - 200,
            scaleX: this.galleryCurtainLeft.scaleX * 0.1,
            duration: 1000,
            ease: 'Linear',
        });

        this.tweens.add({
            targets: this.galleryCurtainRight,
            //alpha: { value: 1, duration: 600 },
            x: this.galleryCurtainRight.x + 120,
            scaleX: -this.galleryCurtainRight.scaleX * -0.1,
            duration: 1000,
            ease: 'Linear',
        });
    }

    setupForegroundAnimations() {
        let destinationX =
            this.fg.x + this.fg.width / 20;

        this.foregroundTween = this.tweens.add({
            targets: this.fg,
            x: destinationX,
            ease: 'Sine.easeInOut',
            duration: 10000,
        });
    }

    setupBeamAnimations() {
        this.beams.x = this.beams.x + 200;
        let destinationX = this.beams.x;
        console.log(destinationX);
        this.tweens.add({
            targets: this.beams,
            x: destinationX,
            ease: 'Sine.easeInOut',
            duration: 9900,
        });
    }
}

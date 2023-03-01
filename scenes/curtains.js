export default class Curtains extends Phaser.Scene {

    // Vars
    handlerScene = false
    sceneStopped = false

    constructor() {
        super({ key: 'Curtains' })
    }

    preload() {
        this.sceneStopped = false
        this.width = this.game.screenBaseSize.width
        this.height = this.game.screenBaseSize.height
        this.handlerScene = this.scene.get('handler')
        this.handlerScene.sceneRunning = 'Curtains'
    }

    create() {
        const { width, height } = this
        // CONFIG SCENE         
        this.handlerScene.updateResize(this)
        if (this.game.debugMode)
            this.add.image(0, 0, 'guide').setOrigin(0).setDepth(1)
        // CONFIG SCENE 

        const cam = this.cameras.main;
        // this.cameras.main.zoomTo(3, 1000); // Zoom to a scale of 2 over 1000ms
        // this.cameras.main.zoomTo(3, 1000, 'Linear', { x: 1000, y: 2000 });

        // //  cam.alpha = 0.5;
        cam.pan(this.width / 2, this.height / 2 - 100, 2000, 'Power2');
        cam.zoomTo(2.3, 3000);
        
        // GAME OBJECTS  
        this.curtainContainer = this.add.container(this.width / 2, this.height / 2.3);
        this.curtainContainer.setSize(500, 500);

        let cleft = this.add.image(-140, 0, 'Curtain_Left').setOrigin(.5).setScale(0.25)
        let rleft = this.add.image(110, 0, 'Curtain_Right').setOrigin(.5).setScale(0.25)

        this.curtainContainer.add([
            cleft,
            rleft
        ])
        // GAME OBJECTS  
    }
}

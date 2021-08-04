import Phaser from "phaser";

let play;
let howtoplay;


class MainMenu extends Phaser.Scene {
    constructor(test) {
        super({
            key: 'MainMenu'
        });
    }

    preload() {
        this.load.image('play', 'src/image/play.png');
        this.load.image('howtoplay', 'src/image/howtoplay.png');

    }

    create() {
        //Show X Y
        this.label = this.add.text(0, 0, '(x, y)', { fontFamily: '"Monospace"' })
            .setDepth(100);
        this.pointer = this.input.activePointer;

        play = this.physics.add.image(this.game.renderer.width / 2, 350, 'play')
            .setScale(0.25);
        play.setInteractive();
        play.on('pointerdown', () => {
            this.scene.start('GameScene')
        })

        howtoplay = this.physics.add.image(this.game.renderer.width / 2, 450, 'howtoplay')
            .setScale(0.25);
        howtoplay.setInteractive();
        howtoplay.on('pointerdown', () => {
            // this.scene.start('GameScene') //รอหน้า Tutorial
        })

    }



    update(delta, time) {
        //Show X Y
        this.label.setText('(' + this.pointer.x + ', ' + this.pointer.y + ')');


    }
}

export default MainMenu;

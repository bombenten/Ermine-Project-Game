import Phaser from "phaser";

let gameOver;
let tryAgain;

class GameOver extends Phaser.Scene {
    constructor(test) {
        super({
            key: 'GameOver'
        });
    }

    preload() {
        this.load.image('gameOver', 'src/image/gameOver.png');
        this.load.image('tryAgain', 'src/image/tryAgain.png');

    }

    create() {
        //Show X Y
        this.label = this.add.text(0, 0, '(x, y)', { fontFamily: '"Monospace"' })
            .setDepth(100);
        this.pointer = this.input.activePointer;

        gameOver = this.physics.add.image(650, 350, 'gameOver')
            .setScale(3);
        gameOver.setInteractive();
        gameOver.on('pointerdown', () => {
            location.reload();
        })

        tryAgain = this.physics.add.image(650, 450, 'tryAgain')
            .setScale(0.7)
            .setSize(415,85)
            .setOffset(35,30);
        tryAgain.setInteractive();
        tryAgain.on('pointerdown', () => {
            this.scene.start('GameScene')
        })
        
    }



    update(delta, time) {
        //Show X Y
        this.label.setText('(' + this.pointer.x + ', ' + this.pointer.y + ')');


    }
}

export default GameOver;

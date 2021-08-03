import Phaser from "phaser";

let gameOver;

class GameOver extends Phaser.Scene {
    constructor(test) {
        super({
            key: 'GameOver'
        });
    }

    preload() {
        this.load.image('gameOver', 'src/image/gameOver (2).png');
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
            this.scene.start('GameScene')
            location.reload();
        })

    }



    update(delta, time) {
        //Show X Y
        this.label.setText('(' + this.pointer.x + ', ' + this.pointer.y + ')');


    }
}

export default GameOver;

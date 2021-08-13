import Phaser from "phaser";

let ermine;

class Defualt extends Phaser.Scene {
    constructor(test) {
        super({
            key: 'Defualt'
        });
    }

    preload() {
        this.load.spritesheet('ermineMain', 'src/image/TestErmin.png',
        { frameWidth: 500, frameHeight: 300 });
    }

    create() {
        ermine = this.physics.add.sprite(190, 360, 'ermineMain').setScale(0.5)
        .setSize(250, 80)
        .setOffset(200, 150);
    }

    update(delta, time) {
    }
}

export default Defualt;

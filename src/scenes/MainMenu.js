import Phaser from "phaser";

let play;
let howtoplay;
let logo;
let arcade;
let game;
let story;
let backGround;
let middleGround;
let foreGround;
let gameLogo;

class MainMenu extends Phaser.Scene {
    constructor(test) {
        super({
            key: 'MainMenu'
        });
    }

    preload() {
        this.load.image('backGround','src/image/BG ermine.png');
        this.load.image('midGround','src/image/MG ermine.png');
        this.load.image('story', 'src/image/story.png');
        this.load.image('howtoplay', 'src/image/how to button.png');
        this.load.image('logo','src/image/logo.png');
        this.load.image('arcade','src/image/Arcade.png');
        this.load.image('foreGround','src/image/FG ermine.png');
        this.load.image('game','src/image/on top logo.png');

        }

    create() {
        //Show X Y
        this.label = this.add.text(0, 0, '(x, y)', { fontFamily: '"Monospace"' })
            .setDepth(100);
        this.pointer = this.input.activePointer;


        middleGround = this.add.tileSprite(0, -300, 1280, 720, 'midGround')
            .setOrigin(0, 0)
            .setScale(1, 1.5);

        foreGround = this.add.tileSprite(0, 0, 1600, 720, 'foreGround')
            .setOrigin(0, 0)
            .setDepth(3000);
            
        backGround = this.add.tileSprite(0, -50, 1280, 720, 'backGround')
            .setOrigin(0, 0)

        logo=this.add.image(this.game.renderer.width/2,150,'logo')
            .setScale(0.4);

        gameLogo=this.add.image(this.game.renderer.width/2+300,250,'game')
            .setScale(0.08)
            .rotation= -0.3;

        story = this.physics.add.image(this.game.renderer.width / 2 -200, 400, 'story')
            .setSize(200,100);
        story.setInteractive();
        story.on('pointerdown', () => {
            this.scene.start('GameScene')
        })

        arcade=this.physics.add.image(this.game.renderer.width/2+200,400,'arcade')
        .setSize(200,100);
        arcade.setInteractive();
        arcade.on('pointerdown',()=>{
            this.scene.start('GameScene');
        })

        howtoplay = this.physics.add.image(this.game.renderer.width / 2, 540, 'howtoplay')
            .setSize(400,100)
            .setScale(0.8);
        howtoplay.setInteractive();
        howtoplay.on('pointerdown', () => {
            // this.scene.start('GameScene') //รอหน้า Tutorial
        });
    }



    update(delta, time) {
        //Show X Y
        this.label.setText('(' + this.pointer.x + ', ' + this.pointer.y + ')');
    }
}

export default MainMenu;

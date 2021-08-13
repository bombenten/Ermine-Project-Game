import Phaser from "phaser";

let play;
let howtoplay;
let logo;
let arcade;
let story;
let backGround;
let middleGround;
let foreGround;
let gameLogo;
let ermineMenu;
let snowman;
let golem;


class MainMenu extends Phaser.Scene {
    constructor(test) {
        super({
            key: 'MainMenu'
        });
    }

    preload() {
        this.load.image('backGround','src/image/BG ermine.png');
        this.load.image('midGround','src/image/MG ermine.png');
        this.load.image('foreGround','src/image/FG ermine.png');

        this.load.image('logo','src/image/logo.png');
        this.load.image('game','src/image/on top logo.png');

        this.load.image('arcade','src/image/Arcade.png');
        this.load.image('howtoplay', 'src/image/how to button.png');
        this.load.image('story', 'src/image/story.png');
        this.load.image('play','src/image/button.png');

        this.load.spritesheet('ermineMenu', 'src/image/ermineAll.png',
            { frameWidth: 500, frameHeight: 300 });
        this.load.spritesheet('snowman', 'src/image/Snowman.png',
            { frameWidth: 1000, frameHeight: 1000 });
        this.load.spritesheet('golem','src/image/Golem-Sprite-sheet.png',{
            frameWidth: 1000, frameHeight:1000});
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

        ermineMenu = this.physics.add.sprite(-500, 450, 'ermineMenu')
            .setScale(0.5)
            .setSize(250, 80)
            .setOffset(200, 150);
            let ermineAni = this.anims.create({
                key: 'ermineMenuAni',
                frames: this.anims.generateFrameNumbers('ermineMenu', {
                    start: 0,
                    end: 3
                }),
                duration: 450,
                framerate: 10,
                repeat: -1
            })
            ermineMenu.anims.play('ermineMenuAni', true);
            ermineMenu.setVelocityX(300);

        play=this.physics.add.image(this.game.renderer.width/2,400,'play')
            .setSize(200,100);
        play.setInteractive();
        play.on('pointerdown',()=>{
            play.destroy();
            story = this.physics.add.image(this.game.renderer.width / 2 -200, 400, 'story')
            .setSize(200,100);
            story.setInteractive();
            story.on('pointerdown', () => {
                this.scene.start('Defualt');
                this.scene.destroy();
                // this.ermineAni.ermineAni();
            })

            arcade=this.physics.add.image(this.game.renderer.width/2+200,400,'arcade')
                .setSize(200,100);
            arcade.setInteractive();
            arcade.on('pointerdown',()=>{
                this.scene.start('Defualt');
            })
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

        if(ermineMenu.x>this.game.renderer.width+200){
            ermineMenu.destroy();
        }
    }
}

export default MainMenu;

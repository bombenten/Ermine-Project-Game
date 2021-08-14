import Phaser from "phaser";

//button
let play;
let howtoplay;
let logo;
let arcade;
let story;
//BG
let backGround;
let middleGround;
let foreGround;
//Logo
let gameLogo;
//Character
let ermineMenu;
let ermineMenuFlip;
let snowmanMenu1;
let snowmanMenu2;
let golemMenu;
//Character Group
let ermineGroup;
//Event
let ermineEvent;

class MainMenu extends Phaser.Scene {
    constructor(test) {
        super({
            key: 'MainMenu'
        });
    }

    preload() {
        //Back Ground
        this.load.image('backGround', 'src/image/BG ermine.png');
        this.load.image('midGround', 'src/image/MG ermine.png');
        this.load.image('foreGround', 'src/image/FG ermine.png');
        //Logo
        this.load.image('logo', 'src/image/logo.png');
        this.load.image('game', 'src/image/on top logo.png');
        //Button
        this.load.image('arcade', 'src/image/Arcade.png');
        this.load.image('howtoplay', 'src/image/how to button.png');
        this.load.image('story', 'src/image/story.png');
        this.load.image('play', 'src/image/button.png');
        //Character
        this.load.spritesheet('ermineMenu', 'src/image/ermineAll.png',
            { frameWidth: 500, frameHeight: 300 });
        this.load.spritesheet('snowmanMenu', 'src/image/Snowman.png',
            { frameWidth: 1000, frameHeight: 1000 });
        this.load.spritesheet('golemMenu', 'src/image/Demo2/Demo2/Golem2_sprite.png', {
            frameWidth: 1000, frameHeight: 1000
        });
    }

    create() {
        //Show X Y
        this.label = this.add.text(0, 0, '(x, y)', { fontFamily: '"Monospace"' })
            .setDepth(100);
        this.pointer = this.input.activePointer;

        //create BG
        middleGround = this.add.tileSprite(0, -300, 1280, 720, 'midGround')
            .setOrigin(0, 0)
            .setScale(1, 1.5);
        foreGround = this.add.tileSprite(0, 0, 1600, 720, 'foreGround')
            .setOrigin(0, 0)
            .setDepth(3000);
        backGround = this.add.tileSprite(0, -50, 1280, 720, 'backGround')
            .setOrigin(0, 0)

        //Logo
        logo = this.add.image(this.game.renderer.width / 2, 150, 'logo')
            .setScale(0.4);
        gameLogo = this.add.image(this.game.renderer.width / 2 + 300, 250, 'game')
            .setScale(0.08)
            .rotation = -0.3;

        //Character
        ermineMenu = this.physics.add.sprite(-500, 450, 'ermineMenu')
            .setScale(0.4)
            .setSize(250, 80)
            .setOffset(200, 150);
        ermineMenuFlip = this.physics.add.sprite(this.game.renderer.width + 500, 450, 'erminMenu')
            .setScale(0.4)
            .setSize(250, 80)
            .setOffset(200, 150)
            .setFlipX(true)//hitbox no position
        snowmanMenu1 = this.physics.add.sprite(-300, 350, 'snowmanMenu')
            .setScale(0.2)
            .setSize(340, 145)
            .setOffset(350, 765);
        snowmanMenu2 = this.physics.add.sprite(-300, 450, 'snowmanMenu')
            .setScale(0.2)
            .setSize(340, 145)
            .setOffset(350, 765);

        // //Ermine Animation
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
        ermineMenuFlip.anims.play('ermineMenuAni', true);
        ermineMenu.setVelocityX(300);

        // //Snowman Animation
        let snowmanAni = this.anims.create({
            key: 'snowmanMenuAni',
            frames: this.anims.generateFrameNumbers('snowmanMenu', {
                start: 0,
                end: 7
            }),
            duration: 750,
            framerate: 1,
            repeat: -1
        });
        snowmanMenu1.anims.play('snowmanMenuAni', true);
        snowmanMenu2.anims.play('snowmanMenuAni', true);
        snowmanMenu1.setVelocityX(300);
        snowmanMenu2.setVelocityX(300);



        //Play Button
        play = this.physics.add.image(this.game.renderer.width / 2, 400, 'play')
            .setSize(200, 100);
        play.setInteractive();
        play.on('pointerup', () => {
            play.destroy();
            //Story Button
            story = this.physics.add.image(this.game.renderer.width / 2 - 200, 400, 'story')
                .setSize(200, 100);
            story.setInteractive();
            story.on('pointerup', () => {
                this.scene.start('GameScene');
                this.scene.destroy();
                ermineAni.destroy();
                snowmanAni.destroy();
            })
            //Arcade Buttlon
            arcade = this.physics.add.image(this.game.renderer.width / 2 + 200, 400, 'arcade')
                .setSize(200, 100);
            arcade.setInteractive();
            arcade.on('pointerdown', () => {
                this.scene.start('GameScene');
            })
        })
        //How to play Button
        howtoplay = this.physics.add.image(this.game.renderer.width / 2, 540, 'howtoplay')
            .setSize(400, 100)
            .setScale(0.8);
        howtoplay.setInteractive();
        howtoplay.on('pointerdown', () => {
            // this.scene.start('GameScene') //รอหน้า Tutorial
        });

    }



    update(delta, time) {
        //Show X Y
        this.label.setText('(' + this.pointer.x + ', ' + this.pointer.y + ')');

        if (ermineMenu.x > this.game.renderer.width + 200) {
            ermineMenu.destroy();
            snowmanMenu1.destroy();
            snowmanMenu2.destroy();
            ermineMenuFlip.setVelocityX(-300);
        }
        else if (ermineMenuFlip.x < 0) {
            ermineMenuFlip.destroy();
        }


    }
}

export default MainMenu;

import Phaser from "phaser";

//BG
let frontBG;
let middleBG;
let skybox;

//Character
let ermine;
let snowball;
let snowman;

//Event
let snowEvent;
let snowGroup;
let snowManEvent;
let snowManGroup;

//Controller  
let keyW;
let keyA;
let keyS;
let keyD;
let keyAtk;


class GameScene extends Phaser.Scene {
    constructor(test) {
        super({
            key: 'GameScene'
        });
    }

    preload() {
        //Back ground
        this.load.image('frontBG', 'src/image/front ground.png');
        this.load.image('middleBG', 'src/image/middle ground.png');
        this.load.image('skyblock', 'src/image/SkyBlock.png');

        //Animation
        this.load.spritesheet('ermine', 'src/image/ermine.png',
            { frameWidth: 500, frameHeight: 300 });
        this.load.spritesheet('snowball', 'src/image/snowball.png',
            { frameWidth: 300, frameHeight: 300 });
        this.load.spritesheet('snowman', 'src/image/Snowman.png',
            { frameWidth: 1000, frameHeight: 1000 });

    }

    create() {
        //Show X Y
        this.label = this.add.text(0, 0, '(x, y)', { fontFamily: '"Monospace"' })
            .setDepth(100);
        this.pointer = this.input.activePointer;

        //Create Image
        frontBG = this.add.tileSprite(0, 0, 1600, 720, 'frontBG').setOrigin(0, 0);
        middleBG = this.add.tileSprite(0, 0, 1280, 720, 'middleBG').setOrigin(0, 0);
        skybox = this.physics.add.image(0, 0, 'skyblock')
            .setScale(5, 0.4)
            .setVisible()
            .setImmovable();
        ermine = this.physics.add.sprite(190, 360, 'ermine').setScale(0.5)
            .setScale(0.5)
            .setSize(250, 80)
            .setOffset(200, 150);
        
            //set hitbox เป็นวงกลม
        // snowman.body.setCircle(45); 

        //collider
        this.physics.add.collider(ermine, skybox);



        //ermine Animation
        this.anims.create({
            key: 'ermineAni',
            frames: this.anims.generateFrameNumbers('ermine', {
                start: 0,
                end: 2
            }),
            duration: 450,
            framerate: 1,
            repeat: -1
        })
        ermine.anims.play('ermineAni', true);
        ermine.setCollideWorldBounds(true);

        //Snow Ball Animation
        this.anims.create({
            key: 'snowballAni',
            frames: this.anims.generateFrameNumbers('snowball', {
                start: 0,
                end: 2
            }),
            duration: 750,
            framerate: 1,
            repeat: -1
        })
        
        //create snow group for destroy
        snowGroup = this.physics.add.group();

        //Snow Event
        snowEvent = this.time.addEvent({
            delay: Phaser.Math.Between(1000, 3000),
            callback: function () {
                snowball = this.physics.add.sprite(this.game.renderer.width + 100, Phaser.Math.Between(150, 550), 'snowball')
                    .setScale(0.65)
                    .setSize(230, 60)
                    .setOffset(30, 220);
                snowGroup.add(snowball);
                snowball.setVelocityX(Phaser.Math.Between(-200, -500));
                snowball.anims.play('snowballAni', true);
                this.physics.add.overlap(ermine, snowball, () => {
                    this.scene.start('GameOver');
                });
                snowball.depth = snowball.y;
            },
            callbackScope: this,
            loop: true,
            paused: false
        })

        //Snowman Ball Animation
        this.anims.create({
            key: 'snowmanAni',
            frames: this.anims.generateFrameNumbers('snowman', {
                start: 0,
                end: 7
            }),
            duration: 750,
            framerate: 1,
            repeat: -1
        })

        //create snowman group for destroy
        snowManGroup = this.physics.add.group();

        //Snowman Event
        snowManEvent = this.time.addEvent({
            delay: Phaser.Math.Between(1000, 3000),
            callback: function () {
                snowman = this.physics.add.sprite(1380, Phaser.Math.Between(150, 550), 'snowman')
                    .setScale(0.3)
                    .setSize(340, 145)
                    .setOffset(350, 765);
                snowman.flipX = !snowman.flipX;
                snowManGroup.add(snowman);
                snowman.setVelocityX(Phaser.Math.Between(-300, -800));
                snowman.anims.play('snowmanAni', true);
                this.physics.add.overlap(ermine, snowman, () => {
                    this.scene.start('GameOver');
                });
                snowman.depth = snowman.y;
            },
            callbackScope: this,
            loop: true,
            paused: false
        })


        //Player Control
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        //  keyAtk = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    }



    update(delta, time) {
        //Show X Y
        this.label.setText('(' + this.pointer.x + ', ' + this.pointer.y + ')');

        //set Depth ermine
        ermine.depth = ermine.y - (ermine.height - 254);

        //BG Tile Sprite
        frontBG.tilePositionX += 3;
        middleBG.tilePositionX += 3;

        //Input from keyboard
        if (keyW.isDown) {
            ermine.setVelocityY(-200);
        } else if (keyS.isDown) {
            ermine.setVelocityY(200);
        } else {
            ermine.setVelocityY(0);
        }
        if (keyA.isDown) {
            ermine.setVelocityX(-300);
        } else if (keyD.isDown) {
            ermine.setVelocityX(300);
        } else {
            ermine.setVelocityX(0);
        }

        //destroy snowGroup when x = -150
        for (let i = 0; i < snowGroup.getChildren().length; i++) {
            if (snowGroup.getChildren()[i].x < -150) {
                snowGroup.getChildren()[i].destroy();
            }
        }

        //destroy snowManGroup when x = -150
        for (let i = 0; i < snowManGroup.getChildren().length; i++) {
            if (snowManGroup.getChildren()[i].x < -150) {
                snowManGroup.getChildren()[i].destroy();
            }
        }


    }
}

export default GameScene;

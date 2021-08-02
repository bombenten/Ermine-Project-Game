import Phaser from "phaser";

//BG
let frontBG;
let middleBG;
let skybox;

//Character
let ermine;
let snowball;

//Event
let snowEvent;
let snowGroup;

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
        this.load.image('skyblock','src/image/SkyBlock.png');

        //Animation
        this.load.spritesheet('ermine','src/image/ermine.png',
        { frameWidth: 500 , frameHeight: 300 });
        this.load.spritesheet('snowball','src/image/snowball.png',
        { frameWidth: 300 , frameHeight: 300 });
    }

    create() {
        //Show X Y
        this.label = this.add.text(0, 0, '(x, y)', { fontFamily: '"Monospace"'})
        .setDepth(100); 
        this.pointer = this.input.activePointer;

        //Create Image
        frontBG = this.add.tileSprite(0, 0, 1600, 720, 'frontBG').setOrigin(0,0);
        middleBG = this.add.tileSprite(0, 0, 1280, 720, 'middleBG').setOrigin(0,0);
        skybox = this.physics.add.image(0, 0, 'skyblock')
        .setScale(5,0.4)
        .setVisible()
        .setImmovable();
        ermine = this.physics.add.sprite(190, 360, 'ermine').setScale(0.5)
        .setScale(0.5)
        .setSize(250,100)
        .setOffset(200,125);

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
        
        snowGroup = this.physics.add.group();

        //Snow Event
        snowEvent = this.time.addEvent({
            delay: Phaser.Math.Between(1000, 3000),
            callback: function () {
                snowball = this.physics.add.sprite(1280, Phaser.Math.Between(150 , 550), 'snowball')
                .setScale(0.65)
                .setSize(230,60)
                .setOffset(30,220);
                snowGroup.add(snowball);
                snowball.setVelocityX(Phaser.Math.Between(-200, -500));
                snowball.anims.play('snowballAni', true);
                this.physics.add.collider(ermine, snowGroup, ()=>{
                this.scene.start('GameOver');
        });
                snowball.depth = snowball.y;
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
        ermine.depth = ermine.y - (ermine.height - 254 ) ;

        //BG Tile Sprite
        frontBG.tilePositionX += 3;
        middleBG.tilePositionX += 3;

        //Input from keyboard
        if(keyW.isDown){
            ermine.setVelocityY(-200);
        }else if(keyS.isDown){
            ermine.setVelocityY(200);
        }else{
            ermine.setVelocityY(0);
        }
        if(keyA.isDown){
            ermine.setVelocityX(-300);
        }else if(keyD.isDown){
            ermine.setVelocityX(300);
        }else{
            ermine.setVelocityX(0);
        }

        for(let i = 0; i < snowGroup.getChildren().length; i++){
            if(snowGroup.getChildren()[i].x < -150){
                snowGroup.getChildren()[i].destroy();
            }      
        }


    }
}

export default GameScene;

import Phaser from "phaser";

var logo;
var progressBar;
var progressBox;
class LoadingBar extends Phaser.Scene {
    constructor(test) {
        super({
            key: 'LoadingBar'
        });
    }

    preload() {
        this.load.on('progress',function (value){
            console.log(value);
        });

        this.load.on('fileprogress', function (file) {
            console.log(file.src);
        });
        this.load.on('complete', function () {
            console.log('complete');
        });

        progressBar=this.add.graphics();
        progressBox=this.add.graphics();
        progressBox.fillStyle(0x222222, 0.8);
        progressBox.fillRect(240, 270, 320, 50);
        

        this.load.image('logo','src/image/logo.png');
        for (var i=0;i<10;i++){
            this.load.image('logo'+i,'src/image/logo.png');
        }
    }

    create() {
        logo=this.add.image(640,360,'logo').setScale(0.05);
    }

    update(delta, time) {
    }
}

export default LoadingBar;
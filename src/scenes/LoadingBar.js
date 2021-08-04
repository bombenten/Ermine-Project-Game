import Phaser from "phaser";

var logo;
var progressBar;
var progressBox;
let loadingCount;
class LoadingBar extends Phaser.Scene {
    constructor(test) {
        super({
            key: 'LoadingBar'
        });
    }

    preload() {
        progressBar=this.add.graphics();
        progressBox=this.add.graphics();
        progressBox.fillStyle(0x222222, 0.8);
        progressBox.fillRect(240, 270, 320, 50);

        this.load.on('progress',function (value){
            // console.log(value);
            progressBar.clear();
            progressBar.fillStyle(0xffffff, 1);
            progressBar.fillRect(250, 280, 300 * value, 30);
        });

        // this.load.on('fileprogress', function (file) {
        //     console.log(file.src);
        // });

        this.load.on('complete', function () {
            // console.log('complete');
            progressBar.destroy();
            progressBox.destroy();
        });
        

        this.load.image('logo','src/image/logo.png');
        for (var i=0;i<500;i++){
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
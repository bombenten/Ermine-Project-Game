import 'phaser';
import Phaser from 'phaser';
import GameScene from './scenes/GameScene';
import GameOver from './scenes/GameOver';
<<<<<<< HEAD
import LoadingBar from './scenes/LoadingBar';
import Default from './scenes/Defualt';
=======
import MainMenu from './scenes/MainMenu';
>>>>>>> Bomber


const config = {
    // For more settings see <https://github.com/photonstorm/phaser/blob/master/src/boot/Config.js>
    type: Phaser.WEBGL,
    pixelArt: true,
    roundPixels: true,
    parent: 'content',
    width: 1280,
    height: 720,
    physics: {
        default: 'arcade',
        arcade: {
            debug: true,
            // gravity: {y:300}
        }
    },
    scene: [
<<<<<<< HEAD
        LoadingBar,
=======
        // MainMenu,
>>>>>>> Bomber
        GameScene,
        GameOver,
        Default
    ],

};

const game = new Phaser.Game(config);
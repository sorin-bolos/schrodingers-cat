import Phaser from 'phaser';
import { MyScene } from './MyScene';

let game = null;
let levelClass = null;

export function startTheGameAlready(parentElement){
    game = new Phaser.Game({
        type: Phaser.AUTO,
        width: 960,
        height: 540,
        scale: {
            mode: Phaser.Scale.ScaleModes.FIT
        },
        parent: parentElement,
        physics: {
            default: 'arcade',
        }
    });
    levelClass = MyScene;
    startLevel(levelClass);
}

export function toggleFullscreen() {
    if (game.scale.isFullScreen)
    {
        game.scale.stopFullscreen();
    }
    else
    {
        game.scale.startFullscreen(false);
    }
}

export function restartLevel(){
    startLevel(levelClass);
}

function startLevel(TLevel){
    game.scene.remove("level");
    game.scene.add("level", TLevel, true);
}


import Phaser from 'phaser';
import { TestLevel } from './levels/TestLevel';

let currentLevel = null;
let game = null;

export function startTheGameAlready(parentElement){
    game = createPhasorGame(parentElement);
    startLevel(TestLevel);
}

export function restartLevel(){
    game.scene.remove("level");
    game.scene.add("level", currentLevel, true);
}

function startLevel(LevelClass){
    currentLevel = LevelClass;
    restartLevel();
}

export function toggleFullscreen() {
    game.scale.isFullScreen 
        ? game.scale.stopFullscreen()
        : game.scale.startFullscreen(false)
        ;
}

function createPhasorGame(parentElement){
    return new Phaser.Game({
        type: Phaser.AUTO,
        width: 960,
        height: 540,
        backgroundColor: '#ffffff',
        scale: {
            mode: Phaser.Scale.ScaleModes.FIT
        },
        parent: parentElement,
        physics: {
            default: 'arcade',
        }
    });
}


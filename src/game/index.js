import Phaser from 'phaser';
import { initSpehere, setState } from '../sphere/sphere';
import levelManager from './level-manager';
import { endTime } from './timer';

let game = null;

export function startTheGameAlready(parentElement){
    initSpehere();
    setState(0, 30, 0);
    game = createPhasorGame(parentElement);
    levelManager.setGame(game);
    levelManager.startFirstLevel();
}

export const restartLevel = levelManager.restartLevel;

export function forceTimerEnd() {
    endTime();
}

export function toggleFullscreen() {
    game.scale.isFullScreen 
        ? game.scale.stopFullscreen()
        : game.scale.startFullscreen(false)
        ;
}

function createPhasorGame(parentElement) {
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


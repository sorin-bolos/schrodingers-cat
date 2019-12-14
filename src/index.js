import { KeyObject } from 'crypto';

async function initializeGame(){
    const game = await import('./game');

    const canvas = document.querySelector("main")

    const buttons = {
        //"button.fullscreen": () => game.toggleFullscreen(),
        "button.restart": () => game.restartLevel(),
    };
    
    registerButtons(buttons);

    game.startTheGameAlready(canvas);
}

function registerButtons(buttons){
    for(const key in buttons){
        document.querySelector(key)
        .addEventListener('click', buttons[key]);
    }
}

initializeGame();

// async function trySimulator() {
//     const k = await import('./quantum/ket');
//     const o = await import('./quantum/operator')
//     const s = await import('./quantum/qiskitSimulator');
//     const math = await import('mathjs')

//     let simulator = new s.QiskitSimulator();
//     let state = new k.Ket([1/math.sqrt(2), 1/math.sqrt(2) + "i"])
//     console.log(state);
//     state = await simulator.M(state);
//     console.log(state);
// }

// trySimulator();
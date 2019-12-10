
async function initializeGame(){
    const game = await import('./game');

    const canvas = document.querySelector("main")

    const buttons = {
        "button.fullscreen": () => game.toggleFullscreen(),
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
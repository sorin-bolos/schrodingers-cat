
async function initializeGame(){
    const game = await import('./game');

    document.querySelector("#fullscreenButton").addEventListener('click', () => game.toggleFullscreen());
}


initializeGame();
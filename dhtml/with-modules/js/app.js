import { GameView } from "./DoubleDispatch/view/GameView.js";

const dialogPlayers = document.getElementsByClassName('dialog__players')[0];
dialogPlayers.addEventListener('close', () => {
    const humanPlayers  = dialogPlayers.returnValue;
    gameView.newGame(humanPlayers);
});

const dialogFinished = document.getElementsByClassName('dialog__finished')[0];
dialogFinished.addEventListener('close', () => {
    const response = dialogFinished.returnValue;
    if (response === 'yes') {
        dialogPlayers.showModal();
    }
});

const gameView = new GameView(dialogFinished);

dialogPlayers.showModal();

window.dropToken = function(column) {
    gameView.dropToken(column);
}

window.newGame = function() {
    dialogPlayers.showModal();
}

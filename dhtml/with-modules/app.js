import { GameView } from "./js/DoubleDispatch/view/GameView.js";

const gameView = new GameView();
gameView.newGame();

window.dropToken = function(column) {
    gameView.dropToken(column);
}

window.newGame = function() {
    gameView.newGame();
}
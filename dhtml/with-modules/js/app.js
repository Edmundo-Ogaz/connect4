import { GameView } from "./DoubleDispatch/view/GameView.js";

class Connect4 {

    #gameView = new GameView();
    #newGame = document.querySelector('#new-game');
    #exitGame = document.querySelector('#exit-game');

    constructor() {
        this.#newGame.addEventListener('click', this.#gameView.newGame.bind(this.#gameView));
        this.#exitGame.addEventListener('click', window.close.bind());
        this.#gameView.newGame();
    }
}

window.onload = () => {
	new Connect4();
};

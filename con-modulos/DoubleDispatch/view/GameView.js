import { console } from '../utils/console.js';
import { BoardView } from './BoardView.js';
import { TurnView } from './TurnView.js';

class GameView {

  #game;
  #boardView;
  #turnView;

  constructor(game) {
    this.#game = game;
    this.#boardView = new BoardView(this.#game.getBoard());
    this.#turnView = new TurnView(this.#game.getTurn());
  }

  play() {
    console.writeln(`----- CONNECT4 -----`);
    this.#turnView.configure();
    let gameFinished;
    do {
      this.#boardView.writeln();
      this.#turnView.play();
      gameFinished = this.#game.isFinished();
      if (!gameFinished) {
        this.#game.changeTurn();
      }
    } while (!gameFinished);
    this.#writeResult();
  }

  #writeResult() {
    this.#boardView.writeln();
    console.writeln(this.#game.isWinner() ? `The winner is the player ${this.#game.getCurrentPlayer().getColor()}` : `Tied Game`);
  }
}

export { GameView };
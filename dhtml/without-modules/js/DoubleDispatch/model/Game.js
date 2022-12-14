import { Board } from './Board.js'
import { Turn } from './Turn.js'

class Game {
  #board;

  #turn;

  constructor(humanPlayers) {
    this.#board = new Board();
    this.#turn = new Turn(humanPlayers, this.#board);
  }

  getBoard() {
    return this.#board;
  }

  getTurn() {
    return this.#turn;
  }

  getCurrentPlayer() {
    return this.#turn.getCurrentPlayer();
  }

  changeTurn() {
    this.#turn.changeTurn();
  }
  isWinner() {
    return this.#board.isWinner();
  }

  isFinished() {
    return this.#board.isWinner() || this.#board.isComplete();
  }
}

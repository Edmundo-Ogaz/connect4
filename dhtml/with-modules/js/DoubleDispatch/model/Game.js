import { Board } from './Board.js'
import { Turn } from './Turn.js'

export class Game {

  #board;
  #turn;

  constructor() {
    this.#board = new Board();
    this.#turn = new Turn(this.#board);
  }

  reset(humanPlayers) {
    this.#board.reset();
    this.#turn.reset(humanPlayers);
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

  getCurrentCoordinate() {
    return this.#board.getCurrentCoordinate();
  }

  isWinner() {
    return this.#board.isWinner();
  }

  isFinished() {
    return this.#board.isWinner() || this.#board.isComplete();
  }
}
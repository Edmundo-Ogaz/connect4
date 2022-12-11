import { Board } from './Board.js'
import { Turn } from './Turn.js'

export class Game {

  #board;
  #turn;
  #humanPlayers;

  constructor() {
    this.#board = new Board();
    this.#turn = new Turn(this.#board);
  }

  reset(humanPlayers, colors) {
    this.#board.reset(colors);
    this.#turn.reset(humanPlayers);
    this.#humanPlayers = humanPlayers;
  }

  getBoard() {
    return this.#board;
  }

  getTurn() {
    return this.#turn;
  }

  getHumanPlayers() {
    return this.#humanPlayers;
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
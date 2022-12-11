import { ClosedInterval } from './ClosedInterval.js'
import { Human, Random } from './Player.js'

export class Turn {

  static MAX_PLAYERS = 2;
  static NUMBER_PLAYER = new ClosedInterval(0, Turn.MAX_PLAYERS);
  #currentTurn = 0;
  #players = [];
  #board;

  constructor(board) {
    this.#board = board;
  }

  reset(humanPlayers) {
    this.#players = [];
    for (let i = 0; i < Turn.MAX_PLAYERS; i++) {
      const player = (i < humanPlayers) ? new Human(i, this.#board) : new Random(i, this.#board);
      this.#players.push(player);
    }
  }

  getCurrentPlayer() {
    return this.#players[this.#currentTurn];
  }

  getCurrentTurn() {
    return this.#currentTurn;
  }

  next() {
    if (!this.#board.isFinished()) {
      this.#currentTurn = (this.#currentTurn + 1) % Turn.MAX_PLAYERS;
    }
  }

  static isNumberPlayerValid(number) {
    return Turn.NUMBER_PLAYER.isIncluded(number);
  }
}
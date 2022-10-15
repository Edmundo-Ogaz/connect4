const { Board } = require('./Board');
const { Turn } = require('./Turn');

class Game {

  constructor() {
    this.turn = new Turn();
    this.board = new Board();
  }

  getBoard() {
    return this.board;
  }

  getCurrentColor() {
    return this.turn.getCurrentColor();
  }

  changeTurn() {
    this.turn.changeTurn();
  }

  addColor(column) {
    this.board.addColor(column, this.turn.getCurrentColor());
  }

  isComplete(column) {
    return this.board.isComplete(column);
  }

  isWinner() {
    return this.board.isWinner();
  }

  isFinished() {
    return this.board.isWinner() || this.board.isComplete();
  }
}

module.exports.Game = Game;
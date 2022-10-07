const { Board } = require('./Board');
const { Turn } = require('./Turn');

class Game {

  constructor() {
    this.turn = new Turn();
    this.board = new Board();
    this.currentCoordinate;
  }

  getBoard() {
    return this.board;
  }

  getColor() {
    return this.turn.getColor();
  }

  changeTurn() {
    this.turn.changeTurn();
  }

  addToken(coordinate) {
    this.currentCoordinate = coordinate;
    this.board.addToken(coordinate, this.turn.getColor());
  }

  calculateRow(col) {
    return this.board.calculateRow(col);
  }

  isWinner() {
    return this.board.isWinner(this.currentCoordinate);
  }

  isTied() {
    return this.turn.isFinished();
  }
}

module.exports.Game = Game;
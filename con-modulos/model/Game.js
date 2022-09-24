const { Board } = require('./Board');
const { Turn } = require('./Turn');
const { Checker } = require('./Checker');

class Game {

  constructor() {
    this.turn = new Turn();
    this.board = new Board();
    this.checker = new Checker();
  }

  getBoard() {
    return this.board;
  }

  getTurn() {
    return this.turn.getTurn();
  }

  getPlayer() {
    return this.turn.getPlayer();
  }

  changeTurn() {
    this.turn.changeTurn();
  }

  addToken(coordinate, player) {
    this.checker.setCurrentToken({...coordinate, player});
    this.board.addToken(coordinate, player);
  }

  calculateRow(col) {
    return this.board.calculateRow(col);
  }

  isWinner() {
    return this.checker.isConnectedInHorizontal(this.board)
      || this.checker.isConnectedInVertical(this.board)
      || this.checker.isConnectedInDiagonalPrincipal(this.board)
      || this.checker.isConnectedInDiagonalSecond(this.board);
  }

  isTied() {
    return this.turn.getTurns() === this.turn.MAX_TURNS - 1;
  }
}

module.exports.Game = Game;
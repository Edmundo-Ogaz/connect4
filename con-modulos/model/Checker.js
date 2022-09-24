const { Direction } = require('./Direction');

class Checker {

  constructor() {
    this.currentToken = null;
    this.TOKENS_CONNECTED_FOR_WIN = 4;
  }
  
  setCurrentToken(token) {
    this.currentToken = token;
  }

  isConnect4(direction, board) {
    for (let i = 1; i < this.TOKENS_CONNECTED_FOR_WIN; i++) {
      if (board.getCell(direction[i]) !== this.currentToken.player) {
        return false;
      }
    }
    return true;
  }


  isConnectedInVertical(board) {
    let vertical = new Direction(Direction.DOWN, this.currentToken);
    return this.isConnect4(vertical.getDirection(), board);
  }

  isConnectedInHorizontal(board) {
    let horizontal = new Direction(Direction.RIGHT, this.currentToken);
    return this.isConnect4(horizontal.getDirection(), board) 
      || this.isConnect4(horizontal.getOppocite(), board);
  }

  isConnectedInDiagonalPrincipal(board) {
    let diagonalPrincial = new Direction(Direction.DIAGONAL_PRINCIPAL, this.currentToken);
    return this.isConnect4(diagonalPrincial.getDirection(), board) 
      || this.isConnect4(diagonalPrincial.getOppocite(), board);
  }

  isConnectedInDiagonalSecond(board) {
    let diagonalSecond = new Direction(Direction.DIAGONAL_SECOND, this.currentToken);
    return this.isConnect4(diagonalSecond.getDirection(), board) 
      || this.isConnect4(diagonalSecond.getOppocite(), board);
  }
}

module.exports.Checker = Checker;
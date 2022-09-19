const { Turn } = require('./Turn');

class Board {

  constructor() {
    this.MIN_COLUMNS = 1;
    this.MAX_ROWS = 6;
    this.MAX_COLUMNS = 7;
    this.TOKENS_CONNECTED_FOR_WIN = 4;
    this.grid = [["*", "1", "2", "3", "4", "5", "6", "7"],
    ["1", "_", "_", "_", "_", "_", "_", "_"],
    ["2", "_", "_", "_", "_", "_", "_", "_"],
    ["3", "_", "_", "_", "_", "_", "_", "_"],
    ["4", "_", "_", "_", "_", "_", "_", "_"],
    ["5", "_", "_", "_", "_", "_", "_", "_"],
    ["6", "_", "_", "_", "_", "_", "_", "_"]];
  }

  calculateRow(col) {
    for (let row = this.grid.length - 1; row >= 0; row--) {
      if (this.grid[row][col] === "_") {
        return row;
      }
    }
  }

  isConnectedInVertical(token) {
    let countVertical = 0;
    for (let row = token.row; row <= this.MAX_ROWS; row++) {
      if (this.grid[row][token.col] === token.player) {
        countVertical++;
        if (countVertical === this.TOKENS_CONNECTED_FOR_WIN) {
          return true;
        }
      } else {
        countVertical = 0;
      }
    }
  }

  isConnectedInHorizontal(token) {
    let countHorizontal = 0;
    for (let col = this.MIN_COLUMNS; col <= this.MAX_COLUMNS; col++) {
      if (this.grid[token.row][col - 1] === token.player) {
        countHorizontal++;
        if (countHorizontal === this.TOKENS_CONNECTED_FOR_WIN) {
          return true;
        }
      } else {
        countHorizontal = 0;
      }
    }
  }

  isConnectedInDiagonal(token) {
    let countDiagonalRight = 0;
    for (let row = token.row, col = token.col; row <= this.MAX_ROWS & col >= this.MIN_COLUMNS; row++, col--) {
      if (this.grid[row][col] === token.player) {
        countDiagonalRight++;
        if (countDiagonalRight === this.TOKENS_CONNECTED_FOR_WIN) {
          return true;
        }
      } else {
        countDiagonalRight = 0;
      }
    }
    let countDiagonalLeft = 0;
    for (let row = token.row, col = token.col; row <= this.MAX_ROWS && col <= this.MAX_COLUMNS; row++, col++) {
      if (this.grid[row][col] === token.player) {
        countDiagonalLeft++;
        if (countDiagonalLeft === this.TOKENS_CONNECTED_FOR_WIN) {
          return true;
        }
      } else {
        countDiagonalLeft = 0;
      }
    }
  }
}

module.exports.Board = Board;
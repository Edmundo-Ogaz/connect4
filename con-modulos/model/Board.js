let { Token } = require('../model/Token');

class Board {

    currentToken = null;
    MAX_TOKENS = 42;
    MIN_ROWS = 1;
    MIN_COLUMNS = 1;
    MAX_ROWS = 6;
    MAX_COLUMNS = 7;
    TOKENS_CONNECTED_FOR_WIN = 4;
    grid = [["*", "1", "2", "3", "4", "5", "6", "7"],
    ["1", "_", "_", "_", "_", "_", "_", "_"],
    ["2", "_", "_", "_", "_", "_", "_", "_"],
    ["3", "_", "_", "_", "_", "_", "_", "_"],
    ["4", "_", "_", "_", "_", "_", "_", "_"],
    ["5", "_", "_", "_", "_", "_", "_", "_"],
    ["6", "_", "_", "_", "_", "_", "_", "_"]];

    addToken(token) {
        this.currentToken = token;
        this.grid[token.row][token.col] = token.player;
    }

    calculateRow(col) {
        for (let row = this.grid.length - 1; row >= 0; row--) {
            if (this.grid[row][col] === "_") {
                return row;
            }
        }
    }

    isConnectedInVertical() {
        let countVertical = 0;
        for (let row =     this.currentToken.row; row <= this.MAX_ROWS; row++) {
            if (this.grid[row][this.currentToken.col] === this.currentToken.player) {
                countVertical++;
                if (countVertical === this.TOKENS_CONNECTED_FOR_WIN) {
                    return true;
                }
            } else {
                countVertical = 0;
            }
        }
    }

    isConnectedInHorizontal() {
        let countHorizontal = 0;
        for (let col = this.MIN_COLUMNS; col <= this.MAX_COLUMNS; col++) {
            if (this.grid[this.currentToken.row][col - 1] === this.currentToken.player) {
                countHorizontal++;
                if (countHorizontal === this.TOKENS_CONNECTED_FOR_WIN) {
                    return true;
                }
            } else {
                countHorizontal = 0;
            }
        }
    }

    isConnectedInDiagonal() {
        let countDiagonalRight = 0;
        for (let row = this.currentToken.row, col = this.currentToken.col; row <= this.MAX_ROWS & col >= this.MIN_COLUMNS; row++, col--) {
            if (this.grid[row][col] === this.currentToken.player) {
                countDiagonalRight++;
                if (countDiagonalRight === this.TOKENS_CONNECTED_FOR_WIN) {
                    return true;
                }
            } else {
                countDiagonalRight = 0;
            }
        }
        let countDiagonalLeft = 0;
        for (let row = this.currentToken.row, col = this.currentToken.col; row <= this.MAX_ROWS && col <= this.MAX_COLUMNS; row++, col++) {
            if (this.grid[row][col] === this.currentToken.player) {
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
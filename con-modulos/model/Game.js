const { Board } = require('./Board');
const { Turn } = require('./Turn');

class Game {
    
    constructor() {
        this.MAX_TURNS = 42;
        this.turn = new Turn();
        this.board = new Board();
        this.currentToken = null;
    }

    getBoardLength() {
        return this.board.grid.length;
    }

    getBoardRow(row) {
        return this.board.grid[row];
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

    addToken(token) {
        this.currentToken = token;
        this.board.grid[token.row][token.col] = token.player;
    }

    calculateRow(col) {
        return this.board.calculateRow(col);
    }

    isWinner() {
        return this.board.isConnectedInHorizontal(this.currentToken)
            || this.board.isConnectedInVertical(this.currentToken)
            || this.board.isConnectedInDiagonal(this.currentToken);
    }

    isTied() {
        return this.turn.getTurns() === this.MAX_TURNS - 1;
    }
}

module.exports.Game = Game;
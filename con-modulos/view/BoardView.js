const { Console } = require("console-mpds");
const console = new Console();

let { Token } = require('../model/Token');
let { Board } = require('../model/Board');

class BoardView {

    MAX_TOKENS = 42;

  constructor() {
      this.token = new Token();
      this.board = new Board();
  }

    showBoard() {
        for (let row = 0; row < this.board.grid.length; row++) {
            console.writeln(this.board.grid[row]);
        }
    }

    getToken(player) {
        this.readColumn(player);
        return this.token;
    }

    // isConnectedInHorizontal(token) {
    //     return this.board.isConnectedInHorizontal(token);
    // }

    // isConnectedInVertical(token) {
    //     return this.board.isConnectedInVertical(token);
    // }

    // isConnectedInDiagonal(token) {
    //     return this.board.isConnectedInDiagonal(token);
    // }

    isWinner() {
        return this.board.isConnectedInHorizontal()
            || this.board.isConnectedInVertical()
            || this.board.isConnectedInDiagonal();
    }

    isTied(numberOfRounds) {
        return numberOfRounds === this.MAX_TOKENS - 1;
    }
    
    readColumn(player) {
        let correctColumn;
        let col;
        let row;
        do {
            console.writeln(`--------------------------`);
            correctColumn = true;
            col = console.readNumber(`Player ${player} Select column between (1 - 7)`);
            row = this.board.calculateRow(col);
            if (1 > col || col > 7) {
                console.writeln("Remember columns between 1 and 7");
                correctColumn = false;
            } else if (row === undefined) {
                console.writeln("This column is full");
                correctColumn = false;
            }
        } while (!correctColumn);

        this.token.owner = player;
        this.token.col = col;
        this.token.row = row;

        this.board.grid[this.token.row][this.token.col] = player;
        this.board.setCurrentToken(new Token(row, col, player));
    }
}

module.exports.BoardView = BoardView;
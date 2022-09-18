const { Console } = require("console-mpds");
const console = new Console();

let { Token } = require('../model/Token');
let { Board } = require('../model/Board');

class BoardView {

    MAX_TOKENS = 42;

  constructor() {
      this.board = new Board();
  }

    showBoard() {
        for (let row = 0; row < this.board.grid.length; row++) {
            console.writeln(this.board.grid[row]);
        }
    }

    isWinner() {
        return this.board.isConnectedInHorizontal()
            || this.board.isConnectedInVertical()
            || this.board.isConnectedInDiagonal();
    }

    isTied(numberOfRounds) {
        return numberOfRounds === this.MAX_TOKENS - 1;
    }
    
    readToken(player) {
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

        this.board.grid[row][col] = player;
        this.board.setCurrentToken(new Token(row, col, player));
    }
}

module.exports.BoardView = BoardView;
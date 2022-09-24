const { Console } = require("console-mpds");
const console = new Console();

class BoardView {

  constructor(board) {
    this.board = board;
  }

  showBoard() {
    for (let row = 0; row <= this.board.MAX_ROWS; row++) {
      console.writeln(this.board.getRow(row));
    }
  }
}

module.exports.BoardView = BoardView;
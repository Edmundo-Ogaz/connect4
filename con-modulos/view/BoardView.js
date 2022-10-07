const { Console } = require("console-mpds");
const console = new Console();

const { Coordinate } = require('../model/Coordinate');

class BoardView {

  constructor(board) {
    this.board = board;
  }

  showBoard() {
    console.writeln(`* 1 2 3 4 5 6 7`);
    for (let row = Coordinate.MAX_ROWS - 1; row >= 0; row--) {
      console.write(`${row + 1} `);
      for (let col = 0; col < Coordinate.MAX_COLUMNS; col++) {
        console.write(`${this.board.getCell(new Coordinate(col, row)) || "_"},`);
      }
      console.writeln();
    }
  }
}

module.exports.BoardView = BoardView;
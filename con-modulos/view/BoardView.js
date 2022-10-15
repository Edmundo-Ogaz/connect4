const { Console } = require("console-mpds");
const console = new Console();

const { Coordinate } = require('../model/Coordinate');

class BoardView {

  constructor(board) {
    this.board = board;
  }

  show() {
    console.writeln(`* 1 2 3 4 5 6 7`);
    for (let row = Coordinate.NUMBER_ROWS - 1; row >= 0; row--) {
      console.write(`${row + 1} `);
      for (let column = 0; column < Coordinate.NUMBER_COLUMNS; column++) {
        console.write(`${this.board.getColor(new Coordinate(row, column)) || "_"},`);
      }
      console.writeln();
    }
  }
}

module.exports.BoardView = BoardView;
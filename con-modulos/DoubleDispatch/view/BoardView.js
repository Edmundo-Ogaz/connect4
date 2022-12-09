import { Coordinate } from '../model/Coordinate.js';
import { console } from '../utils/console.js';

class BoardView {

  #board;

  constructor(board) {
    this.#board = board;
  }

  writeln() {
    console.writeln(`* 1 2 3 4 5 6 7`);
    for (let row = Coordinate.MAX_ROWS - 1; row >= 0; row--) {
      console.write(`${row + 1} `);
      for (let column = 0; column < Coordinate.MAX_COLUMNS; column++) {
        console.write(`${this.#board.getColor(new Coordinate(row, column)) || "_"},`);
      }
      console.writeln();
    }
  }
}

export { BoardView };
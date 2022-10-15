const { Line } = require('./Line');
const { Direction } = require('./Direction');
const { Coordinate } = require('./Coordinate');
class Board {
  
  currentCoordinate;

  constructor() {
    this.cells = Array.from(Array(Coordinate.NUMBER_ROWS), () => Array(Coordinate.NUMBER_COLUMNS));
    this.EMPTY_CELL = undefined;
  }

  #calculateRow(column) {
    for (let row = 0; row < this.cells.length; row++) {
      if (this.cells[row][column] === this.EMPTY_CELL) {
        return row;
      }
    }
  }

  #isConnect4(line) {
    const COLOR = this.getColor(line.get(0));
    for (let i = 1; i < Line.LENGTH; i++) {
      if (this.getColor(line.get(i)) !== COLOR) {
        return false;
      }
    }
    return true;
  }
  
  getColor(coordinate) {
    if (Coordinate.isRowValid(coordinate.getRow())) {
      return this.cells[coordinate.getRow()][coordinate.getColumn()];
    }
  }

  addColor(column, color) {
    const row = this.#calculateRow(column);
    this.cells[row][column] = color;
    this.currentCoordinate = new Coordinate(row, column);
  }

  isComplete(column) {
    if (column !== undefined) {
      return this.cells[Coordinate.NUMBER_ROWS - 1][column] !== this.EMPTY_CELL;
    }
    for (let i = 0; i < Coordinate.NUMBER_COLUMNS; i++) {
        if (!this.isComplete(i)) {
            return false;
        }
    }
    return true;
  }

  isWinner() {
    const DIRECTIONS = Direction.VALUES;
    let isWinner = false;
    for (let i = 0; !isWinner && i < DIRECTIONS.length; i++) {
      let line = new Line(this.currentCoordinate, DIRECTIONS[i]);
      isWinner = this.#isConnect4(line);
      for (let j = 0; !isWinner && j < Line.LENGTH - 1; j++) {
        line = line.displaceOne(DIRECTIONS[i].getOppocite());
        isWinner = this.#isConnect4(line);
      }
    }
    return isWinner;
  }
}

module.exports.Board = Board;
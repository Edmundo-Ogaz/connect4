const { Line } = require('./Line');
const { Coordinate } = require('./Coordinate');
class Board {

  constructor() {
    this.EMPTY_CELL = undefined;
    this.cells = Array.from(Array(Coordinate.MAX_ROWS), () => Array(Coordinate.MAX_COLUMNS));
    this.TOKENS_CONNECTED_FOR_WIN = 4;
  }

  getCell(coordinate) {
    if (0 > coordinate.y || coordinate.y >= Coordinate.MAX_ROWS) {
      return undefined;
    }
    return this.cells[coordinate.y][coordinate.x];
  }

  isConnect4(direction) {
    const TOKEN = this.getCell(direction[0]);
    for (let i = 1; i < this.TOKENS_CONNECTED_FOR_WIN; i++) {
      if (this.getCell(direction[i]) !== TOKEN) {
        return false;
      }
    }
    return true;
  }

  calculateRow(col) {
    for (let row = 0; row < this.cells.length - 1; row++) {
      if (this.cells[row][col] === this.EMPTY_CELL) {
        return row;
      }
    }
  }

  addToken(coordinate, color) {
    this.cells[coordinate.y][coordinate.x] = color;
  }

  isWinner(currentCoordinate) {
    const SOUTH = new Line(currentCoordinate, new Coordinate(0, -1));
    const WEST = new Line(currentCoordinate, new Coordinate(-1, 0));
    const SOUTH_WEST = new Line(currentCoordinate, new Coordinate(-1, -1));
    const NORTH_WEST = new Line(currentCoordinate, new Coordinate(1, -1));
    const DIRECTIONS = [SOUTH, WEST, SOUTH_WEST, NORTH_WEST];
    let isWinner = false;
    for (let i = 0; !isWinner && i < DIRECTIONS.length; i++) {
      isWinner = this.isConnect4(DIRECTIONS[i].getLine())
        || this.isConnect4(DIRECTIONS[i].getOppocite());;
    }
    return isWinner;
  }
}

module.exports.Board = Board;
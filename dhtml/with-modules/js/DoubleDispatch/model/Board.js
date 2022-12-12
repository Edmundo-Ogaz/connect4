import { assert } from '../utils/assert.js';
import { Coordinate } from './Coordinate.js'
import { Direction } from './Direction.js'

export class Board {

  static LINE_LENGTH = 4;
  #EMPTY_CELL = null;
  #colors;
  #currentCoordinate;

  constructor() {
    // this.#colors = Array.from(Array(Coordinate.MAX_ROWS), () => Array(Coordinate.MAX_COLUMNS));
    this.#colors = Array.from(Array(Coordinate.MAX_ROWS), () => Array.from(Array(Coordinate.MAX_COLUMNS), () => this.#EMPTY_CELL));
  }

  reset(colors) {
    assert(Array.isArray(colors));
    this.#colors = colors;
    this.#currentCoordinate = null;
  }

  getCurrentCoordinate() {
    return this.#currentCoordinate;
  }

  getColor(coordinate) {
    if (Coordinate.isRowValid(coordinate.row)) {
      return this.#colors[coordinate.row][coordinate.column];
    }
  }

  getColors() {
    return this.#colors;
  }

  dropToken(column, color) {
    assert(Coordinate.NUMBER_COLUMNS.isIncluded(column));
    assert(color);
    const row = this.#calculateRow(column);
    this.#colors[row][column] = color;
    this.#currentCoordinate = new Coordinate(row, column);
    console.log(`dropToken ${this.#currentCoordinate}`);
  }

  isComplete(column) {
    if (column !== undefined) {
      console.log(`${this.#colors[Coordinate.MAX_ROWS - 1][column]}`);
      console.log(`${typeof this.#colors[Coordinate.MAX_ROWS - 1][column]}`);
      console.log(`${this.#colors[Coordinate.MAX_ROWS - 1][column]  === null}`);
      return this.#colors[Coordinate.MAX_ROWS - 1][column] !== this.#EMPTY_CELL;
    }
    for (let i = 0; i < Coordinate.MAX_COLUMNS; i++) {
      if (!this.isComplete(i)) {
        return false;
      }
    }
    return true;
  }

  isWinner() {
    if (this.#currentCoordinate === undefined) {
      return false;
    }
    for (let direction of Direction.values()) {
      let line = this.#getLine(this.#currentCoordinate, direction);
      for (let i = 0; i < Board.LINE_LENGTH; i++) {
        if (this.#isConnect4(line)) {
          return true;
        };
        line = line.map(coordinate => coordinate.getShifted(direction.getOpposite().getCoordinate()));
      }
    }
    return false;
  }

  isFinished() {
    return this.isComplete() || this.isWinner();
}

  #calculateRow(column) {
    assert(Coordinate.NUMBER_COLUMNS.isIncluded(column));
    for (let row = 0; row < this.#colors.length; row++) {
      if (this.#colors[row][column] === this.#EMPTY_CELL) {
        return row;
      }
    }
  }

  #getLine(initialCoordinate, direction) {
    let coordinates = [initialCoordinate];
    for (let i = 0; i < Board.LINE_LENGTH - 1; i++) {
      coordinates.push(coordinates[i].getShifted(direction.getCoordinate()));
    }
    return coordinates;
  }

  #isConnect4(line) {
    const COLOR = this.getColor(line[0]);
    for (let i = 1; i < Board.LINE_LENGTH; i++) {
      if (this.getColor(line[i]) !== COLOR) {
        return false;
      }
    }
    return true;
  }
}

class ClosedInterval {

  #min;
  #max;

  constructor(min, max) {
    this.#min = min;
    this.#max = max;
  }

  isIncluded(value) {
    return this.#min <= value && value <= this.#max;
  }
}

class Coordinate {

  static MAX_ROWS = 6;
  static NUMBER_ROWS = new ClosedInterval(0, Coordinate.MAX_ROWS - 1);
  static MAX_COLUMNS = 7;
  static NUMBER_COLUMNS = new ClosedInterval(0, Coordinate.MAX_COLUMNS - 1);
  #row;
  #column;

  constructor(row, column) {
    this.#row = row;
    this.#column = column;
  }

  get row() {
    return this.#row;
  }

  get column() {
    return this.#column;
  }

  getShifted(coordinate) {
    return new Coordinate(this.#row + coordinate.row, this.#column + coordinate.column);
  }

  static isRowValid(row) {
    return Coordinate.NUMBER_ROWS.isIncluded(row);
  }
  
  static isColumnValid(column) {
    return Coordinate.NUMBER_COLUMNS.isIncluded(column);
  }
}

class Direction {

  static SOUTH = new Direction(-1, 0);
  static WEST = new Direction(0, -1);
  static SOUTH_WEST = new Direction(-1, -1);
  static NORTH_WEST = new Direction(1, -1);
  #coordinate;

  constructor(row, column) {
      this.#coordinate = new Coordinate(row, column);
  }

  getCoordinate() {
    return this.#coordinate;
  }

  getOpposite() {
    return new Direction(this.#coordinate.row * -1, this.#coordinate.column * -1);
  }

  static values() {
    return [Direction.SOUTH, Direction.WEST, Direction.SOUTH_WEST, Direction.NORTH_WEST];
  }
}

class Board {

  static LINE_LENGTH = 4;
  #EMPTY_CELL = undefined;
  #cells;
  #currentCoordinate;

  constructor() {
    this.#cells = Array.from(Array(Coordinate.MAX_ROWS), () => Array(Coordinate.MAX_COLUMNS));
  }

  getCurrentCoordinate() {
    return this.#currentCoordinate;
  }

  getColor(coordinate) {
    if (Coordinate.isRowValid(coordinate.row)) {
      return this.#cells[coordinate.row][coordinate.column];
    }
  }

  dropToken(column, color) {
    const row = this.#calculateRow(column);
    this.#cells[row][column] = color;
    this.#currentCoordinate = new Coordinate(row, column);
  }

  isComplete(column) {
    if (column !== undefined) {
      return this.#cells[Coordinate.MAX_ROWS - 1][column] !== this.#EMPTY_CELL;
    }
    for (let i = 0; i < Coordinate.MAX_COLUMNS; i++) {
      if (!this.isComplete(i)) {
        return false;
      }
    }
    return true;
  }

  isWinner() {
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
    for (let row = 0; row < this.#cells.length; row++) {
      if (this.#cells[row][column] === this.#EMPTY_CELL) {
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

class Color {

  static RED = new Color(`RED`);
  static YELLOW = new Color(`YELLOW`);
  #string;

  constructor(string) {
    this.#string = string;
  }

  toString() {
    return this.#string;
  }

  static get(ordinal) {
    return Color.#values()[ordinal];
  }

  static #values() {
    return [Color.RED, Color.YELLOW];
  }

}

class Player {

  #color;
  #board;

  constructor(color, board) {
    this.#color = color;
    this.#board = board;
  }

  getColor() {
    return this.#color.toString();
  }

  isComplete(column) {
      return this.#board.isComplete(column);
  }

  dropToken(column) {
    this.#board.dropToken(column, this.#color.toString().charAt());
  }
}

class Human extends Player {

  constructor(playerNumber, board) {
    super(Color.get(playerNumber), board);
  }

  dropToken(column) {
    if (!Coordinate.isColumnValid(column)) 
      return `Remember columns between 1 and ${Coordinate.MAX_COLUMNS}`;
    if (this.isComplete(column)) 
      return `This column is full`;
    super.dropToken(column);
  }

  accept(turnView) {
    return turnView.visitHuman(this)
  }
}

class Random extends Player {

  constructor(playerNumber, board) {
    super(Color.get(playerNumber), board);
  }

  dropToken() {
    let column;
    do {
      column = parseInt(Math.random() * Coordinate.MAX_COLUMNS);
    } while (this.isComplete(column));
    super.dropToken(column);
  }

  accept(turnView) {
    return turnView.visitRandom(this)
  }
}

class Turn {

  static MAX_PLAYERS = 2;
  static NUMBER_PLAYER = new ClosedInterval(0, Turn.MAX_PLAYERS);
  #currentTurn = 0;
  #players = [];
  #board;

  constructor(humanPlayers, board) {
    for (let i = 0; i < Turn.MAX_PLAYERS; i++) {
      const player = (i < humanPlayers) ? new Human(i, board) : new Random(i, board);
      this.#players.push(player);
      this.#board = board;
    }
  }

  getCurrentPlayer() {
    return this.#players[this.#currentTurn];
  }

  changeTurn() {
    if (!this.#board.isFinished()) {
      this.#currentTurn = (this.#currentTurn + 1) % Turn.MAX_PLAYERS;
    }
  }

  static isNumberPlayerValid(number) {
    return Turn.NUMBER_PLAYER.isIncluded(number);
  }
}

class Game {

  #board;
  #turn;

  constructor(humanPlayers) {
    this.#board = new Board();
    this.#turn = new Turn(humanPlayers, this.#board);
  }

  getBoard() {
    return this.#board;
  }

  getTurn() {
    return this.#turn;
  }

  getCurrentPlayer() {
    return this.#turn.getCurrentPlayer();
  }

  getCurrentCoordinate() {
    return this.#board.getCurrentCoordinate();
  }

  changeTurn() {
    this.#turn.changeTurn();
  }
  isWinner() {
    return this.#board.isWinner();
  }

  isFinished() {
    return this.#board.isWinner() || this.#board.isComplete();
  }
}

// export { Game, Board, Turn, Coordinate };
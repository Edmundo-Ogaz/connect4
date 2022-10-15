
const { Console } = require("console-mpds");
const console = new Console();

class ClosedInterval {

  constructor(min, max) {
    this.min = min;
    this.max = max;
  }

  isIncluded(value) {
    return this.min <= value && value <= this.max;
  }
}

class Coordinate {

  static NUMBER_ROWS = 6;
  static ROWS = new ClosedInterval(0, Coordinate.NUMBER_ROWS - 1);
  static NUMBER_COLUMNS = 7;
  static COLUMNS = new ClosedInterval(0, Coordinate.NUMBER_COLUMNS - 1);

  constructor(row, column) {
    this.row = row;
    this.column = column;
  }

  getRow() {
    return this.row;
  }

  getColumn() {
    return this.column;
  }

  getShifted(direction) {
    return new Coordinate(this.row + direction.getRow(), this.column + direction.getColumn());
  }

  static isColumnValid(column) {
    return Coordinate.COLUMNS.isIncluded(column);
  }
  static isRowValid(row) {
    return Coordinate.ROWS.isIncluded(row);
  }
}

class Direction extends Coordinate {

  static SOUTH = new Direction(-1, 0);
  static WEST = new Direction(0, -1);
  static SOUTH_WEST = new Direction(-1, -1);
  static NORTH_WEST = new Direction(1, -1);
  static VALUES = [Direction.SOUTH, Direction.WEST, Direction.SOUTH_WEST, Direction.NORTH_WEST];

  constructor(row, column) {
    super(row, column)
  }

  getOppocite() {
    return new Direction(this.row * -1, this.column * -1);
  }
}

class Line {

  static LENGTH = 4;
  #coordinates;

  constructor(initialCoordinate, direction) {
    this.#coordinates = [initialCoordinate];
    for (let i = 0; i < Line.LENGTH - 1; i++) {
      this.#coordinates.push(this.#coordinates[i].getShifted(direction));
    }
  }

  get(ordinal) {
    return this.#coordinates[ordinal];
  }

  displaceOne(direction) {
    this.#coordinates = this.#coordinates.map(coordinate => coordinate.getShifted(direction));
    return this;
  }
}

class Color {

  static RED = new Color(`R`);
  static YELLOW = new Color(`Y`);
  static #values = [Color.RED, Color.YELLOW];
  #string;

  constructor(string) {
    this.#string = string;
  }

  static get(ordinal) {
    return Color.#values[ordinal];
  }

  toString() {
    return this.#string;
  }
}

class Player {

  #color;

  constructor(color) {
    this.#color = color;
  }

  getColor() {
    return this.#color.toString();
  }
}

class Turn {

  static NUMBER_PLAYERS = 2;
  #currentTurn;
  #players = [];

  constructor() {
    this.#currentTurn = 0;
    for (let i = 0; i < Turn.NUMBER_PLAYERS; i++) {
      this.#players[i] = new Player(Color.get(i));
    }
  }

  getCurrentColor() {
    return this.#players[this.#currentTurn].getColor();
  }

  changeTurn() {
    this.#currentTurn = (this.#currentTurn + 1) % Turn.NUMBER_PLAYERS;
  }

  getCurrentTurn() {
    return this.#currentTurn;
  }
}

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

class Game {

  constructor() {
    this.turn = new Turn();
    this.board = new Board();
  }

  getBoard() {
    return this.board;
  }

  getCurrentColor() {
    return this.turn.getCurrentColor();
  }

  getCurrentTurn() {
    return this.turn.getCurrentTurn();
  }

  changeTurn() {
    this.turn.changeTurn();
  }

  dropToken(column) {
    this.board.addColor(column, this.turn.getCurrentColor());
  }

  isComplete(column) {
    return this.board.isComplete(column);
  }

  isWinner() {
    return this.board.isWinner();
  }

  isFinished() {
    return this.board.isWinner() || this.board.isComplete();
  }
}

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

class CPUView {

  constructor(game) {
    this.game = game;
  }

  putToken() {
    let column;
    do {
      console.writeln(`--------------------------`);
      column = parseInt(Math.random() * 7);
    } while (!Coordinate.isColumnValid(column) || this.game.isComplete(column));
    this.game.dropToken(column);
  }
}

class HumanView {

  constructor(game) {
    this.game = game;
  }

  putToken() {
    let column;
    let valid;
    do {
      console.writeln(`--------------------------`);
      column = console.readNumber(`Player ${this.game.getCurrentColor()} Select column between (1 - 7)`) - 1;
      valid = Coordinate.isColumnValid(column);
      if (!valid) {
        console.writeln(`Remember columns between 1 and 7`);
      } else {
        valid = !this.game.isComplete(column)
        if (!valid) {
          console.writeln(`This column is full`);
        }
      }
    } while (!valid);
    this.game.dropToken(column);
  }
}

class GameModeView {

  constructor(game) {
    this.cpuView = new CPUView(game);
    this.humanView = new HumanView(game);
  }

  getPlayers() {
    let response;
    let error = false;
    do {
      response = console.readNumber(`Tell me the number of human players`);
      error = !this.#isNumberPlayerValid(response)
      if (error) {
        console.writeln(`This number for ${response} human players is not correct`);
      }
    } while (error);
    let players = []
    for (let i = 0; i < Turn.NUMBER_PLAYERS; i++) {
      players[i] = (i < response) ? this.humanView : this.cpuView;
    }
    return players;
  }

  #isNumberPlayerValid(numberOfPlayer) {
    return 0 <= numberOfPlayer && numberOfPlayer <= Turn.NUMBER_PLAYERS;
  }
}

class GameView {

  constructor() {
    this.game = new Game();;
    //this.humanView = new HumanView(this.game);
    this.gameModeView = new GameModeView(this.game);
    this.boardView = new BoardView(this.game.getBoard());
  }

  play() {
    console.writeln(`----- CONNECT4 -----`);
    const players = this.gameModeView.getPlayers();
    this.boardView.show();
    let gameFinished;
    do {
      players[this.game.getCurrentTurn()].putToken();
      //this.humanView.putToken();
      this.boardView.show();
      gameFinished = this.game.isFinished();
      if (!gameFinished) {
        this.game.changeTurn();
      }
    } while (!gameFinished);
    this.#showResult();
  }

  #showResult() {
    console.writeln(this.game.isWinner() ? `The winner is the player ${this.game.getCurrentColor()}` : `Tied Game`);
  }
}

class YesNoDialogView {

  question;
  answer;

  constructor(question) {
    this.question = question;
  }

  read() {
    let error;
    do {
      this.answer = console.readString(this.question);
      error = !this.isAffirmative() && !this.isNegative();
      if (error) {
        console.writeln(`Please answer "yes" or "no"`);
      }
    } while (error);
  }

  isAffirmative() {
    return this.answer === `yes`;
  }

  isNegative() {
    return this.answer === `no`;
  }
}

class Connect4 {

  play() {
    const continueDialogView = new YesNoDialogView(`Do you want to continue? (yes/no)`);
    do {
      new GameView().play();
      continueDialogView.read();
    } while (continueDialogView.isAffirmative());
  }
}

module.exports.Connect4 = Connect4;

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

class Direction {

  static SOUTH = new Direction(-1, 0);
  static WEST = new Direction(0, -1);
  static SOUTH_WEST = new Direction(-1, -1);
  static NORTH_WEST = new Direction(1, -1);

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

  getOppocite() {
    return new Direction(this.row * -1, this.column * -1);
  }

  static values() {
    return [Direction.SOUTH, Direction.WEST, Direction.SOUTH_WEST, Direction.NORTH_WEST];
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

  getCoordinate(ordinal) {
    return this.#coordinates[ordinal];
  }

  shiftOne(direction) {
    this.#coordinates = this.#coordinates.map(coordinate => coordinate.getShifted(direction));
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
    const COLOR = this.getColor(line.getCoordinate(0));
    for (let i = 1; i < Line.LENGTH; i++) {
      if (this.getColor(line.getCoordinate(i)) !== COLOR) {
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

  dropToken(column, color) {
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
    const DIRECTIONS = Direction.values();
    let isWinner = false;
    for (let i = 0; !isWinner && i < DIRECTIONS.length; i++) {
      let line = new Line(this.currentCoordinate, DIRECTIONS[i]);
      isWinner = this.#isConnect4(line);
      for (let j = 0; !isWinner && j < Line.LENGTH - 1; j++) {
        line.shiftOne(DIRECTIONS[i].getOppocite());
        isWinner = this.#isConnect4(line);
      }
    }
    return isWinner;
  }
}

class Color {

  static RED = new Color(`RED`);
  static YELLOW = new Color(`YELLOW`);
  #string;

  constructor(string) {
    this.#string = string;
  }

  static get(ordinal) {
    return Color.#values()[ordinal];
  }

  static #values() {
    return [Color.RED, Color.YELLOW];
  }

  toString() {
    return this.#string;
  }
}

class Player {

  #color;
  #board;

  constructor(color, board) {
    this.#color = color;
    this.#board = board
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

  constructor(color, board) {
    super(color, board);
  }

  dropToken(column) {
    if (!Coordinate.isColumnValid(column)) {
      return `Remember columns between 1 and 7`;
    } else if (super.isComplete(column)) {
      return `This column is full`;
    }
    super.dropToken(column);
  }
}

class Random extends Player {

  constructor(color, board) {
    super(color, board);
  }

  dropToken() {
    let column;
    do {
      column = parseInt(Math.random() * 7);
    } while (super.isComplete(column));
    super.dropToken(column);
  }
}

class Turn {

  static NUMBER_PLAYERS = 2;
  #currentTurn;
  #players = [];
  #board;

  constructor(board) {
    this.#currentTurn = 0;
    this.#board = board;
  }

  setPlayers(players) {
    for (let i = 0; i < players.length; i++) {
      this.#players[i] = new players[i](Color.get(i), this.#board);
    }
  }

  getCurrentPlayer() {
    return this.#players[this.#currentTurn];
  }

  changeTurn() {
    this.#currentTurn = (this.#currentTurn + 1) % Turn.NUMBER_PLAYERS;
  }

  getCurrentTurn() {
    return this.#currentTurn;
  }
}

class Game {

  constructor() {
    this.board = new Board();
    this.turn = new Turn(this.board);
  }

  getBoard() {
    return this.board;
  }

  getTurn() {
    return this.turn;
  }

  getCurrentPlayer() {
    return this.turn.getCurrentPlayer();
  }

  changeTurn() {
    this.turn.changeTurn();
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

class HumanView {

  constructor(turn) {
    this.turn = turn;
  }

  dropToken() {
    let error;
    do {
      console.writeln(`--------------------------`);
      let column = console.readNumber(`Player ${this.turn.getCurrentPlayer().getColor()} Select column between (1 - 7)`) - 1;
      error = this.turn.getCurrentPlayer().dropToken(column);
      if (error) {
        console.writeln(error);
      }
    } while (error);
  }
}

class RandomView {

  constructor(turn) {
    this.turn = turn;
  }

  dropToken() {
    console.writeln(`--------------------------`);
    this.turn.getCurrentPlayer().dropToken();
  }
}

class TurnView {

  #turn;
  #playersView;

  constructor(turn) {
    this.#turn = turn;
    this.#playersView = [];
  }

  config() {
    let response;
    let error = false;
    do {
      response = console.readNumber(`Tell me the game mode:
                  (0) Demo-Game, (1) Player Vs CPU, (2) Player Vs Player`);
      error = !this.#isModeGameValid(response)
      if (error) {
        console.writeln(`This game mode ${response} doesn´t exist`);
      }
    } while (error);
    let players = [];
    for (let i = 0; i < Turn.NUMBER_PLAYERS; i++) {
      this.#playersView[i] = (i < response) ? new HumanView(this.#turn) : new RandomView(this.#turn);
      players[i] = (i < response) ? Human : Random;
    }
    this.#turn.setPlayers(players)
  }

  play() {
    this.#playersView[this.#turn.getCurrentTurn()].dropToken();
  }

  #isModeGameValid(option) {
    return 0 <= option && option <= 2;
  }
}

class GameView {

  constructor() {
    this.game = new Game();;
    this.boardView = new BoardView(this.game.getBoard());
    this.turnView = new TurnView(this.game.getTurn());
  }

  play() {
    console.writeln(`----- CONNECT4 -----`);
    this.turnView.config();
    let gameFinished;
    do {
      this.boardView.show();
      this.turnView.play();
      gameFinished = this.game.isFinished();
      if (!gameFinished) {
        this.game.changeTurn();
      }
    } while (!gameFinished);
    this.#showResult();
  }

  #showResult() {
    this.boardView.show();
    console.writeln(this.game.isWinner() ? `The winner is the player ${this.game.getCurrentPlayer().getColor()}` : `Tied Game`);
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

new Connect4().play();

module.exports.Game = Game;
module.exports.Coordinate = Coordinate;
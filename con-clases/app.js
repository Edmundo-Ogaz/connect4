
const { Console } = require("console-mpds");
const console = new Console();

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

  static NUMBER_ROWS = 6;
  static ROWS = new ClosedInterval(0, Coordinate.NUMBER_ROWS - 1);
  static NUMBER_COLUMNS = 7;
  static COLUMNS = new ClosedInterval(0, Coordinate.NUMBER_COLUMNS - 1);
  #row;
  #column;

  constructor(row, column) {
    this.#row = row;
    this.#column = column;
  }

  getRow() {
    return this.#row;
  }

  getColumn() {
    return this.#column;
  }

  getShifted(coordinate) {
    return new Coordinate(this.#row + coordinate.getRow(), this.#column + coordinate.getColumn());
  }

  static isRowValid(row) {
    return Coordinate.ROWS.isIncluded(row);
  }
  
  static isColumnValid(column) {
    return Coordinate.COLUMNS.isIncluded(column);
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

  getOppocite() {
    return new Direction(this.#coordinate.getRow() * -1, this.#coordinate.getColumn() * -1);
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
      this.#coordinates.push(this.#coordinates[i].getShifted(direction.getCoordinate()));
    }
  }

  getCoordinate(ordinal) {
    return this.#coordinates[ordinal];
  }

  shiftOne(direction) {
    this.#coordinates = this.#coordinates.map(coordinate => coordinate.getShifted(direction.getCoordinate()));
  }
}

class Board {

  #EMPTY_CELL = undefined;
  #cells;
  #currentCoordinate;

  constructor() {
    this.#cells = Array.from(Array(Coordinate.NUMBER_ROWS), () => Array(Coordinate.NUMBER_COLUMNS));
  }

  #calculateRow(column) {
    for (let row = 0; row < this.#cells.length; row++) {
      if (this.#cells[row][column] === this.#EMPTY_CELL) {
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
      return this.#cells[coordinate.getRow()][coordinate.getColumn()];
    }
  }

  dropToken(column, color) {
    const row = this.#calculateRow(column);
    this.#cells[row][column] = color;
    this.#currentCoordinate = new Coordinate(row, column);
  }

  isComplete(column) {
    if (column !== undefined) {
      return this.#cells[Coordinate.NUMBER_ROWS - 1][column] !== this.#EMPTY_CELL;
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
      let line = new Line(this.#currentCoordinate, DIRECTIONS[i]);
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

  static MAX_PLAYERS = 2;
  static NUMBER_PLAYER = new ClosedInterval(0, Turn.MAX_PLAYERS);
  #currentTurn = 0;
  #players = [];
  #board;

  constructor(board) {
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
    this.#currentTurn = (this.#currentTurn + 1) % Turn.MAX_PLAYERS;
  }

  getCurrentTurn() {
    return this.#currentTurn;
  }

  static isNumberPlayerValid(number) {
    return Turn.NUMBER_PLAYER.isIncluded(number);
  }
}

class Game {

  #board;
  #turn;

  constructor() {
    this.#board = new Board();
    this.#turn = new Turn(this.#board);
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

class BoardView {

  #board;

  constructor(board) {
    this.#board = board;
  }

  show() {
    console.writeln(`* 1 2 3 4 5 6 7`);
    for (let row = Coordinate.NUMBER_ROWS - 1; row >= 0; row--) {
      console.write(`${row + 1} `);
      for (let column = 0; column < Coordinate.NUMBER_COLUMNS; column++) {
        console.write(`${this.#board.getColor(new Coordinate(row, column)) || "_"},`);
      }
      console.writeln();
    }
  }
}

class PlayerView {

  turn;

  constructor(turn) {
    this.turn = turn;
  }

  writeTitle() {
    console.writeln(`--------------------------`);
  }
}

class HumanView extends PlayerView {

  constructor(turn) {
    super(turn);
  }

  dropToken() {
    let error;
    do {
      this.writeTitle();
      let column = console.readNumber(`Player ${this.turn.getCurrentPlayer().getColor()} Select column between (1 - 7)`) - 1;
      error = this.turn.getCurrentPlayer().dropToken(column);
      if (error) {
        console.writeln(error);
      }
    } while (error);
  }
}

class RandomView extends PlayerView {

  constructor(turn) {
    super(turn);
  }

  dropToken() {
    this.writeTitle();
    this.turn.getCurrentPlayer().dropToken();
  }
}

class TurnView {

  #turn;
  #playersView = [];

  constructor(turn) {
    this.#turn = turn;
  }

  config() {
    let number;
    let error = false;
    do {
      number = console.readNumber(`Tell me the number of human players (until 2)`);
      error = !Turn.isNumberPlayerValid(number)
      if (error) {
        console.writeln(`This number of human players ${number} is not valid`);
      }
    } while (error);
    let players = [];
    for (let i = 0; i < Turn.MAX_PLAYERS; i++) {
      this.#playersView[i] = (i < number) ? new HumanView(this.#turn) : new RandomView(this.#turn);
      players[i] = (i < number) ? Human : Random;
    }
    this.#turn.setPlayers(players)
  }

  play() {
    let playerView;
    if (this.#turn.getCurrentPlayer() instanceof Human) {
      playerView = new HumanView(this.#turn);
    } else {
      playerView = new RandomView(this.#turn)
    }

    playerView.dropToken();

    // this.#playersView[this.#turn.getCurrentTurn()].dropToken();
  }
}

class GameView {

  #game;
  #boardView;
  #turnView;

  constructor() {
    this.#game = new Game();;
    this.#boardView = new BoardView(this.#game.getBoard());
    this.#turnView = new TurnView(this.#game.getTurn());
  }

  play() {
    console.writeln(`----- CONNECT4 -----`);
    this.#turnView.config();
    let gameFinished;
    do {
      this.#boardView.show();
      this.#turnView.play();
      gameFinished = this.#game.isFinished();
      if (!gameFinished) {
        this.#game.changeTurn();
      }
    } while (!gameFinished);
    this.#showResult();
  }

  #showResult() {
    this.#boardView.show();
    console.writeln(this.#game.isWinner() ? `The winner is the player ${this.#game.getCurrentPlayer().getColor()}` : `Tied Game`);
  }
}

class YesNoDialogView {

  #question;
  #answer;

  constructor(question) {
    this.#question = question;
  }

  read() {
    let error;
    do {
      this.#answer = console.readString(this.#question);
      error = !this.isAffirmative() && !this.isNegative();
      if (error) {
        console.writeln(`Please answer "yes" or "no"`);
      }
    } while (error);
  }

  isAffirmative() {
    return this.#answer === `yes`;
  }

  isNegative() {
    return this.#answer === `no`;
  }
}

class Connect4View {

  play() {
    const continueDialogView = new YesNoDialogView(`Do you want to continue? (yes/no)`);
    do {
      new GameView().play();
      continueDialogView.read();
    } while (continueDialogView.isAffirmative());
  }
}

new Connect4View().play();

module.exports.Game = Game;
module.exports.Coordinate = Coordinate;
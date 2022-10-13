const { Console } = require("console-mpds");
const console = new Console();

let Coordinate = function(row, col) {
  this.row = row;
  this.col = col;
}
Coordinate.prototype.getRow = function() {
  return this.row;
}

Coordinate.prototype.getCol = function() {
  return this.col;
}

Coordinate.prototype.getShifted = function(direction) {
  return new Coordinate(this.row + direction.getRow(), this.col + direction.getCol());
}

Coordinate.NUMBER_ROWS = 6;
Coordinate.NUMBER_COLUMNS = 7;

let Direction = function(row, col) {
  Coordinate.call(this, row, col);
  this.row = row;
  this.col = col;
}

Direction.prototype = Object.create(Coordinate.prototype)

Direction.prototype.getOppocite = function() {
  return new Direction(this.row * -1, this.col * -1);
}

Direction.SOUTH = new Direction(-1, 0);
Direction.WEST = new Direction(0, -1);
Direction.SOUTH_WEST = new Direction(-1, -1);
Direction.NORTH_WEST = new Direction(1, -1);
Direction.VALUES = [Direction.SOUTH,Direction.WEST,Direction.SOUTH_WEST,Direction.NORTH_WEST];

let Line = function(initialCoordinate, direction) {
  this.coordinates = [initialCoordinate];
  for (let i = 0; i < Line.LENGTH - 1; i++) {
    this.coordinates.push(this.coordinates[i].getShifted(direction));
  }
}

Line.prototype.get = function(ordinal) {
  return this.coordinates[ordinal];
}

Line.prototype.displaceOne = function(direction) {
  this.coordinates = this.coordinates.map(coordinate => coordinate.getShifted(direction));
  return this;
}

Line.LENGTH = 4;

let Turn = function() {
  this.numberOfTurns = 0;
  this.MAX_TURNS = 42;
  this.COLORS = ["R", "Y"];

  this.getTurn = function() {
    return this.numberOfTurns % 2;
  }
}

Turn.prototype.getCurrentColor = function() {
  return this.COLORS[this.getTurn()];
}

Turn.prototype.changeTurn = function() {
  this.numberOfTurns++;
}

Turn.prototype.isFinished = function() {
  return this.numberOfTurns === this.MAX_TURNS - 1;
}

let Board = function() {
  this.cells = Array.from(Array(Coordinate.NUMBER_ROWS), () => Array(Coordinate.NUMBER_COLUMNS));
  this.EMPTY_CELL = undefined;
  this.currentCoordinate;
  
  this.calculateRow = function(col) {
    for (let row = 0; row < this.cells.length; row++) {
      if (this.cells[row][col] === this.EMPTY_CELL) {
        return row;
      }
    }
  }

  this.isConnect4 = function(line) {
    const COLOR = this.getColor(line.get(0));
    for (let i = 1; i < Line.LENGTH; i++) {
      if (this.getColor(line.get(i)) !== COLOR) {
        return false;
      }
    }
    return true;
  }
  
  this.getColor = function(coordinate) {
    if (0 > coordinate.getRow() || coordinate.getRow() >= Coordinate.NUMBER_ROWS) {
      return undefined;
    }
    return this.cells[coordinate.getRow()][coordinate.getCol()];
  }
}

Board.prototype.getColor = this.getColor

Board.prototype.isFullColumn = function(col) {
  return this.cells[Coordinate.NUMBER_ROWS - 1][col] !== this.EMPTY_CELL;
}

Board.prototype.addColor = function(col, color) {
  const row = this.calculateRow(col);
  this.cells[row][col] = color;
  this.currentCoordinate = new Coordinate(row, col);
}

Board.prototype.isWinner = function() {
  const DIRECTIONS = Direction.VALUES;
  let isWinner = false;
  for (let i = 0; !isWinner && i < DIRECTIONS.length; i++) {
    let line = new Line(this.currentCoordinate, DIRECTIONS[i]);
    isWinner = this.isConnect4(line);
      for (let j = 0; !isWinner && j < Line.LENGTH - 1; j++) {
        line = line.displaceOne(DIRECTIONS[i].getOppocite());
        isWinner = this.isConnect4(line);
      } 
        
  }
  return isWinner;
}

let Game = function() {
  this.turn = new Turn();
  this.board = new Board();
}

Game.prototype.getBoard = function() {
  return this.board;
}
Game.prototype.getCurrentColor = function() {
  return this.turn.getCurrentColor();
}
Game.prototype.changeTurn = function() {
  this.turn.changeTurn();
}
Game.prototype.addColor = function(col) {
  this.board.addColor(col, this.turn.getCurrentColor());
}
Game.prototype.isFullColumn = function(col) {
  return this.board.isFullColumn(col);
}
Game.prototype.isWinner = function() {
  return this.board.isWinner();
}
Game.prototype.isTied = function() {
  return this.turn.isFinished();
}

let PlayerView = function(game) {
  this.game = game;
}

PlayerView.prototype.putColor = function() {
  let col;
  do {
    console.writeln(`--------------------------`);
    col = console.readNumber(`Player ${this.game.getCurrentColor()} Select column between (1 - 7)`);
    if (col < 1 || Coordinate.NUMBER_COLUMNS < col) {
      console.writeln(`Remember columns between 1 and 7`);
      col = null;
    } else if (this.game.isFullColumn(col - 1)) {
      console.writeln(`This column is full`);
      col = null;
    }
  } while (!col);
  this.game.addColor(col - 1);
}

let BoardView = function(board) {
  this.board = board;
}

BoardView.prototype.show = function() {
  console.writeln(`* 1 2 3 4 5 6 7`);
  for (let row = Coordinate.NUMBER_ROWS - 1; row >= 0; row--) {
    console.write(`${row + 1} `);
    for (let col = 0; col < Coordinate.NUMBER_COLUMNS; col++) {
      console.write(`${this.board.getColor(new Coordinate(row, col)) || "_"},`);
    }
    console.writeln();
  }
}

let GameView = function(game) {
  this.game = game;
  this.playerView = new PlayerView(game);
  this.boardView = new BoardView(game.getBoard());
  
  this.showResult = function() {
    console.writeln(game.isTied() ? `Tied Game` : `The winner is the player ${game.getCurrentColor()}`);
  }
}

GameView.prototype.play = function() {
  console.writeln(`----- CONNECT4 -----`);
  this.boardView.show();
  let gameFinished;
  do {
    this.playerView.putColor();
    gameFinished = this.game.isWinner() || this.game.isTied();
    if (!gameFinished) {
      this.game.changeTurn();
    }
    this.boardView.show();
  } while (!gameFinished);
    this.showResult();
}

let YesNoDialogView = function(question) {
  this.question = question;
  this.answer = ``;
}
YesNoDialogView.prototype.read = function() {
  let error;
  do {
    this.answer = console.readString(this.question);
    error = !this.isAffirmative() && !this.isNegative();
    if (error) {
      console.writeln(`Please answer "yes" or "no"`);
    }
  } while (error);
}

YesNoDialogView.prototype.isAffirmative = function() {
  return this.answer === `yes`;
}

YesNoDialogView.prototype.isNegative = function() {
  return this.answer === `no`;
}

let Connect4View = function() {}

Connect4View.prototype.play = function() {
  const continueDialogView = new YesNoDialogView(`Do you want to continue? (yes/no)`);
  do {
    new GameView(new Game()).play();
    continueDialogView.read();
  } while (continueDialogView.isAffirmative());
}

new Connect4View().play();

exports.Game = Game;

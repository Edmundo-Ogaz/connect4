const { Console } = require("console-mpds");
const console = new Console();

let initCoordinate = function(row, col) {

  return {
    getRow() {
      return row;
    },
    getCol() {
      return col;
    },
    getShifted(direction) {
      return initCoordinate(row + direction.getRow(), col + direction.getCol());
    },
  }
}
initCoordinate.NUMBER_ROWS = 6;
initCoordinate.NUMBER_COLUMNS = 7;

let initDirection = function(row, col) {

  return {
    getRow() {
      return row;
    },
    getCol() {
      return col;
    },
    getOppocite() {
      return initDirection(row * -1, col * -1);
    }
  }
}
initDirection.SOUTH = initDirection(-1, 0);
initDirection.WEST = initDirection(0, -1);
initDirection.SOUTH_WEST = initDirection(-1, -1);
initDirection.NORTH_WEST = initDirection(1, -1);
initDirection.VALUES = [initDirection.SOUTH,initDirection.WEST,initDirection.SOUTH_WEST,initDirection.NORTH_WEST];

let initLine = function(initialCoordinate, direction) {

  let coordinates = [initialCoordinate];
  for (let i = 0; i < initLine.TOKENS_CONNECTED_FOR_WIN - 1; i++) {
    coordinates.push(coordinates[i].getShifted(direction));
  }

  return {
    get(ordinal) {
      return coordinates[ordinal];
    },
    displaceOne(direction) {
      coordinates = coordinates.map(coordinate => coordinate.getShifted(direction));
      return this;
    }
  }
}
initLine.TOKENS_CONNECTED_FOR_WIN = 4;

let initTurn = function() {

  let numberOfTurns = 0;
  const MAX_TURNS = 42;
  const COLORS = ["R", "Y"];

  function getTurn() {
    return numberOfTurns % 2;
  }

  return {
    getCurrentColor() {
      return COLORS[getTurn()];
    },
    changeTurn() {
      numberOfTurns++;
    },
    isFinished() {
      return numberOfTurns === MAX_TURNS - 1;
    }
  }
}

let initBoard = function() {
  let cells = Array.from(Array(initCoordinate.NUMBER_ROWS), () => Array(initCoordinate.NUMBER_COLUMNS));
  const EMPTY_CELL = undefined;
  let currentCoordinate;
  
  function calculateRow(col) {
    for (let row = 0; row < cells.length; row++) {
      if (cells[row][col] === EMPTY_CELL) {
        return row;
      }
    }
  }

  function isConnect4(line) {
    const COLOR = getColor(line.get(0));
    for (let i = 1; i < initLine.TOKENS_CONNECTED_FOR_WIN; i++) {
      if (getColor(line.get(i)) !== COLOR) {
        return false;
      }
    }
    return true;
  }
  
  function getColor(coordinate) {
    if (0 > coordinate.getRow() || coordinate.getRow() >= initCoordinate.NUMBER_ROWS) {
      return undefined;
    }
    return cells[coordinate.getRow()][coordinate.getCol()];
  }

  return {
    getColor,
    isFullColumn(col) {
      return cells[initCoordinate.NUMBER_ROWS - 1][col] !== EMPTY_CELL;
    },
    addColor(col, color) {
      const row = calculateRow(col);
      cells[row][col] = color;
      currentCoordinate = initCoordinate(row, col);
    },
    isWinner() {
      const DIRECTIONS = initDirection.VALUES;
      let isWinner = false;
      for (let i = 0; !isWinner && i < DIRECTIONS.length; i++) {
        let line = initLine(currentCoordinate, DIRECTIONS[i]);
        isWinner = isConnect4(line);
          for (let j = 0; !isWinner && j < initLine.TOKENS_CONNECTED_FOR_WIN - 1; j++) {
            line = line.displaceOne(DIRECTIONS[i].getOppocite());
            isWinner = isConnect4(line);
          } 
            
      }
      return isWinner;
    }
  }
}

let initGame = function() {
  let turn = initTurn();
  let board = initBoard();

  return {
    getBoard() {
      return board;
    },
    getCurrentColor() {
      return turn.getCurrentColor();
    },
    changeTurn() {
      turn.changeTurn();
    },
    addColor(col) {
      board.addColor(col, turn.getCurrentColor());
    },
    isFullColumn(col) {
      return board.isFullColumn(col);
    },
    isWinner() {
      return board.isWinner();
    },
    isTied() {
      return turn.isFinished();
    }
  }
}

let initPlayerView = function(game) {
  return {
    putColor() {
      let col;
      do {
        console.writeln(`--------------------------`);
        col = console.readNumber(`Player ${game.getCurrentColor()} Select column between (1 - 7)`);
        if (col < 1 || initCoordinate.NUMBER_COLUMNS < col) {
          console.writeln(`Remember columns between 1 and 7`);
          col = null;
        } else if (game.isFullColumn(col - 1)) {
          console.writeln(`This column is full`);
          col = null;
        }
      } while (!col);
      game.addColor(col - 1);
    }
  }
}

let initBoardView = function(board) {
  return {
    show() {
      console.writeln(`* 1 2 3 4 5 6 7`);
      for (let row = initCoordinate.NUMBER_ROWS - 1; row >= 0; row--) {
        console.write(`${row + 1} `);
        for (let col = 0; col < initCoordinate.NUMBER_COLUMNS; col++) {
          console.write(`${board.getColor(initCoordinate(row, col)) || "_"},`);
        }
        console.writeln();
      }
    }
  }
}

let initGameView = function(game) {
  let playerView = initPlayerView(game);
  let boardView = initBoardView(game.getBoard());

  function showResult() {
    console.writeln(game.isTied() ? `Tied Game` : `The winner is the player ${game.getCurrentColor()}`);
  }

  return {
    play() {
      console.writeln(`----- CONNECT4 -----`);
      boardView.show();
      let gameFinished;
      do {
        playerView.putColor();
        gameFinished = game.isWinner() || game.isTied();
        if (!gameFinished) {
          game.changeTurn();
        }
        boardView.show();
      } while (!gameFinished);
        showResult();
    }
  }
}

let initYesNoDialogView = function(question) {
  let answer = ``;
  return {
    read() {
      let error;
      do {
        answer = console.readString(question);
        error = !this.isAffirmative() && !this.isNegative();
        if (error) {
          console.writeln(`Please answer "yes" or "no"`);
        }
      } while (error);
    },
    isAffirmative() {
      return answer === `yes`;
    },
    isNegative() {
      return answer === `no`;
    }
  };
}

let initConnect4View = function() {
  return {
    play() {
      const continueDialogView = initYesNoDialogView(`Do you want to continue? (yes/no)`);
      do {
        let game = initGame();
        initGameView(game).play();
        continueDialogView.read();
      } while (continueDialogView.isAffirmative());
    }
  }
}

initConnect4View().play();

exports.initGame = initGame;

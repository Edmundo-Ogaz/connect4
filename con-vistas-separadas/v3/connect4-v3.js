const { Console } = require("console-mpds");
const console = new Console();

initConnect4View().play();

function initConnect4View() {
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

function initYesNoDialogView(question) {
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

function initGameView(game) {
  let playerView = initPlayerView(game);
  let boardView = initBoardView(game.getBoard());
  return {
    play() {
      console.writeln(`----- CONNECT4 -----`);
      boardView.showBoard();
      let gameFinished;
      do {
        playerView.putToken();
        gameFinished = game.isWinner() || game.isTied();
        if (!gameFinished) {
          game.changeTurn();
        }
        boardView.showBoard();
      } while (!gameFinished);
      console.writeln(game.isTied() ? `Tied Game` : `The winner is the player ${game.getColor()}`);
    }
  }
}

function initPlayerView(game) {
  return {
    putToken() {
      let col, row;
      let correctColumn = true;
      do {
        console.writeln(`--------------------------`);
        col = console.readNumber(`Player ${game.getColor()} Select column between (1 - 7)`);
        row = game.calculateRow(col - 1);
        if (col < 1 || 7 < col) {
          console.writeln("Remember columns between 1 and 7");
          correctColumn = false;
        } else if (row === undefined) {
          console.writeln("This column is full");
          correctColumn = false;
        }
      } while (!correctColumn);

      game.addToken(initCoordinate(col - 1, row));
    }
  }
}

function initBoardView(board) {
  return {
    showBoard() {
      console.writeln(`* 1 2 3 4 5 6 7`);;
      for (let row = board.MAX_ROWS - 1; row >= 0; row--) {
        console.write(`${row + 1} `);
        for (let col = 0; col < board.MAX_COLUMNS; col++) {
          console.write(`${board.getCell(initCoordinate(col, row)) || "_"},`);
        }
        console.writeln();
      }
    }
  }
}

function initGame() {
  let turn = initTurn();
  let board = initBoard();
  let checker = initChecker();
  let currentCoordinate;

  return {
    getBoard() {
      return board;
    },
    getColor() {
      return turn.getColor();
    },
    changeTurn() {
      turn.changeTurn();
    },
    addToken(coordinate) {
      currentCoordinate = coordinate;
      board.addToken(coordinate, turn.getColor());
    },
    calculateRow(col) {
      return board.calculateRow(col);
    },
    isWinner() {
      return board.isWinner(currentCoordinate);
    },
    isTied() {
      return turn.isFinished();
    }
  }
}

function initBoard() {
  const EMPTY_CELL = undefined;
  const MAX_ROWS = 6;
  const MAX_COLUMNS = 7;
  let cells = Array.from(Array(MAX_ROWS), () => Array(MAX_COLUMNS));
  const TOKENS_CONNECTED_FOR_WIN = 4;

  function getCell(coordinate) {
    if (0 > coordinate.y || coordinate.y >= MAX_ROWS) {
      return undefined;
    }
    return cells[coordinate.y][coordinate.x];
  }
  
  function isConnect4(direction) {
    const TOKEN = getCell(direction[0]);
    for (let i = 1; i < TOKENS_CONNECTED_FOR_WIN; i++) {
      if (getCell(direction[i]) !== TOKEN) {
        return false;
      }
    }
    return true;
  }

  return {
    MAX_ROWS,
    MAX_COLUMNS,
    getCell,
    calculateRow(col) {
      for (let row = 0; row < cells.length - 1; row++) {
        if (cells[row][col] === EMPTY_CELL) {
          return row;
        }
      }
    },
    addToken(coordinate, color) {
      cells[coordinate.y][coordinate.x] = color;
    },
    isWinner(currentCoordinate) {
      const SOUTH = initLine(currentCoordinate, initCoordinate(0, -1));
      const WEST = initLine(currentCoordinate, initCoordinate(-1, 0));
      const SOUTH_WEST = initLine(currentCoordinate, initCoordinate(-1, -1));
      const NORTH_WEST = initLine(currentCoordinate, initCoordinate(1, -1));
      const DIRECTIONS = [SOUTH, WEST, SOUTH_WEST, NORTH_WEST];
      let isWinner = false;
      for (let i = 0; !isWinner && i < DIRECTIONS.length; i++) {
        isWinner = isConnect4(DIRECTIONS[i].getLine())
          || isConnect4(DIRECTIONS[i].getOppocite());;
      }
      return isWinner;
    }
  }
}

function initTurn() {

  let numberOfTurns = 0;
  const MAX_TURNS = 42;
  const COLORS = ["R", "Y"];

  function getTurn() {
    return numberOfTurns % 2;
  }

  return {
    getColor() {
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

function initChecker() {

  let currentCoordinate;
  const TOKENS_CONNECTED_FOR_WIN = 4;
  
  function isConnect4(direction, board) {
    const TOKEN = board.getCell(direction[0]);
    for (let i = 1; i < TOKENS_CONNECTED_FOR_WIN; i++) {
      if (board.getCell(direction[i]) !== TOKEN) {
        return false;
      }
    }
    return true;
  }

  return {
    setCurrentCoordinate(coordinate) {
      currentCoordinate = coordinate;
    },
    isWinner(board) {
      const SOUTH = initLine(currentCoordinate, initCoordinate(0, -1));
      const WEST = initLine(currentCoordinate, initCoordinate(-1, 0));
      const SOUTH_WEST = initLine(currentCoordinate, initCoordinate(-1, -1));
      const NORTH_WEST = initLine(currentCoordinate, initCoordinate(1, -1));
      const DIRECTIONS = [SOUTH, WEST, SOUTH_WEST, NORTH_WEST];
      let isWinner = false;
      for (let i = 0; !isWinner && i < DIRECTIONS.length; i++) {
        isWinner = isConnect4(DIRECTIONS[i].getLine(), board)
          || isConnect4(DIRECTIONS[i].getOppocite(), board);;
      }
      return isWinner;
    }
  }
}

function initLine(initial, coordinateShift) {
    
  const LENGTH = 4;
  let coordenates = getCoordenates(initial, coordinateShift);
  let oppocite = getCoordenates(initial, initCoordinate(coordinateShift.x * -1, coordinateShift.y * -1));

  function getCoordenates(initial, coordinateShift) {
    let coordenates = [initCoordinate(initial.x, initial.y)];
    for (let i = 0; i < LENGTH - 1; i++) {
      coordenates.push(coordenates[i].shift(coordinateShift));
    }
    return coordenates;
  }

  return {
    getLine() {
      return coordenates;
    },
    getOppocite() {
      return oppocite;
    }
  }
}

function initCoordinate(x, y) {

  return {
    x,
    y,
    shift(coordinate) {
      return initCoordinate(this.x + coordinate.x, this.y + coordinate.y);
    }
  }
}

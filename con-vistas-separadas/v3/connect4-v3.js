const { Console } = require("console-mpds");
const console = new Console();

initConnect4View().play();

function initConnect4View() {
  return {
    play() {
      const continueDialogView = initYesNoDialogView(`Do you want to continue? (yes/no)`);
      do {
        initGameView().play();
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

function initGameView() {
  let game = initGame();
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
      console.writeln(game.isTied() ? `Tied Game` : `The winner is the player ${game.getPlayer()}`);
    }
  }
}

function initPlayerView(game) {
  return {
    putToken() {
      let correctColumn = true;
      do {
        console.writeln(`--------------------------`);
        var col = console.readNumber(`Player ${game.getPlayer()} Select column between (1 - 7)`);
        var row = game.calculateRow(col - 1);
        if (1 > col || col > 7) {
          console.writeln("Remember columns between 1 and 7");
          correctColumn = false;
        } else if (row === undefined) {
          console.writeln("This column is full");
          correctColumn = false;
        }
      } while (!correctColumn);

      game.addToken({player: game.getPlayer(), col: col - 1, row});
    }
  }
}

function initBoardView(board) {
  return {
    showBoard() {
      console.writeln(`* 1 2 3 4 5 6 7`);;
      for (let row = board.MAX_ROWS - 1; row >= 0; row--) {
        console.write(`${row + 1} `);
        console.writeln(board.getRow(row));
      }
    }
  }
}

function initGame() {
  let turn = initTurn();
  let board = initBoard();
  let checker = initChecker();

  return {
    getBoard() {
      return board;
    },
    getPlayer() {
      return turn.getPlayer();
    },
    changeTurn() {
      turn.changeTurn();
    },
    addToken(token) {
      checker.setCurrentToken(token);
      board.addToken(token);
    },
    calculateRow(col) {
      return board.calculateRow(col);
    },
    isWinner() {
      return checker.isConnectedInHorizontal(board)
        || checker.isConnectedInVertical(board)
        || checker.isConnectedInDiagonalPrincipal(board)
        || checker.isConnectedInDiagonalSecond(board);
    },
    isTied() {
      return turn.isFinished();
    }
  }
}

function initBoard() {
  const MIN_ROWS = 1;
  const MIN_COLUMNS = 1;
  const MAX_ROWS = 6;
  const MAX_COLUMNS = 7;
  let grid = [["_", "_", "_", "_", "_", "_", "_"],
              ["_", "_", "_", "_", "_", "_", "_"],
              ["_", "_", "_", "_", "_", "_", "_"],
              ["_", "_", "_", "_", "_", "_", "_"],
              ["_", "_", "_", "_", "_", "_", "_"],
              ["_", "_", "_", "_", "_", "_", "_"]];

  return {
    MAX_ROWS,
    getCell(coordinate) {
      if (0 > coordinate.y || coordinate.y >= MAX_ROWS) {
        return undefined;
      }
      return grid[coordinate.y][coordinate.x];
    },
    getRow(number) {
      return grid[number];
    },
    calculateRow(col) {
      for (let row = 0; row < grid.length - 1; row++) {
        if (grid[row][col] === "_") {
          return row;
        }
      }
    },
    addToken(token) {
      grid[token.row][token.col] = token.player;
    }
  }
}

function initTurn() {

  let numberOfTurns = 0;
  const MAX_TURNS = 42;
  const PLAYERS = ["X", "O"];

  function getTurn() {
    return numberOfTurns % 2;
  }

  return {
    getPlayer() {
      return getTurn() === 0 ? PLAYERS[0] : PLAYERS[1];
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

  let currentToken;
  const TOKENS_CONNECTED_FOR_WIN = 4;
  
  function isConnect4(direction, board) {
    for (let i = 1; i < TOKENS_CONNECTED_FOR_WIN; i++) {
      if (board.getCell(direction[i]) !== currentToken.player) {
        return false;
      }
    }
    return true;
  }

  return {
    setCurrentToken(token) {
      currentToken = token;
    },
    isConnectedInVertical(board) {
      let vertical = initDirection(`DOWN`, currentToken);
      return isConnect4(vertical.getDirection(), board);
    },
    isConnectedInHorizontal(board) {
      let horizontal = initDirection(`RIGHT`, currentToken);
      return isConnect4(horizontal.getDirection(), board) 
        || isConnect4(horizontal.getOppocite(), board);
    },
    isConnectedInDiagonalPrincipal(board) {
      let diagonalPrincial = initDirection(`DIAGONAL_PRINCIPAL`, currentToken);
      return isConnect4(diagonalPrincial.getDirection(), board) 
        || isConnect4(diagonalPrincial.getOppocite(), board);
    },
    isConnectedInDiagonalSecond(board) {
      let diagonalSecond = initDirection(`DIAGONAL_SECOND`, currentToken);
      return isConnect4(diagonalSecond.getDirection(), board) 
        || isConnect4(diagonalSecond.getOppocite(), board);
    }
  }
}

function initDirection(type, token) {

  const LENGTH = 4;
  let direction = geCoordinates();

  function geCoordinates(isOpposite) {
    let coordinates = [initCoordinate(token.col, token.row)];
    for (let i = 0; i < LENGTH; i++) {
      if (type === `DOWN`) {
        coordinates.push(coordinates[i].getSouth());
      } else if (type === `RIGHT` && isOpposite) {
        coordinates.push(coordinates[i].getWest());
      } else if (type === `RIGHT`) {
        coordinates.push(coordinates[i].getEast());
      } else if (type === `DIAGONAL_PRINCIPAL` && isOpposite) {
        coordinates.push(coordinates[i].getSouthWest());
      } else if (type === `DIAGONAL_PRINCIPAL`) {
        coordinates.push(coordinates[i].getNorthEast());
      } else if (type === `DIAGONAL_SECOND` && isOpposite) {
        coordinates.push(coordinates[i].getNorthWest());
      } else if (type === `DIAGONAL_SECOND`) {
        coordinates.push(coordinates[i].getSouthEast());
      }
    }
    return coordinates;
  }

  return {
    getDirection() {
      return direction;
    },
    getOppocite() {
      return geCoordinates(true);
    }
  }
}

function initCoordinate(x, y) {

  return {
    x,
    y,
    getNorth() {
      return initCoordinate(x, y + 1);
    },
    getSouth() {
      return initCoordinate(x, y - 1);
    },
    getEast() {
      return initCoordinate(x + 1, y);
    },
    getWest() {
      return initCoordinate(x - 1, y);
    },
    getNorthEast() {
      return initCoordinate(x + 1, y + 1);
    },
    getSouthEast() {
      return initCoordinate(x + 1, y - 1);
    },
    getSouthWest() {
      return initCoordinate(x - 1, y - 1);
    },
    getNorthWest() {
      return initCoordinate(x - 1, y + 1);
    }
  }
}

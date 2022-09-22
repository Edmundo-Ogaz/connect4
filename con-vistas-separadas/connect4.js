const { Console } = require("console-mpds");
const console = new Console();

initConnect4View().play();

function initConnect4View() {
  return {
    play() {
      const continueDialogView = initYesNoDialogView(`Do you want to continue? (yes/no)`);
      do {
        const gameMode = initGameMode();
        initGameView(gameMode).play();
        continueDialogView.read();
      } while (continueDialogView.isAffirmative());
    }
  }
}

function initGameMode() {
  const gameModes = [[CPU(), CPU()],
  [PlayerView(), CPU()],
  [PlayerView(), PlayerView()]];
  let error = false;
  do {
    let response = console.readNumber(`Tell me the game mode:
              (0) Demo-Game, (1) Player Vs CPU, (2) Player Vs Player`);
    if (response === 0 || response === 1 || response === 2) {
      return gameModes[response];
    } else {
      console.writeln(`This game mode ${response} doesn´t exist`);
      error = true;
    }
  } while (error);
}

function CPU() {
  return {
    readToken(game) {
      let coordinate = {};
      let correctColumn = true;
      do {
        console.writeln(`--------------------------`);
        coordinate.col = parseInt(Math.random() * 7) + 1;
        coordinate.row = game.calculateRow(coordinate.col);
        if (1 > coordinate.col || coordinate.col > 7) {
          correctColumn = false;
        } else if (coordinate.row === undefined) {
          correctColumn = false;
        }
      } while (!correctColumn);

      game.addToken(coordinate, game.getPlayer());
    }
  }
}

function PlayerView() {
  return {
    readToken(game) {
      let coordinate = {};
      let correctColumn = true;
      do {
        console.writeln(`--------------------------`);
        coordinate.col = console.readNumber(`Player ${game.getPlayer()} Select column between (1 - 7)`);
        coordinate.row = game.calculateRow(coordinate.col);
        console.writeln(coordinate.col);
        if (1 > coordinate.col || coordinate.col > 7) {
          console.writeln("Remember columns between 1 and 7");
          correctColumn = false;
        } else if (coordinate.row === undefined) {
          console.writeln("This column is full");
          correctColumn = false;
        }
      } while (!correctColumn);

      game.addToken(coordinate, game.getPlayer());
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

function initGameView(players) {
  let game = initGame();
  return {
    play() {
      console.writeln(`----- CONNECT4 -----`);
      this.showBoard();
      let gameFinished;
      do {
        players[game.getTurn()].readToken(game);
        gameFinished = game.isWinner() || game.isTied();
        if (!gameFinished) {
          game.changeTurn();
        }
        this.showBoard();
      } while (!gameFinished);
      this.showFinalMsg();
    },
    showBoard() {
      for (let row = 0; row < game.getBoardLength(); row++) {
        console.writeln(game.getBoardRow(row));
      }
    },
    showFinalMsg() {
      game.isTied() ? console.writeln(`Tied Game`) : console.writeln(`The winner is the player ${game.getPlayer()}`);
    }
  }
}

function initGame() {
  let turn = initTurn();
  let board = initBoard();
  let currentToken = null;

  return {
    getBoardLength() {
      return board.getLength();
    },
    getBoardRow(number) {
      return board.getRow(number);
    },
    getTurn() {
      return turn.getTurn();
    },
    getPlayer() {
      return turn.getPlayer();
    },
    changeTurn() {
      turn.changeTurn();
    },
    addToken(coordinate, player) {
      currentToken = {...coordinate, player};
      board.addToken(coordinate, player);
    },
    calculateRow(col) {
      return board.calculateRow(col);
    },
    isWinner() {
      return board.isConnectedInHorizontal(currentToken)
        || board.isConnectedInVertical(currentToken)
        || board.isConnectedInDiagonal(currentToken);
    },
    isTied() {
      return turn.getTurns() === turn.MAX_TURNS - 1;
    }
  }
}

function initBoard() {
  const MIN_ROWS = 1;
  const MIN_COLUMNS = 1;
  const MAX_ROWS = 6;
  const MAX_COLUMNS = 7;
  const TOKENS_CONNECTED_FOR_WIN = 4;
  let grid = [["*", "1", "2", "3", "4", "5", "6", "7"],
  ["1", "_", "_", "_", "_", "_", "_", "_"],
  ["2", "_", "_", "_", "_", "_", "_", "_"],
  ["3", "_", "_", "_", "_", "_", "_", "_"],
  ["4", "_", "_", "_", "_", "_", "_", "_"],
  ["5", "_", "_", "_", "_", "_", "_", "_"],
  ["6", "_", "_", "_", "_", "_", "_", "_"]];


  function isConnect4(connect4, {row, col, player}) {
    console.writeln(JSON.stringify(connect4));
    if (grid[row][col] === player) {
      connect4.counter++;
      if (connect4.counter === TOKENS_CONNECTED_FOR_WIN) {
        return true;
      }
    } else {
      connect4.counter = 0;
    }
  }

  return {
    getLength() {
      return grid.length;
    },
    getRow(number) {
      return grid[number];
    },
    calculateRow(col) {
      for (let row = grid.length - 1; row >= 0; row--) {
        if (grid[row][col] === "_") {
          return row;
        }
      }
    },
    addToken(coordinate, player) {
      grid[coordinate.row][coordinate.col] = player;
    },
    isConnectedInVertical(coordinate) {
      let countVertical = {counter: 0};
      for (let row = coordinate.row; row <= MAX_ROWS; row++) {
        if (isConnect4(countVertical, {...coordinate, row})) {
          return true;
        }
      }
    },
    isConnectedInHorizontal(coordinate) {
      let countHorizontal = {counter: 0};
      for (let col = MIN_COLUMNS; col <= MAX_COLUMNS; col++) {
        if (isConnect4(countHorizontal, {...coordinate, col})) {
          return true;
        }
      }
    },
    isConnectedInDiagonal(coordinate) {
      let countDiagonalRight = {counter: 0};
      for (let row = coordinate.row, col = coordinate.col; row <= MAX_ROWS & col >= MIN_COLUMNS; row++, col--) {
        if (isConnect4(countDiagonalRight, {...coordinate, row, col})) {
          return true;
        }
      }
      let countDiagonalLeft = {counter: 0};
      for (let row = coordinate.row, col = coordinate.col; row <= MAX_ROWS && col <= MAX_COLUMNS; row++, col++) {
        if (isConnect4(countDiagonalLeft, {...coordinate, row, col})) {
          return true;
        }
      }
    }
  }
}

function initTurn() {

  let numberOfTurns = 0;
  const MAX_TURNS = 42;
  const PLAYER_1 = "X";
  const PLAYER_2 = "O";

  return {
    MAX_TURNS,
    getPlayer() {
      return numberOfTurns % 2 === 0 ? PLAYER_1 : PLAYER_2;
    },
    getTurns() {
      return numberOfTurns;
    },
    getTurn() {
      return numberOfTurns % 2 === 0 ? 0 : 1;
    },
    changeTurn() {
      numberOfTurns++;
    }
  }
}

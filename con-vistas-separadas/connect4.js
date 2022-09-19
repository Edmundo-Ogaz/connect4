const { Console } = require("console-mpds");
const console = new Console();

initConnect4View().init();

function initConnect4View() {
    return {
        init() {
            const continueDialogView = initYesNoDialogView(`Do you want to continue? (yes/no)`);
            do {
                const players = askGameMode();
                initGameView(players).play();
                continueDialogView.read();
            } while (continueDialogView.isAffirmative());
            
            function askGameMode() {
                const gameModes = [[generateRandomPosition, generateRandomPosition],
                [askPosition, generateRandomPosition],
                [askPosition, askPosition]];
                let error = false;
                do {
                    let response = console.readNumber(`Dime el modo de juego:
                    (0) Demo-Game, (1) Player Vs CPU, (2) Player Vs Player`);
                    if (response === 0 || response === 1 || response === 2) {
                        return gameModes[response];
                    } else {
                        console.writeln(`El modo de juego ${response} no existe`);
                        error = true;
                    }
                } while (error);

                function generateRandomPosition(game) {
                    let token = initToken(game.getPlayer());
                    let correctColumn = true;
                    do {
                        console.writeln(`--------------------------`);
                        token.col = parseInt(Math.random() * 7) + 1;
                        token.row = game.calculateRow(token.col);
                        if (1 > token.col || token.col > 7) {
                            correctColumn = false;
                        } else if (token.row === undefined) {
                            correctColumn = false;
                        }
                    } while (!correctColumn);
            
                    return token;
                }

                function askPosition(game) {
                    let token = initToken(game.getPlayer());
                    let correctColumn = true;
                    do {
                        console.writeln(`--------------------------`);
                        token.col = console.readNumber(`Player ${token.player} Select column between (1 - 7)`);
                        token.row = game.calculateRow(token.col);
                        console.writeln(token.col);
                        if (1 > token.col || token.col > 7) {
                            console.writeln("Remember columns between 1 and 7");
                            correctColumn = false;
                        } else if (token.row === undefined) {
                            console.writeln("This column is full");
                            correctColumn = false;
                        }
                    } while (!correctColumn);
            
                    return token;
                }
            }
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
            let gameFinished;
            do {
                showBoard();
                const token = players[game.getTurn()](game);
                game.addToken(token);
                gameFinished = game.isWinner() || game.isTied();
                if (gameFinished) {
                    showBoard();
                    showFinalMsg();
                }
                game.changeTurn();
            } while (!gameFinished);
        
            function showBoard() {
                for (let row = 0; row < game.getBoardLength(); row++) {
                    console.writeln(game.getBoardRow(row));
                }
            }

            function showFinalMsg() {
                game.isTied() ? console.writeln(`Tied Game`) : console.writeln(`The winner is the player ${game.getPlayer()}`);
            }
        }
    }
}

function initGame() {
    const MAX_TURNS = 42;
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
        addToken(token) {
            currentToken = token;
            board.addToken(token);
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
            return turn.getTurns() === MAX_TURNS - 1;
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
        addToken(token) {
            grid[token.row][token.col] = token.player;
        },
        isConnectedInVertical(token) {
            let countVertical = 0;
            for (let row = token.row; row <= MAX_ROWS; row++) {
                if (grid[row][token.col] === token.player) {
                    countVertical++;
                    if (countVertical === TOKENS_CONNECTED_FOR_WIN) {
                        return true;
                    }
                } else {
                    countVertical = 0;
                }
            }
        },
        isConnectedInHorizontal(token) {
            let countHorizontal = 0;
            for (let col = MIN_COLUMNS; col <= MAX_COLUMNS; col++) {
                if (grid[token.row][col - MIN_ROWS] === token.player) {
                    countHorizontal++;
                    if (countHorizontal === TOKENS_CONNECTED_FOR_WIN) {
                        return true;
                    }
                } else {
                    countHorizontal = 0;
                }
            }
        },
        isConnectedInDiagonal(token) {
            let countDiagonalRight = 0;
            for (let row = token.row, col = token.col; row <= MAX_ROWS & col >= MIN_COLUMNS; row++, col--) {
                if (grid[row][col] === token.player) {
                    countDiagonalRight++;
                    if (countDiagonalRight === TOKENS_CONNECTED_FOR_WIN) {
                        return true;
                    }
                } else {
                    countDiagonalRight = 0;
                }
            }
            let countDiagonalLeft = 0;
            for (let row = token.row, col = token.col; row <= MAX_ROWS && col <= MAX_COLUMNS; row++, col++) {
                if (grid[row][col] === token.player) {
                    countDiagonalLeft++;
                    if (countDiagonalLeft === TOKENS_CONNECTED_FOR_WIN) {
                        return true;
                    }
                } else {
                    countDiagonalLeft = 0;
                }
            }
        }
    }
}

function initTurn() {

    let numberOfTurns = 0;
    const PLAYER_1 = "X";
    const PLAYER_2 = "O";

    return {
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

function initToken(player) {
    return {
        player: player,
        row: undefined,
        col: undefined
    }
}
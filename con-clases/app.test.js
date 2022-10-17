const {Game, Coordinate} = require("./app");

const COLUMN_1 = 0;
const COLUMN_2 = 1;
const COLUMN_3 = 2;
const COLUMN_4 = 3;
const COLUMN_5 = 4;
const COLUMN_6 = 5;
const COLUMN_7 = 6;

const tests = [
    () => {//CONECTA 4 EN VERTICAL
        let game = new Game()
        game.getBoard().dropToken(COLUMN_1, 'R');
        game.getBoard().dropToken(COLUMN_1, 'R');
        game.getBoard().dropToken(COLUMN_1, 'R');
        game.getBoard().dropToken(COLUMN_1, 'R');
        return game.isWinner();
    },
    () => {//CONECTA 4 EN HORIZONTAL
        let game = new Game()
        game.getBoard().dropToken(COLUMN_1, 'R');
        game.getBoard().dropToken(COLUMN_2, 'R');
        game.getBoard().dropToken(COLUMN_3, 'R');
        game.getBoard().dropToken(COLUMN_4, 'R');
        return game.isWinner();
    },
    () => {//CONNECTA 4 EN HORIZONTAL COLOCANDO ULTIMA FICHA EN COLUMNA 5
        let game = new Game()
        game.getBoard().dropToken(COLUMN_4, 'R');
        game.getBoard().dropToken(COLUMN_6, 'R');
        game.getBoard().dropToken(COLUMN_7, 'R');
        game.getBoard().dropToken(COLUMN_5, 'R');
        return game.isWinner();
    },
    () => {//CONNECTA 4 EN HORIZONTAL COLOCANDO ULTIMA FICHA EN COLUMNA 2
        let game = new Game()
        game.getBoard().dropToken(COLUMN_1, 'R');
        game.getBoard().dropToken(COLUMN_3, 'R');
        game.getBoard().dropToken(COLUMN_4, 'R');
        game.getBoard().dropToken(COLUMN_2, 'R');
        return game.isWinner();
    },
    () => {//CONNECTA 4 EN DIAGONAL COLOCANDO ULTIMA FICHA EN COLUMNA 2
        let game = new Game()
        game.getBoard().dropToken(COLUMN_1, 'R');game.getBoard().dropToken(COLUMN_1, 'R');game.getBoard().dropToken(COLUMN_1, 'R');
        game.getBoard().dropToken(COLUMN_4, 'R');game.getBoard().dropToken(COLUMN_4, 'R');game.getBoard().dropToken(COLUMN_4, 'R');game.getBoard().dropToken(COLUMN_4, 'R');game.getBoard().dropToken(COLUMN_4, 'R');
        game.getBoard().dropToken(COLUMN_5, 'R');game.getBoard().dropToken(COLUMN_5, 'R');game.getBoard().dropToken(COLUMN_5, 'R');game.getBoard().dropToken(COLUMN_5, 'R');game.getBoard().dropToken(COLUMN_5, 'R');game.getBoard().dropToken(COLUMN_5, 'R');
        game.getBoard().dropToken(COLUMN_2, 'R');game.getBoard().dropToken(COLUMN_2, 'R');game.getBoard().dropToken(COLUMN_2, 'R');game.getBoard().dropToken(COLUMN_2, 'R');
        return game.isWinner();
    },
    () => {//NO ES CONNECTA 4 PORQUE FALTA COLOCAR LA FICHA EN LA COLUMNA 2 PARA HACER LA DIAGONAL
        let game = new Game()
        game.getBoard().dropToken(COLUMN_1, 'R');game.getBoard().dropToken(COLUMN_1, 'R');game.getBoard().dropToken(COLUMN_1, 'R');
        game.getBoard().dropToken(COLUMN_4, 'R');game.getBoard().dropToken(COLUMN_4, 'R');game.getBoard().dropToken(COLUMN_4, 'R');game.getBoard().dropToken(COLUMN_4, 'R');game.getBoard().dropToken(COLUMN_4, 'R');
        game.getBoard().dropToken(COLUMN_5, 'R');game.getBoard().dropToken(COLUMN_5, 'R');game.getBoard().dropToken(COLUMN_5, 'R');game.getBoard().dropToken(COLUMN_5, 'R');game.getBoard().dropToken(COLUMN_5, 'R');game.getBoard().dropToken(COLUMN_5, 'R');
        game.getBoard().dropToken(COLUMN_2, 'R');game.getBoard().dropToken(COLUMN_2, 'R');game.getBoard().dropToken(COLUMN_2, 'R');//game.getBoard().dropToken(COLUMN_2, 'R');
        return false === game.isWinner();
    },
    () => {//CONNECTA 4 VERTICAL CAMBIANDO TURNOS
        let game = new Game()
        game.getBoard().dropToken(COLUMN_1, 'R');
        game.changeTurn();
        game.getBoard().dropToken(COLUMN_2, 'Y');
        game.changeTurn();
        game.getBoard().dropToken(COLUMN_1, 'R');
        game.changeTurn();
        game.getBoard().dropToken(COLUMN_2, 'Y');
        game.changeTurn();
        game.getBoard().dropToken(COLUMN_1, 'R');
        game.changeTurn();
        game.getBoard().dropToken(COLUMN_2, 'Y');
        game.changeTurn();
        game.getBoard().dropToken(COLUMN_1, 'R');
        return game.isWinner();
    },
    () => {//COMPROGANDO SI COLUMNA 1 ESTA LLENA
        let game = new Game()
        game.getBoard().dropToken(COLUMN_1, 'R');
        game.getBoard().dropToken(COLUMN_1, 'R');
        game.getBoard().dropToken(COLUMN_1, 'R');
        game.getBoard().dropToken(COLUMN_1, 'R');
        game.getBoard().dropToken(COLUMN_1, 'R');
        game.getBoard().dropToken(COLUMN_1, 'R');
        return game.getBoard().isComplete(COLUMN_1);
    },
    () => {//COLOCANDO TODAS LAS FICHAS EN EL TABLERO Y PREGUNTANDO SI FUE UN EMPATE
        let game = new Game()
        game.getBoard().dropToken(COLUMN_1, 'R');game.changeTurn();
        game.getBoard().dropToken(COLUMN_1, 'Y');game.changeTurn();
        game.getBoard().dropToken(COLUMN_1, 'R');game.changeTurn();
        game.getBoard().dropToken(COLUMN_1, 'Y');game.changeTurn();
        game.getBoard().dropToken(COLUMN_1, 'R');game.changeTurn();
        game.getBoard().dropToken(COLUMN_1, 'Y');game.changeTurn();
        game.getBoard().dropToken(COLUMN_2, 'R');game.changeTurn();
        game.getBoard().dropToken(COLUMN_2, 'Y');game.changeTurn();
        game.getBoard().dropToken(COLUMN_2, 'R');game.changeTurn();
        game.getBoard().dropToken(COLUMN_2, 'Y');game.changeTurn();
        game.getBoard().dropToken(COLUMN_2, 'R');game.changeTurn();
        game.getBoard().dropToken(COLUMN_2, 'Y');game.changeTurn();
        game.getBoard().dropToken(COLUMN_3, 'R');game.changeTurn();
        game.getBoard().dropToken(COLUMN_3, 'Y');game.changeTurn();
        game.getBoard().dropToken(COLUMN_3, 'R');game.changeTurn();
        game.getBoard().dropToken(COLUMN_3, 'Y');game.changeTurn();
        game.getBoard().dropToken(COLUMN_3, 'R');game.changeTurn();
        game.getBoard().dropToken(COLUMN_3, 'Y');game.changeTurn();
        game.getBoard().dropToken(COLUMN_4, 'R');game.changeTurn();
        game.getBoard().dropToken(COLUMN_4, 'Y');game.changeTurn();
        game.getBoard().dropToken(COLUMN_4, 'R');game.changeTurn();
        game.getBoard().dropToken(COLUMN_4, 'Y');game.changeTurn();
        game.getBoard().dropToken(COLUMN_4, 'R');game.changeTurn();
        game.getBoard().dropToken(COLUMN_4, 'Y');game.changeTurn();
        game.getBoard().dropToken(COLUMN_5, 'R');game.changeTurn();
        game.getBoard().dropToken(COLUMN_5, 'Y');game.changeTurn();
        game.getBoard().dropToken(COLUMN_5, 'R');game.changeTurn();
        game.getBoard().dropToken(COLUMN_5, 'Y');game.changeTurn();
        game.getBoard().dropToken(COLUMN_5, 'R');game.changeTurn();
        game.getBoard().dropToken(COLUMN_5, 'Y');game.changeTurn();
        game.getBoard().dropToken(COLUMN_6, 'R');game.changeTurn();
        game.getBoard().dropToken(COLUMN_6, 'Y');game.changeTurn();
        game.getBoard().dropToken(COLUMN_6, 'R');game.changeTurn();
        game.getBoard().dropToken(COLUMN_6, 'Y');game.changeTurn();
        game.getBoard().dropToken(COLUMN_6, 'R');game.changeTurn();
        game.getBoard().dropToken(COLUMN_6, 'Y');game.changeTurn();
        game.getBoard().dropToken(COLUMN_7, 'R');game.changeTurn();
        game.getBoard().dropToken(COLUMN_7, 'Y');game.changeTurn();
        game.getBoard().dropToken(COLUMN_7, 'Y');//game.changeTurn();
        game.getBoard().dropToken(COLUMN_7, 'R');game.changeTurn();
        game.getBoard().dropToken(COLUMN_7, 'Y');game.changeTurn();
        game.getBoard().dropToken(COLUMN_7, 'R');
        console.log(showBoard(game.getBoard()));
        return game.isFinished() && !game.isWinner();
    }
]

console.log(
    tests.map(
      test => test()));

function showBoard(board) {
    console.log(`* 1 2 3 4 5 6 7`);
    for (let row = 6 - 1; row >= 0; row--) {
        process.stdout.write(`${row + 1} `);
      for (let column = 0; column < 7; column++) {
        process.stdout.write(`${board.getColor(new Coordinate(row, column)) || "_"},`);
      }
      console.log();
    }
}
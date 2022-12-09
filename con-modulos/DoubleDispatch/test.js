import * as app from './app.js';
import { Board } from './model/Board.js';
import { Turn } from './model/Turn.js';
import { Coordinate } from './model/Coordinate.js';

const COLUMN_1 = 0;
const COLUMN_2 = 1;
const COLUMN_3 = 2;
const COLUMN_4 = 3;
const COLUMN_5 = 4;
const COLUMN_6 = 5;
const COLUMN_7 = 6;

const tests = [
    () => {//CONECTA 4 EN VERTICAL
        let board = getBoard();
        board.dropToken(COLUMN_1, 'R');
        board.dropToken(COLUMN_1, 'R');
        board.dropToken(COLUMN_1, 'R');
        board.dropToken(COLUMN_1, 'R');
        return board.isWinner();
    },
    () => {//CONECTA 4 EN HORIZONTAL
        let board = getBoard();
        board.dropToken(COLUMN_1, 'R');
        board.dropToken(COLUMN_2, 'R');
        board.dropToken(COLUMN_3, 'R');
        board.dropToken(COLUMN_4, 'R');
        return board.isWinner();
    },
    () => {//CONNECTA 4 EN HORIZONTAL COLOCANDO ULTIMA FICHA EN COLUMNA 5
        let board = getBoard();
        board.dropToken(COLUMN_4, 'R');
        board.dropToken(COLUMN_6, 'R');
        board.dropToken(COLUMN_7, 'R');
        board.dropToken(COLUMN_5, 'R');
        return board.isWinner();
    },
    () => {//CONNECTA 4 EN HORIZONTAL COLOCANDO ULTIMA FICHA EN COLUMNA 2
        let board = getBoard();
        board.dropToken(COLUMN_1, 'R');
        board.dropToken(COLUMN_3, 'R');
        board.dropToken(COLUMN_4, 'R');
        board.dropToken(COLUMN_2, 'R');
        return board.isWinner();
    },
    () => {//CONNECTA 4 EN DIAGONAL COLOCANDO ULTIMA FICHA EN COLUMNA 2
        let board = getBoard();
        board.dropToken(COLUMN_1, 'R');board.dropToken(COLUMN_1, 'R');board.dropToken(COLUMN_1, 'R');
        board.dropToken(COLUMN_4, 'R');board.dropToken(COLUMN_4, 'R');board.dropToken(COLUMN_4, 'R');board.dropToken(COLUMN_4, 'R');board.dropToken(COLUMN_4, 'R');
        board.dropToken(COLUMN_5, 'R');board.dropToken(COLUMN_5, 'R');board.dropToken(COLUMN_5, 'R');board.dropToken(COLUMN_5, 'R');board.dropToken(COLUMN_5, 'R');board.dropToken(COLUMN_5, 'R');
        board.dropToken(COLUMN_2, 'R');board.dropToken(COLUMN_2, 'R');board.dropToken(COLUMN_2, 'R');board.dropToken(COLUMN_2, 'R');
        return board.isWinner();
    },
    () => {//NO ES CONNECTA 4 PORQUE FALTA COLOCAR LA FICHA EN LA COLUMNA 2 PARA HACER LA DIAGONAL
        let board = getBoard();
        board.dropToken(COLUMN_1, 'R');board.dropToken(COLUMN_1, 'R');board.dropToken(COLUMN_1, 'R');
        board.dropToken(COLUMN_4, 'R');board.dropToken(COLUMN_4, 'R');board.dropToken(COLUMN_4, 'R');board.dropToken(COLUMN_4, 'R');board.dropToken(COLUMN_4, 'R');
        board.dropToken(COLUMN_5, 'R');board.dropToken(COLUMN_5, 'R');board.dropToken(COLUMN_5, 'R');board.dropToken(COLUMN_5, 'R');board.dropToken(COLUMN_5, 'R');board.dropToken(COLUMN_5, 'R');
        board.dropToken(COLUMN_2, 'R');board.dropToken(COLUMN_2, 'R');board.dropToken(COLUMN_2, 'R');//board.dropToken(COLUMN_2, 'R');
        return false === board.isWinner();
    },
    () => {//CONNECTA 4 VERTICAL CAMBIANDO TURNOS
        let board = getBoard();
        let turn = getTurn(board);
        board.dropToken(COLUMN_1, 'R');
        turn.changeTurn();
        board.dropToken(COLUMN_2, 'Y');
        turn.changeTurn();
        board.dropToken(COLUMN_1, 'R');
        turn.changeTurn();
        board.dropToken(COLUMN_2, 'Y');
        turn.changeTurn();
        board.dropToken(COLUMN_1, 'R');
        turn.changeTurn();
        board.dropToken(COLUMN_2, 'Y');
        turn.changeTurn();
        board.dropToken(COLUMN_1, 'R');
        return board.isWinner();
    },
    () => {//COMPROGANDO SI COLUMNA 1 ESTA LLENA
        let board = getBoard();
        board.dropToken(COLUMN_1, 'R');
        board.dropToken(COLUMN_1, 'R');
        board.dropToken(COLUMN_1, 'R');
        board.dropToken(COLUMN_1, 'R');
        board.dropToken(COLUMN_1, 'R');
        board.dropToken(COLUMN_1, 'R');
        return board.isComplete(COLUMN_1);
    },
    () => {//COLOCANDO TODAS LAS FICHAS EN EL TABLERO Y PREGUNTANDO SI FUE UN EMPATE
        let board = getBoard();
        let turn = getTurn(board);
        board.dropToken(COLUMN_1, 'R');turn.changeTurn();
        board.dropToken(COLUMN_1, 'Y');turn.changeTurn();
        board.dropToken(COLUMN_1, 'R');turn.changeTurn();
        board.dropToken(COLUMN_1, 'Y');turn.changeTurn();
        board.dropToken(COLUMN_1, 'R');turn.changeTurn();
        board.dropToken(COLUMN_1, 'Y');turn.changeTurn();
        board.dropToken(COLUMN_2, 'R');turn.changeTurn();
        board.dropToken(COLUMN_2, 'Y');turn.changeTurn();
        board.dropToken(COLUMN_2, 'R');turn.changeTurn();
        board.dropToken(COLUMN_2, 'Y');turn.changeTurn();
        board.dropToken(COLUMN_2, 'R');turn.changeTurn();
        board.dropToken(COLUMN_2, 'Y');turn.changeTurn();
        board.dropToken(COLUMN_3, 'R');turn.changeTurn();
        board.dropToken(COLUMN_3, 'Y');turn.changeTurn();
        board.dropToken(COLUMN_3, 'R');turn.changeTurn();
        board.dropToken(COLUMN_3, 'Y');turn.changeTurn();
        board.dropToken(COLUMN_3, 'R');turn.changeTurn();
        board.dropToken(COLUMN_3, 'Y');turn.changeTurn();
        board.dropToken(COLUMN_4, 'R');turn.changeTurn();
        board.dropToken(COLUMN_4, 'Y');turn.changeTurn();
        board.dropToken(COLUMN_4, 'R');turn.changeTurn();
        board.dropToken(COLUMN_4, 'Y');turn.changeTurn();
        board.dropToken(COLUMN_4, 'R');turn.changeTurn();
        board.dropToken(COLUMN_4, 'Y');turn.changeTurn();
        board.dropToken(COLUMN_5, 'R');turn.changeTurn();
        board.dropToken(COLUMN_5, 'Y');turn.changeTurn();
        board.dropToken(COLUMN_5, 'R');turn.changeTurn();
        board.dropToken(COLUMN_5, 'Y');turn.changeTurn();
        board.dropToken(COLUMN_5, 'R');turn.changeTurn();
        board.dropToken(COLUMN_5, 'Y');turn.changeTurn();
        board.dropToken(COLUMN_6, 'R');turn.changeTurn();
        board.dropToken(COLUMN_6, 'Y');turn.changeTurn();
        board.dropToken(COLUMN_6, 'R');turn.changeTurn();
        board.dropToken(COLUMN_6, 'Y');turn.changeTurn();
        board.dropToken(COLUMN_6, 'R');turn.changeTurn();
        board.dropToken(COLUMN_6, 'Y');turn.changeTurn();
        board.dropToken(COLUMN_7, 'R');turn.changeTurn();
        board.dropToken(COLUMN_7, 'Y');turn.changeTurn();
        board.dropToken(COLUMN_7, 'Y');//turn.changeTurn();
        board.dropToken(COLUMN_7, 'R');turn.changeTurn();
        board.dropToken(COLUMN_7, 'Y');turn.changeTurn();
        board.dropToken(COLUMN_7, 'R');
        console.log(showBoard(board));
        return board.isComplete() && !board.isWinner();
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

function getBoard() {
    return new Board();
}

function getTurn(board) {
    return new Turn(board);
}
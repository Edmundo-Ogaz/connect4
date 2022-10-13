const connect4 = require("./connect4-v4");

const COLUMN_1 = 0;
const COLUMN_2 = 1;
const COLUMN_3 = 2;
const COLUMN_4 = 3;
const COLUMN_5 = 4;
const COLUMN_6 = 5;
const COLUMN_7 = 6;

const tests = [
    () => {//CONECTA 4 EN VERTICAL
        let game = connect4.initGame()
        game.addColor(COLUMN_1);
        game.addColor(COLUMN_1);
        game.addColor(COLUMN_1);
        game.addColor(COLUMN_1);
        return game.isWinner();
    },
    () => {//CONECTA 4 EN HORIZONTAL
        let game = connect4.initGame()
        game.addColor(COLUMN_1);
        game.addColor(COLUMN_2);
        game.addColor(COLUMN_3);
        game.addColor(COLUMN_4);
        return game.isWinner();
    },
    () => {//CONNECTA 4 EN HORIZONTAL COLOCANDO ULTIMA FICHA EN COLUMNA 5
        let game = connect4.initGame()
        game.addColor(COLUMN_4);
        game.addColor(COLUMN_6);
        game.addColor(COLUMN_7);
        game.addColor(COLUMN_5);
        return game.isWinner();
    },
    () => {//CONNECTA 4 EN HORIZONTAL COLOCANDO ULTIMA FICHA EN COLUMNA 2
        let game = connect4.initGame()
        game.addColor(COLUMN_1);
        game.addColor(COLUMN_3);
        game.addColor(COLUMN_4);
        game.addColor(COLUMN_2);
        return game.isWinner();
    },
    () => {//CONNECTA 4 EN DIAGONAL COLOCANDO ULTIMA FICHA EN COLUMNA 2
        let game = connect4.initGame()
        game.addColor(COLUMN_1);game.addColor(COLUMN_1);game.addColor(COLUMN_1);
        game.addColor(COLUMN_4);game.addColor(COLUMN_4);game.addColor(COLUMN_4);game.addColor(COLUMN_4);game.addColor(COLUMN_4);
        game.addColor(COLUMN_5);game.addColor(COLUMN_5);game.addColor(COLUMN_5);game.addColor(COLUMN_5);game.addColor(COLUMN_5);game.addColor(COLUMN_5);
        game.addColor(COLUMN_2);game.addColor(COLUMN_2);game.addColor(COLUMN_2);game.addColor(COLUMN_2);
        return game.isWinner();
    },
    () => {//NO ES CONNECTA 4 PORQUE FALTA COLOCAR LA FICHA EN LA COLUMNA 2 PARA HACER LA DIAGONAL
        let game = connect4.initGame()
        game.addColor(COLUMN_1);game.addColor(COLUMN_1);game.addColor(COLUMN_1);
        game.addColor(COLUMN_4);game.addColor(COLUMN_4);game.addColor(COLUMN_4);game.addColor(COLUMN_4);game.addColor(COLUMN_4);
        game.addColor(COLUMN_5);game.addColor(COLUMN_5);game.addColor(COLUMN_5);game.addColor(COLUMN_5);game.addColor(COLUMN_5);game.addColor(COLUMN_5);
        game.addColor(COLUMN_2);game.addColor(COLUMN_2);game.addColor(COLUMN_2);//game.addColor(COLUMN_2);
        return false === game.isWinner();
    },
    () => {//CONNECTA 4 VERTICAL CAMBIANDO TURNOS
        let game = connect4.initGame()
        game.addColor(COLUMN_1);
        game.changeTurn();
        game.addColor(COLUMN_2);
        game.changeTurn();
        game.addColor(COLUMN_1);
        game.changeTurn();
        game.addColor(COLUMN_2);
        game.changeTurn();
        game.addColor(COLUMN_1);
        game.changeTurn();
        game.addColor(COLUMN_2);
        game.changeTurn();
        game.addColor(COLUMN_1);
        return game.isWinner();
    },
    () => {//COMPROGANDO SI COLUMNA 1 ESTA LLENA
        let game = connect4.initGame()
        game.addColor(COLUMN_1);
        game.addColor(COLUMN_1);
        game.addColor(COLUMN_1);
        game.addColor(COLUMN_1);
        game.addColor(COLUMN_1);
        game.addColor(COLUMN_1);
        return game.isFullColumn(COLUMN_1);
    },
    () => {//COLOCANDO TODAS LAS FICHAS EN EL TABLERO Y PREGUNTANDO SI FUE UN EMPATE
        let game = connect4.initGame()
        game.addColor(COLUMN_1);game.changeTurn();
        game.addColor(COLUMN_1);game.changeTurn();
        game.addColor(COLUMN_1);game.changeTurn();
        game.addColor(COLUMN_1);game.changeTurn();
        game.addColor(COLUMN_1);game.changeTurn();
        game.addColor(COLUMN_1);game.changeTurn();
        game.addColor(COLUMN_2);game.changeTurn();
        game.addColor(COLUMN_2);game.changeTurn();
        game.addColor(COLUMN_2);game.changeTurn();
        game.addColor(COLUMN_2);game.changeTurn();
        game.addColor(COLUMN_2);game.changeTurn();
        game.addColor(COLUMN_2);game.changeTurn();
        game.addColor(COLUMN_3);game.changeTurn();
        game.addColor(COLUMN_3);game.changeTurn();
        game.addColor(COLUMN_3);game.changeTurn();
        game.addColor(COLUMN_3);game.changeTurn();
        game.addColor(COLUMN_3);game.changeTurn();
        game.addColor(COLUMN_3);game.changeTurn();
        game.addColor(COLUMN_4);game.changeTurn();
        game.addColor(COLUMN_4);game.changeTurn();
        game.addColor(COLUMN_4);game.changeTurn();
        game.addColor(COLUMN_4);game.changeTurn();
        game.addColor(COLUMN_4);game.changeTurn();
        game.addColor(COLUMN_4);game.changeTurn();
        game.addColor(COLUMN_5);game.changeTurn();
        game.addColor(COLUMN_5);game.changeTurn();
        game.addColor(COLUMN_5);game.changeTurn();
        game.addColor(COLUMN_5);game.changeTurn();
        game.addColor(COLUMN_5);game.changeTurn();
        game.addColor(COLUMN_5);game.changeTurn();
        game.addColor(COLUMN_6);game.changeTurn();
        game.addColor(COLUMN_6);game.changeTurn();
        game.addColor(COLUMN_6);game.changeTurn();
        game.addColor(COLUMN_6);game.changeTurn();
        game.addColor(COLUMN_6);game.changeTurn();
        game.addColor(COLUMN_6);game.changeTurn();
        game.addColor(COLUMN_7);game.changeTurn();
        game.addColor(COLUMN_7);game.changeTurn();
        game.addColor(COLUMN_7);game.changeTurn();
        game.addColor(COLUMN_7);game.changeTurn();
        game.addColor(COLUMN_7);game.changeTurn();
        game.addColor(COLUMN_7);
        return game.isTied();
    }
]

console.log(
    tests.map(
      test => test()));
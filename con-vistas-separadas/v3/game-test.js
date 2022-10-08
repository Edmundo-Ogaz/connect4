const connect4 = require("./connect4-v3");

const tests = [
    () => {
        let game = connect4.initGame()
        game.addColor(0);
        game.addColor(1);
        game.addColor(2);
        game.addColor(3);
        return game.isWinner();
    },
    () => {
        let game = connect4.initGame()
        game.addColor(3);
        game.addColor(5);
        game.addColor(6);
        game.addColor(4);
        return game.isWinner();
    },
    () => {
        let game = connect4.initGame()
        game.addColor(0);
        game.addColor(2);
        game.addColor(3);
        game.addColor(1);
        return game.isWinner();
    },
    () => {
        let game = connect4.initGame()
        game.addColor(0);
        game.addColor(0);
        game.addColor(0);
        game.addColor(3);
        game.addColor(3);
        game.addColor(3);
        game.addColor(3);
        game.addColor(3);
        game.addColor(4);
        game.addColor(4);
        game.addColor(4);
        game.addColor(4);
        game.addColor(4);
        game.addColor(4);
        game.addColor(1);
        game.addColor(1);
        game.addColor(1);
        game.addColor(1);
        return game.isWinner();
    },
    () => {
        let game = connect4.initGame()
        game.addColor(0);
        game.addColor(0);
        game.addColor(0);
        game.addColor(3);
        game.addColor(3);
        game.addColor(3);
        game.addColor(3);
        game.addColor(3);
        game.addColor(4);
        game.addColor(4);
        game.addColor(4);
        game.addColor(4);
        game.addColor(4);
        game.addColor(4);
        game.addColor(1);
        game.addColor(1);
        game.addColor(1);
        //game.addColor(1);
        return false === game.isWinner();
    }
]

console.log(
    tests.map(
      test => test()));
const connect4 = require("./connect4-v3");

const tests = [
    () => {
        let game = connect4.initGame()
        game.addColor({col: 0, row: 0});
        game.addColor({col: 1, row: 0});
        game.addColor({col: 2, row: 0});
        game.addColor({col: 3, row: 0});
        return game.isWinner();
    },
    () => {
        let game = connect4.initGame()
        game.addColor({col: 3, row: 0});
        game.addColor({col: 5, row: 0});
        game.addColor({col: 6, row: 0});
        game.addColor({col: 4, row: 0});
        return game.isWinner();
    },
    () => {
        let game = connect4.initGame()
        game.addColor({col: 0, row: 2});
        game.addColor({col: 2, row: 4});
        game.addColor({col: 3, row: 5});
        game.addColor({col: 1, row: 3});
        return game.isWinner();
    }
]

console.log(
    tests.map(
      test => test()));
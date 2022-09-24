let { Board } = require('../model/Board');

let token1 = { player: 'X', row: 6, col: 1};
let token2 = { player: 'X', row: 6, col: 2};
let token3 = { player: 'O', row: 6, col: 3};
let token4 = { player: 'X', row: 6, col: 4};
let token5 = { player: 'X', row: 6, col: 5};
let token6 = { player: 'X', row: 6, col: 6};
let token7 = { player: 'X', row: 6, col: 7};
const board = new Board();
board.addToken(token1);
board.addToken(token2);
board.addToken(token3);
board.addToken(token4);
board.addToken(token5);
board.addToken(token6);
board.addToken(token7);
console.log(board.isConnectedInVertical(token4));
console.log(board.isConnectedInHorizontal(token4));
console.log(board.isConnectedInDiagonal(token4));

console.log(board.grid);
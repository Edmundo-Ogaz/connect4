const { Console } = require("console-mpds");
const console = new Console();

let { Game } = require('../model/Game');
let { Token } = require('../model/Token');

class GameView {
  
    constructor() {
        this.game = new Game();
    }

    play() {
        console.writeln(`----- CONNECT4 -----`);
        let gameFinished;
        do {
            this.showBoard();
            this.readToken();
            gameFinished = this.isWinner() || this.isTied();
            if (gameFinished) {
                this.showBoard();
                this.showFinalMsg();
            }
        } while (!gameFinished);
    }

    showBoard() {
        for (let row = 0; row < this.game.grid.length; row++) {
            console.writeln(this.game.grid[row]);
        }
    }

    readToken() {
        let token = {player: this.game.getPlayer()};
        let correctColumn = true;
        do {
            console.writeln(`--------------------------`);
            token.col = console.readNumber(`Player ${token.player} Select column between (1 - 7)`);
            token.row = this.game.calculateRow(token.col);
            if (1 > token.col || token.col > 7) {
                console.writeln("Remember columns between 1 and 7");
                correctColumn = false;
            } else if (token.row === undefined) {
                console.writeln("This column is full");
                correctColumn = false;
            }
        } while (!correctColumn);

        this.game.addToken(new Token(token.row, token.col, token.player));
    }

    isWinner() {
        return this.game.isConnectedInHorizontal()
            || this.game.isConnectedInVertical()
            || this.game.isConnectedInDiagonal();
    }

    isTied() {
        return this.game.isTied();
    }

    showFinalMsg() {
        this.isTied() ? console.writeln(`Tied Game`) : console.writeln(`The winner is the player ${this.game.getPlayer()}`);
    }
}

module.exports.GameView = GameView;
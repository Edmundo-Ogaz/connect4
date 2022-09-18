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
            gameFinished = this.game.isWinner() || this.game.isTied();
        } while (!gameFinished);
        this.showFinalMsg();
    }

    showBoard() {
        for (let row = 0; row < this.game.getBoardLength(); row++) {
            console.writeln(this.game.getBoardRow(row));
        }
    }

    readToken() {
        let token = new Token(this.game.getPlayer());
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

        this.game.addToken(token);
    }

    showFinalMsg() {
        this.showBoard();
        this.game.isTied() ? console.writeln(`Tied Game`) : console.writeln(`The winner is the player ${this.game.getPlayer()}`);
    }
}

module.exports.GameView = GameView;
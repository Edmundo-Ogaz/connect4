const { Console } = require("console-mpds");
const console = new Console();

let { Player } = require('../model/Player');
let { BoardView } = require('./BoardView');

class GameView {
  
    constructor() {
        this.boardView = new BoardView();
        this.player = new Player();
    }

    play() {
        console.writeln(`----- CONNECT4 -----`);
        let gameFinished;
        do {
            this.showBoard();
            this.boardView.readToken(this.player.getTurn());
            gameFinished = this.boardView.isWinner() || 
                this.boardView.isTied(this.player.numberOfRounds);
            if (gameFinished) {
                this.showBoard();
                this.showFinalMsg(this.player.numberOfRounds, this.player.getTurn());
            }
            this.player.changeTurn();
        } while (!gameFinished);
    }

    showBoard() {
        this.boardView.showBoard();
    }

    showFinalMsg(numberOfRounds, lastActivePlayer) {
        this.boardView.isTied(numberOfRounds) ? console.writeln(`Tied Game`) : console.writeln(`The winner is the player ${lastActivePlayer}`);
    }
}

module.exports.GameView = GameView;
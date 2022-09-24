const { Console } = require("console-mpds");
const console = new Console();

let { Game } = require('../model/Game');
let { BoardView } = require('./BoardView');

class GameView {

  constructor(players) {
    this.players = players;
    this.game = new Game();
    this.boardView = new BoardView(this.game.getBoard());
  }

  play() {
    console.writeln(`----- CONNECT4 -----`);
    this.boardView.showBoard();
    let gameFinished;
    do {
      this.players[this.game.getTurn()].readToken(this.game);
      gameFinished = this.game.isWinner() || this.game.isTied();
      if (!gameFinished) {
        this.game.changeTurn();
      }
      this.boardView.showBoard();
    } while (!gameFinished);
    this.showFinalMsg();
  }

  showFinalMsg() {
    this.game.isTied() ? console.writeln(`Tied Game`) : console.writeln(`The winner is the player ${this.game.getPlayer()}`);
  }
}

module.exports.GameView = GameView;
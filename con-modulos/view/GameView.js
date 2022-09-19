const { Console } = require("console-mpds");
const console = new Console();

let { Game } = require('../model/Game');

class GameView {

  constructor(players) {
    this.players = players;
    this.game = new Game();
  }

  play() {
    console.writeln(`----- CONNECT4 -----`);
    let gameFinished;
    do {
      this.showBoard();
      const token = this.players[this.game.getTurn()].readToken(this.game);
      this.game.addToken(token);
      gameFinished = this.game.isWinner() || this.game.isTied();
      if (gameFinished) {
        this.showFinalMsg();
      }
      this.game.changeTurn();
    } while (!gameFinished);
  }

  showBoard() {
    for (let row = 0; row < this.game.getBoardLength(); row++) {
      console.writeln(this.game.getBoardRow(row));
    }
  }

  showFinalMsg() {
    this.showBoard();
    this.game.isTied() ? console.writeln(`Tied Game`) : console.writeln(`The winner is the player ${this.game.getPlayer()}`);
  }
}

module.exports.GameView = GameView;
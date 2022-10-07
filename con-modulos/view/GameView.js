const { Console } = require("console-mpds");
const console = new Console();

let { PlayerView } = require('./PlayerView');
let { BoardView } = require('./BoardView');

class GameView {

  constructor(game) {
    this.game = game;
    this.playerView = new PlayerView(game);
    this.boardView = new BoardView(game.getBoard());
  }

  play() {
    console.writeln(`----- CONNECT4 -----`);
    this.boardView.showBoard();
    let gameFinished;
    do {
      this.playerView.putToken();
      gameFinished = this.game.isWinner() || this.game.isTied();
      if (!gameFinished) {
        this.game.changeTurn();
      }
      this.boardView.showBoard();
    } while (!gameFinished);
    console.writeln(this.game.isTied() ? `Tied Game` : `The winner is the player ${this.game.getColor()}`);
  }
}

module.exports.GameView = GameView;
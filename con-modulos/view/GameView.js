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
    this.boardView.show();
    let gameFinished;
    do {
      this.playerView.putToken();
      this.boardView.show();
      gameFinished = this.game.isFinished();
      if (!gameFinished) {
        this.game.changeTurn();
      }
    } while (!gameFinished);
    this.#showResult();
  }

  #showResult() {
    console.writeln(this.game.isWinner() ? `The winner is the player ${this.game.getCurrentColor()}` : `Tied Game`);
  }
}

module.exports.GameView = GameView;
const { Console } = require("console-mpds");
const console = new Console();

const { Coordinate } = require('../model/Coordinate');

class PlayerView {

  constructor(game) {
    this.game = game;
  }

  putToken() {
    let col, row;
    let correctColumn = true;
    do {
      console.writeln(`--------------------------`);
      col = console.readNumber(`Player ${this.game.getColor()} Select column between (1 - 7)`);
      row = this.game.calculateRow(col - 1);
      if (1 > col || col > 7) {
        console.writeln("Remember columns between 1 and 7");
        correctColumn = false;
      } else if (row === undefined) {
        console.writeln("This column is full");
        correctColumn = false;
      }
    } while (!correctColumn);

    this.game.addToken(new Coordinate(col - 1, row));
  }
}

module.exports.PlayerView = PlayerView;
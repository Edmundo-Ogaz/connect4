const { Console } = require("console-mpds");
const console = new Console();

const { Coordinate } = require('../model/Coordinate');

class PlayerView {

  constructor(game) {
    this.game = game;
  }

  putToken() {
    let column;
    let valid;
    do {
      console.writeln(`--------------------------`);
      column = console.readNumber(`Player ${this.game.getCurrentColor()} Select column between (1 - 7)`) - 1;
      valid = Coordinate.isColumnValid(column);
      if (!valid) {
        console.writeln(`Remember columns between 1 and 7`);
      } else {
        valid = !this.game.isComplete(column)
        if (!valid) {
          console.writeln(`This column is full`);
        }
      }
    } while (!valid);
    this.game.addColor(column);
  }
}

module.exports.PlayerView = PlayerView;
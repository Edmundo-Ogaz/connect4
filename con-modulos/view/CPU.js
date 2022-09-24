const { Console } = require("console-mpds");
const console = new Console();

class CPU {

  readToken(game) {
    let coordinate = {};
    let correctColumn = true;
    do {
      console.writeln(`--------------------------`);
      coordinate.col = parseInt(Math.random() * 7) + 1;
      coordinate.row = game.calculateRow(coordinate.col);
      if (1 > coordinate.col || coordinate.col > 7) {
        correctColumn = false;
      } else if (coordinate.row === undefined) {
        correctColumn = false;
      }
    } while (!correctColumn);

    game.addToken(coordinate, game.getPlayer());
  }
}

module.exports.CPU = CPU;
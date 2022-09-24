const { Console } = require("console-mpds");
const console = new Console();

class PlayerView {

  readToken(game) {
    let coordinate = {};
    let correctColumn = true;
    do {
      console.writeln(`--------------------------`);
      coordinate.col = console.readNumber(`Player ${game.getPlayer()} Select column between (1 - 7)`);
      coordinate.row = game.calculateRow(coordinate.col);
      if (1 > coordinate.col || coordinate.col > 7) {
        console.writeln("Remember columns between 1 and 7");
        correctColumn = false;
      } else if (coordinate.row === undefined) {
        console.writeln("This column is full");
        correctColumn = false;
      }
    } while (!correctColumn);

    game.addToken(coordinate, game.getPlayer());
  }
}

module.exports.PlayerView = PlayerView;
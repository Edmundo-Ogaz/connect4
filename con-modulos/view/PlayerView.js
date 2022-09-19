const { Console } = require("console-mpds");
const console = new Console();

let { Token } = require('../model/Token');

class PlayerView {

  readToken(game) {
    let token = new Token(game.getPlayer());
    let correctColumn = true;
    do {
      console.writeln(`--------------------------`);
      token.col = console.readNumber(`Player ${token.player} Select column between (1 - 7)`);
      token.row = game.calculateRow(token.col);
      if (1 > token.col || token.col > 7) {
        console.writeln("Remember columns between 1 and 7");
        correctColumn = false;
      } else if (token.row === undefined) {
        console.writeln("This column is full");
        correctColumn = false;
      }
    } while (!correctColumn);

    return token;
  }
}

module.exports.PlayerView = PlayerView;
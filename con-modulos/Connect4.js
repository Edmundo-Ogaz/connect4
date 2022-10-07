let { Game } = require('./model/Game');
let { GameView } = require('./view/GameView');
let { YesNoDialogView } = require('./view/YesNoDialogView');

class Connect4 {

  init() {
    const continueDialogView = new YesNoDialogView(`Do you want to continue? (yes/no)`);
    do {
      let game = new Game();
      new GameView(game).play();
      continueDialogView.read();
    } while (continueDialogView.isAffirmative());
  }
}

module.exports.Connect4 = Connect4;
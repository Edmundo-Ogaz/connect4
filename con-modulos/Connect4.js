let { Game } = require('./model/Game');
let { GameView } = require('./view/GameView');
let { YesNoDialogView } = require('./view/YesNoDialogView');

class Connect4 {

  play() {
    const continueDialogView = new YesNoDialogView(`Do you want to continue? (yes/no)`);
    do {
      let game = new Game();
      new GameView(game).play();
      continueDialogView.read();
    } while (continueDialogView.isAffirmative());
  }
}

exports.Connect4 = Connect4;
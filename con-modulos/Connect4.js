let { GameView } = require('./view/GameView');
let { GameModeView } = require('./view/GameModeView');
let { YesNoDialogView } = require('./view/YesNoDialogView');

class Connect4 {

  init() {
    const continueDialogView = new YesNoDialogView(`Do you want to continue? (yes/no)`);
    const gameModeView = new GameModeView();
    do {
      const players = gameModeView.ask();
      new GameView(players).play();
      continueDialogView.read();
    } while (continueDialogView.isAffirmative());
  }
}

module.exports.Connect4 = Connect4;
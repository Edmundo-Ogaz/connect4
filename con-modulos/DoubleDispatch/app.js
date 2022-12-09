
import { Game } from './model/Game.js';
import { GameView } from './view/GameView.js';
import { YesNoDialogView } from './view/YesNoDialogView.js';

class Connect4 {

  play() {
    const continueDialogView = new YesNoDialogView(`Do you want to continue? (yes/no)`);
    do {
      new GameView(new Game()).play();
      continueDialogView.read();
    } while (continueDialogView.isAffirmative());
  }
}

new Connect4().play();
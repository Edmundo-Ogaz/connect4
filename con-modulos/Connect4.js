const { Console } = require("console-mpds");
const console = new Console();

const { CPU } = require('./view/CPU');
let { GameView } = require('./view/GameView');
const { PlayerView } = require('./view/PlayerView');
let { YesNoDialogView } = require('./view/YesNoDialogView');

class Connect4 {

  init() {
    const continueDialogView = new YesNoDialogView(`¿Quieres jugar otra partida? `);
    do {
      const players = this.askGameMode();
      new GameView(players).play();
      continueDialogView.read();
    } while (continueDialogView.isAffirmative());
  }

  askGameMode() {
    const gameModes = [[new CPU(), new CPU()],
    [new PlayerView(), new CPU()],
    [new PlayerView(), new PlayerView()]];
    let error = false;
    do {
      let response = console.readNumber(`Dime el modo de juego:
            (0) Demo-Game, (1) Player Vs CPU, (2) Player Vs Player`);
      if (response === 0 || response === 1 || response === 2) {
        return gameModes[response];
      } else {
        console.writeln(`El modo de juego ${response} no existe`);
        error = true;
      }
    } while (error);
  }
}

module.exports.Connect4 = Connect4;
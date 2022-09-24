const { Console } = require("console-mpds");
const console = new Console();

let { CPU } = require('./CPU');
let { PlayerView } = require('./PlayerView');

class GameModeView {

  constructor() {
  }

  ask() {
    const gameModes = [[new CPU(), new CPU()],[new PlayerView(), new CPU()],[new PlayerView(), new PlayerView()]];
    let error = false;
    do {
      let response = console.readNumber(`Tell me the game mode:
                (0) Demo-Game, (1) Player Vs CPU, (2) Player Vs Player`);
      if (response === 0 || response === 1 || response === 2) {
        return gameModes[response];
      } else {
        console.writeln(`This game mode ${response} doesn´t exist`);
        error = true;
      }
    } while (error);
  }
}

module.exports.GameModeView = GameModeView;
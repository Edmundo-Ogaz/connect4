const { Player } = require('./Player');
const { Color } = require('./Color');
class Turn {

  static #NUMBER_PLAYERS = 2;
  #activePlayer;
  COLORS = ["R", "Y"];
  #players = [];
  
  constructor() {
    this.#activePlayer = 0;
    for (let i = 0; i < Turn.#NUMBER_PLAYERS; i++) {
      this.#players[i] = new Player(Color.get(i));
    }
  }

  getCurrentColor() {
    return this.#players[this.#activePlayer].getColor();
  }

  changeTurn() {
    this.#activePlayer = (this.#activePlayer + 1) %  Turn.#NUMBER_PLAYERS;
  }
}

module.exports.Turn = Turn;

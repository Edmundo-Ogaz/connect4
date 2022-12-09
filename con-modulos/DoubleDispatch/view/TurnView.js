import { console } from '../utils/console.js';
import { Turn } from '../model/Turn.js';
import { Coordinate } from '../model/Coordinate.js';

class TurnView {

  #turn;

  constructor(turn) {
    this.#turn = turn;
  }

  configure() {
    let humanPlayers;
    let error = false;
    do {
      humanPlayers = console.readNumber(`Tell me the number of human players (until 2)`);
      error = !Turn.isNumberPlayerValid(humanPlayers)
      if (error) {
        console.writeln(`This number of human players is not valid!`);
      }
    } while (error);
    this.#turn.createPlayers(humanPlayers);
  }

  play() {
    this.#turn.getCurrentPlayer().accept(this);
  }

  visitRandom(randow) {
    this.#writeTitle();
    randow.dropToken();
  }

  visitHuman(human) {
    let error;
    do {
      this.#writeTitle();
      let column = console.readNumber(`Player ${human.getColor()} Select column between (1 - ${Coordinate.MAX_COLUMNS})`) - 1;
      error = human.dropToken(column);
      if (error) {
        console.writeln(error);
      }
    } while (error);
  }

  #writeTitle() {
    console.writeln(`--------------------------`);
  }
}

export { TurnView };
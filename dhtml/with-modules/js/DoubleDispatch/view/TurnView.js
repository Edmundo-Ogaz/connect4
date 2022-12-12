import { assert } from "../utils/assert.js";
import { Coordinate } from "../model/Coordinate.js";

export class TurnView {

    #turn;

    constructor(turn) {
      this.#turn = turn;
    }

    reset() {
        const players = document.querySelectorAll(`.player`);
        players.forEach(player => player.classList.remove(`player__has-turn`));
        this.#updateTurn()
    }

    play() {
        return this.#turn.getCurrentPlayer().accept(this);
    }

    visitRandom(randow) {
        randow.dropToken();
    }

    visitHuman(human) {
        return 'manualOperation';
      }

    dropToken(column) {
        console.log(`dropToken`);
        assert(Coordinate.isColumnValid(column));
        const currentPlayer = this.#turn.getCurrentPlayer();
        const error = currentPlayer.dropToken(column);
        console.log(`dropToken error ${error}`);
    }

    next() {
        this.#removeTurn()
        this.#turn.next();
        this.#updateTurn();
    }
    
    #updateTurn() {
        const currentPlayer = this.#turn.getCurrentPlayer();
        const player = document.getElementById(`player-${currentPlayer.getColor()}`);
        player.classList.add(`player__has-turn`); 
    }

    #removeTurn() {
        const currentPlayer = this.#turn.getCurrentPlayer();
        const player = document.getElementById(`player-${currentPlayer.getColor()}`);
        player.classList.remove(`player__has-turn`); 
    }
}
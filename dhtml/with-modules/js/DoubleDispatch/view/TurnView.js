import { assert } from "../utils/assert.js";
import { Coordinate } from "../model/Coordinate.js";

export class TurnView {

    #turn;
    #boardView;

    constructor(turn, board) {
      this.#turn = turn;
      this.#boardView = board;
    }

    play() {
        return this.#turn.getCurrentPlayer().accept(this);
    }

    visitRandom(randow) {
        randow.dropToken();
        const color = this.#turn.getCurrentPlayer().getColor();
        this.#boardView.writeToken(color);
        this.#remove()
        this.#turn.next();
        this.update();
        return 'automaticOperation';
    }

    visitHuman(human) {
        return 'manualOperation';
      }

    dropToken(column) {
        assert(Coordinate.isColumnValid(column));
        const currentPlayer = this.#turn.getCurrentPlayer();
        currentPlayer.dropToken(column);
        this.#boardView.writeToken(currentPlayer.getColor());
        this.#remove()
        this.#turn.next();
        this.update();
    }

    update() {
        const currentPlayer = this.#turn.getCurrentPlayer();
        const player = document.getElementById(`player-${currentPlayer.getColor()}`);
        player.classList.add(`player__has-turn`); 
    }

    #remove() {
        const currentPlayer = this.#turn.getCurrentPlayer();
        const player = document.getElementById(`player-${currentPlayer.getColor()}`);
        player.classList.remove(`player__has-turn`); 
    }
}
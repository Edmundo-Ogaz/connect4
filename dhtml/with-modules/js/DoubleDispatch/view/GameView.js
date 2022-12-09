import { assert } from "../utils/assert.js";
import { Coordinate } from "../model/Coordinate.js";
import { Game } from "../model/Game.js";
import { BoardView } from "./BoardView.js";
import { TurnView } from "./TurnView.js";

export class GameView {

  #game;
  #turnView;
  #boarView;

  #dialogPlayers = document.getElementsByClassName('dialog__players')[0];
  #dialogFinished = document.getElementsByClassName('dialog__finished')[0];

  constructor() {
    this.#game = new Game();
    this.#turnView = new TurnView(this.#game.getTurn());
    this.#boarView = new BoardView(this.#game.getBoard(), this.dropToken.bind(this));
    this.#addEventDialogPlayers();
    this.#addEventDialogFinished();
  }

  newGame() {
    this.#dialogPlayers.showModal();
  }

  reset(humanPlayers) {
    console.log(`GameView reset ${humanPlayers}`);
    this.#game.reset(humanPlayers);
    this.#boarView.reset();
    this.#turnView.reset();
    this.#play();
  }

  #play() {
    console.log(`GameView play`);
    let gameFinished;
    let turnResponse;
    do {
      turnResponse = this.#turnView.play();
      if (turnResponse === 'manualOperation') {
        return;
      }
      this.#boarView.writeToken(this.#game.getCurrentPlayer().getColor());
      gameFinished = this.#game.isFinished();
      if (!gameFinished) {
        this.#turnView.next();
      } else {
        this.#writeResult();
      }
    } while (!gameFinished);
  }

  dropToken(column) {
    console.log(`GameView dropToken ${column}`);
    assert(Coordinate.isColumnValid(column));
    this.#turnView.dropToken(column);
    this.#boarView.writeToken(this.#game.getCurrentPlayer().getColor());
    const gameFinished = this.#game.isFinished();
    if (!gameFinished) {
      this.#turnView.next();
      this.#play();
    } else {
      this.#writeResult();
    }
  }

  #writeResult() {
    let msg;
    if (this.#game.getBoard().isWinner()) {
      msg = `The winner is the player ${this.#game.getCurrentPlayer().getColor().toUpperCase()}`;
    } else {
      msg = `Tied Game`;
    }
    document.getElementsByClassName('dialog__finished-title')[0].innerHTML = msg;
    this.#dialogFinished.showModal();
  }

  #addEventDialogPlayers() {
    this.#dialogPlayers.addEventListener('close', () => {
      const humanPlayers = this.#dialogPlayers.returnValue;
      this.reset(humanPlayers);
    });
  }

  #addEventDialogFinished() {
    this.#dialogFinished.addEventListener('close', () => {
      const response = this.#dialogFinished.returnValue;
      if (response === 'yes') {
        this.newGame();
      }
    });
  }
}
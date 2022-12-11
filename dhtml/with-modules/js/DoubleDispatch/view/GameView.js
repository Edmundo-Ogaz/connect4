import { assert } from "../utils/assert.js";
import { Coordinate } from "../model/Coordinate.js";
import { Game } from "../model/Game.js";
import { BoardView } from "./BoardView.js";
import { TurnView } from "./TurnView.js";

export class GameView {

  #game;
  #turnView;
  #boarView;

  #dialogPlayers = document.querySelectorAll('.dialog__players')[0];
  #dialogFinished = document.querySelector('#dialog-yes-no');
  #saveGame = document.querySelector('#save-game');
  #recoverGame = document.querySelector('#recover-game');

  constructor() {
    this.#game = new Game();
    this.#turnView = new TurnView(this.#game.getTurn());
    this.#boarView = new BoardView(this.#game.getBoard(), this.dropToken.bind(this));
    this.#addEventDialogPlayers();
    this.#addEventDialogFinished();
    this.#addEventSaveGame();
    this.#addEventRecoverGame();
  }

  newGame() {
    this.#dialogPlayers.showModal();
  }

  reset(humanPlayers) {
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
    document.querySelector('#dialog-yes-no__title').innerHTML = msg;
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

  #addEventSaveGame() {
    this.#saveGame.addEventListener('click', () => {
      let humanPlayers = this.#game.getHumanPlayers();

      const game = {
        humanPlayers,
        turn: this.#game.getTurn().getCurrentTurn(),
        colors: this.#game.getBoard().getColors()
      }
      localStorage.setItem('game', JSON.stringify(game));
      alert("Game saved");
    });
  }

  #addEventRecoverGame() {
    this.#recoverGame.addEventListener('click', () => {
      const game = JSON.parse(localStorage.getItem('game'));
      this.reset(game.humanPlayers, game.colors);
    });
  }
}
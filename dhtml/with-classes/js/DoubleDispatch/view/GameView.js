class GameView {

    #game;
    #turnView;
    #boarView;

    #dialogPlayers = document.getElementsByClassName('dialog__players')[0];
    #dialogFinished = document.getElementsByClassName('dialog__finished')[0];

    constructor() {
        this.#dialogPlayers.addEventListener('close', () => {
            const humanPlayers  = this.#dialogPlayers.returnValue;
            this.#game = new Game(humanPlayers);
            this.#boarView = new BoardView(this.#game.getBoard());
            this.#turnView = new TurnView(this.#game.getTurn(), this.#boarView);
            this.#play();
        });
        this.#dialogFinished.addEventListener('close', () => {
            const response = this.#dialogFinished.returnValue;
            if (response === 'yes') {
                this.newGame();
            }
        });
    }
  
    newGame() {
      this.#dialogPlayers.showModal();
    }

    #play() {
        this.#boarView.clean();
        this.#turnView.update();
        let gameFinished;
        let turnResponse;
        do {
            turnResponse = this.#turnView.play();
            gameFinished = this.#game.isFinished();
            if (gameFinished) {
                this.#writeResult();
            }
        } while(!gameFinished && turnResponse === 'automaticOperation');
    }

    dropToken(column) {
        assert(Coordinate.isColumnValid(column));
        this.#turnView.dropToken(column)
        const gameFinished = this.#game.isFinished();
        if (!gameFinished) {
            this.#turnView.play();
        } else {
            this.#writeResult();
        }
    }
  
    #writeResult() {
        let msg;
        if (this.#game.getBoard().isWinner()) {
            msg = `The winner is the player ${this.#game.getTurn().getCurrentPlayer().getColor().toUpperCase()}`;
        } else {
            msg = `Tied Game`;
        }
        document.getElementsByClassName('dialog__finished-title')[0].innerHTML = msg;
        this.#dialogFinished.showModal();
    }
  }
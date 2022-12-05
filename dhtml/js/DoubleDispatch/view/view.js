class BoardView {

    #board;
  
    constructor(board) {
      this.#board = board;
    }

    clean() {
        for(let column = 0; column < 7; column++) {
            for(let row = 0; row < 6; row++) {
                const cell = document.getElementById(`cell-${column}${row}`);
                cell.className = 'board__cell';
                const checker = document.getElementById(`checker-${column}${row}`);
                checker.checked = false;
            }
        }
    }

    writeToken(color) {
        const currentCoordinate = this.#board.getCurrentCoordinate();
        const cell = document.getElementById(`cell-${currentCoordinate.column}${currentCoordinate.row}`);
        cell.classList.add(`has-${color}`);
        const checker = document.getElementById(`checker-${currentCoordinate.column}${currentCoordinate.row}`);
        checker.checked = true;
    }
}

class TurnView {

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
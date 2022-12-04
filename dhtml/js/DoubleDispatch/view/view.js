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
        console.log(`BoardView writeToken ${color}`);
        const currentCoordinate = this.#board.getCurrentCoordinate();
        console.log(`BoardView dropToken ${currentCoordinate.column} ${currentCoordinate.row}`);
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
        console.log(`TurnView play`);
        return this.#turn.getCurrentPlayer().accept(this);
    }

    visitRandom(randow) {
        console.log(`TurnView visitRandom`);
        randow.dropToken();
        const color = this.#turn.getCurrentPlayer().getColor().toLowerCase();
        this.#boardView.writeToken(color);
        this.#turn.changeTurn();
        return 'automaticOperation';
    }

    visitHuman(human) {
        return 'manualOperation';
      }

    dropToken(column) {
        console.log(`TurnView dropToken ${column}`);
        const currentPlayer = this.#turn.getCurrentPlayer();
        currentPlayer.dropToken(column);
        this.#boardView.writeToken(currentPlayer.getColor().toLowerCase());
        this.#turn.changeTurn();
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
            this.#boarView.clean();
            let gameFinished;
            let response;
            do {
                response = this.#turnView.play();
                gameFinished = this.#game.isFinished();
            } while(!gameFinished && response === 'automaticOperation');
            this.#writeResult();
        });
        this.#dialogFinished.addEventListener('close', () => {
            console.log(this.#dialogFinished.returnValue);
            newGame()
        });
    }
  
    play() {
      console.log(`----- CONNECT4 -----`);
      this.#dialogPlayers.showModal();
    }

    newGame() {
        this.play();
    }

    dropToken(column) {
        console.log(`GameView dropToken ${column}`);
        this.#turnView.dropToken(column)
        const gameFinished = this.#game.isFinished();
        if (!gameFinished) {
            this.#turnView.play();
        } else {
            this.#writeResult();
        }
    }
  
    #writeResult() {
        const title = document.getElementsByClassName('dialog__finished-title')[0];
        let msg;
        if (this.#game.getBoard().isWinner()) {
            msg = `The winner is the player ${this.#game.getTurn().getCurrentPlayer().getColor()}`;
        } else {
            msg = `Tied Game`;
        }
        title.innerHTML = msg;
        this.#dialogFinished.showModal();
    }
  }
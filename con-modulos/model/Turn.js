class Turn {
    
    numberOfTurns = 0;
    player1 = "X";
    player2 = "O";

    getPlayer() {
        return this.numberOfTurns % 2 === 0 ? this.player1 : this.player2;
    }

    getTurn() {
        return this.numberOfTurns;
    }
    
    changeTurn() {
        this.numberOfTurns++;
    }
}

module.exports.Turn = Turn;

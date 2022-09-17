class Player {
    
    numberOfRounds = 0;
    player1 = "X";
    player2 = "O";

    getTurn() {
        return this.numberOfRounds % 2 === 0 ? this.player1 : this.player2;
    }
    
    changeTurn() {
        this.numberOfRounds++;
    }
}

module.exports.Player = Player;

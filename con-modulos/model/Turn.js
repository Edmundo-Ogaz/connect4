class Turn {
    
    constructor() {
        this.numberOfTurns = 0;
        this.PLAYER_1 = "X";
        this.PLAYER_2 = "O";
    }

    getPlayer() {
        return this.numberOfTurns % 2 === 0 ? this.PLAYER_1 : this.PLAYER_2;
    }

    getTurn() {
        return this.numberOfTurns;
    }
    
    changeTurn() {
        this.numberOfTurns++;
    }
}

module.exports.Turn = Turn;

class Token {

    row = undefined;
    col = undefined;
    player = "";

    constructor(row, col, player) {
        this.row = row;
        this.col = col;
        this.player = player;
    }
}

module.exports.Token = Token;
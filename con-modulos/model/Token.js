class Token {

    row = undefined;
    col = undefined;
    owner = "";

    constructor(row, col, owner) {
        this.row = row;
        this.col = col;
        this.owner = owner;
    }
}

module.exports.Token = Token;
const { Console } = require("console-mpds");
const console = new Console();

let { Token } = require('../model/Token');

class CPU {

    readToken(game) {
        let token = new Token(game.getPlayer());
        let correctColumn = true;
        do {
            token.col = parseInt(Math.random() * 7) + 1;
            token.row = game.calculateRow(token.col);
            if (1 > token.col || token.col > 7) {
                correctColumn = false;
            } else if (token.row === undefined) {
                correctColumn = false;
            }
        } while (!correctColumn);

        return token;
    }
}

module.exports.CPU = CPU;
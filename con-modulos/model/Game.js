let { BoardView } = require('../view/BoardView');

class Game {

    MAX_TOKENS = 42;

    isWinner(token, grid) {
        const boardView = new BoardView()
        return boardView.isConnectedInHorizontal(token, grid)
            || boardView.isConnectedInVertical(token, grid)
            || boardView.isConnectedInDiagonal(token, grid);
    }

    isTied(numberOfRounds) {
        return numberOfRounds === this.MAX_TOKENS - 1;
    }
}

module.exports.Game = Game;
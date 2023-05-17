package main.es.connect4.views;

import main.es.connect4.controllers.Logic;

class PlayView {

    private Logic logic;

    PlayView(Logic logic) {
        this.logic = logic;
    }

    void interact() {
        TurnView turnView = new TurnView(this.logic);
        BoardView boardView = new BoardView(this.logic);
        do {
            turnView.play();
            boardView.writeln();
        } while (!boardView.isGameFinished());
        turnView.writeResult();
    }

}

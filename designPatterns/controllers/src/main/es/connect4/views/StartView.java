package main.es.connect4.views;

import main.es.connect4.controllers.Logic;

class StartView {

    private Logic logic;

    StartView(Logic logic) {
        this.logic = logic;
    }

    void interact() {
        new TurnView(this.logic).configTurn();
        MessageManager.getInstance().writeln("GAME_TITLE");
        new BoardView(this.logic).writeln();
    }

}

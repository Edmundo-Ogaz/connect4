package main.es.connect4.views;

import main.es.connect4.controllers.Logic;
import main.es.connect4.views.menu.ConfigTurnMenu;

public class TurnView {
    private PlayerViewPrototype playerViewPrototype;

    private Logic logic;

    public TurnView(Logic logic) {
        this.logic = logic;
        this.playerViewPrototype = new PlayerViewPrototype();
    }

    public void configTurn() {
        new ConfigTurnMenu(this.logic).interact();
    }

    public void play() {
        PlayerView activePlayerView = this.getPlayView();
        activePlayerView.showPlayerTurn();
        this.logic.play(activePlayerView.getColumn());
    }

    public void writeResult() {
        if ( this.logic.isWinner() ) {
            this.getPlayView().showWinner();
        } else {
            MessageManager.getInstance().writeln("PLAYERS_TIED");
        }
    }

    private PlayerView getPlayView() {
        return this.playerViewPrototype.createView(this.logic.getActivePlayer());
    }
}

package main.es.labturing.connect4.views;

import main.es.labturing.connect4.models.Turn;
import main.es.labturing.connect4.views.menu.ConfigTurnMenu;

public class TurnView {
    private final Turn turn;
    private PlayerView activePlayerView;
    private PlayerViewPrototype playerViewPrototype;

    public TurnView(Turn turn) {
        this.turn = turn;
        this.playerViewPrototype = new PlayerViewPrototype();
    }

    public void configTurn() {
        new ConfigTurnMenu(this.turn).interact();
    }

    public void play() {
        this.activePlayerView = this.playerViewPrototype.createView(this.turn.getActivePlayer());
        this.activePlayerView.showPlayerTurn();
        this.turn.play(this.activePlayerView.getColumn());
    }

    public void writeResult() {
        if ((this.turn.getBoard()).isWinner()) {
            this.activePlayerView.showWinner();
        } else {
            MessageManager.getInstance().writeln("PLAYERS_TIED");
        }
    }
}

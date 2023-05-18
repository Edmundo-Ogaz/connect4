package main.es.connect4.controllers;

import main.es.connect4.models.Game;
import main.es.connect4.models.Player;
import main.es.connect4.models.State;

public class PlayController extends Controller {

    public PlayController(Game game, State state) {
        super(game, state);
    }

    public boolean isGameFinished() {
        return this.game.isGameFinished();
    }

    public boolean isWinner() {
        return this.game.isWinner();
    }

    public Player getActivePlayer() {
        return this.game.getActivePlayer();
    }

    public void  play(int column) {
        this.game.play(column);
    }

    @Override
    public void accept(ControllersVisitor controllersVisitor) {
        controllersVisitor.visit(this);
    }

}

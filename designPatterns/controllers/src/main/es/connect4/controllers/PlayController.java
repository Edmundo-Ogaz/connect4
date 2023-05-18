package main.es.connect4.controllers;

import main.es.connect4.models.Game;
import main.es.connect4.models.Player;

public class PlayController extends Controller {

    public PlayController(Game game) {
        super(game);
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
}

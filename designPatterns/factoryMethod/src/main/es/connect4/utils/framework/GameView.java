package main.es.connect4.utils.framework;

import main.es.connect4.models.Game;

public abstract class GameView {

    protected Game game;

    public GameView(Game game) {
        this.game = game;
    }

    public abstract void start();

    public abstract void play();

    public abstract boolean resume();

}

package main.es.connect4.utils.framework;

import main.es.connect4.models.Game;

public abstract class GameApp {

    private GameView gameView;

    protected GameApp() {
        this.gameView = this.createGameView(new Game());
    }

    protected abstract GameView createGameView(Game game);

    protected void play() {
        do {
            this.gameView.start();
            this.gameView.play();
        } while (this.gameView.resume());
    }
}

package main.es.connect4;

import main.es.connect4.models.Game;
import main.es.connect4.views.GameView;

public class Connect4 {

    protected GameView gameView;

    private Connect4() {
        this.gameView = new GameView(new Game());
    }

    private void play() {
        do {
            this.gameView.start();
            this.gameView.play();
        } while (this.gameView.resume());
    }

    public static void main(final String[] args) {
        new Connect4().play();
    }

}

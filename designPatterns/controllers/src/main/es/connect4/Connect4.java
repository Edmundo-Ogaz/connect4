package main.es.connect4;

import main.es.connect4.models.Game;
import main.es.connect4.controllers.Logic;
import main.es.connect4.views.GameView;

public class Connect4 {

    private final Logic logic;
    private final GameView gameView;

    public Connect4() {
        this.logic = new Logic(new Game());
        this.gameView = new GameView(this.logic);
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

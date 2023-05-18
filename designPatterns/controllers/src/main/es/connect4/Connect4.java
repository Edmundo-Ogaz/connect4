package main.es.connect4;

import main.es.connect4.models.Game;
import main.es.connect4.controllers.Logic;
import main.es.connect4.views.GameView;

public class Connect4 {

    private final GameView gameView;

    public Connect4() {
        Logic logic = new Logic(new Game());
        this.gameView = new GameView(logic);
    }

    private void play() {
        this.gameView.init();
        do {
            this.gameView.start();
            this.gameView.play();
        } while (this.gameView.resume());
    }

    public static void main(final String[] args) {
        new Connect4().play();
    }

}

package main.es.connect4;

import main.es.connect4.models.Game;
import main.es.connect4.controllers.Controller;
import main.es.connect4.controllers.Logic;
import main.es.connect4.views.GameView;

public class Connect4 {

    private Logic logic;
    private final GameView gameView;

    public Connect4() {
        this.logic = new Logic();
        this.gameView = new GameView(this.logic);
    }

    protected void play() {
        Controller controller;
        do {
            controller = logic.getController();
            if (controller != null)
                controller.accept(this.gameView);
        } while (controller != null);
    }

    public static void main(final String[] args) {
        new Connect4().play();
    }

}

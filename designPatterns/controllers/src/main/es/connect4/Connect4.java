package main.es.connect4;

import main.es.connect4.models.Game;
import main.es.connect4.controllers.StartController;
import main.es.connect4.controllers.PlayController;
import main.es.connect4.controllers.ResumeController;
import main.es.connect4.views.GameView;

public class Connect4 {

    protected GameView gameView;

    public Connect4() {
        Game game = new Game();
        StartController startController = new StartController(game);
        PlayController playController = new PlayController(game);
        ResumeController resumeController = new ResumeController(game);
        this.gameView = new GameView(startController, playController, resumeController);
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

package main.es.connect4.views;

import main.es.connect4.models.Game;
import main.es.connect4.controllers.StartController;
import main.es.connect4.controllers.PlayController;
import main.es.connect4.controllers.ResumeController;
import main.es.connect4.views.menu.LanguageMenu;
import main.es.utils.views.YesNoDialog;

public class GameView {

    private Game game;
    private BoardView boardView;
    private TurnView turnView;

    private StartController startController;
    private PlayController playController;
    private ResumeController resumeController;

    public GameView(StartController startController, PlayController playController, ResumeController resumeController) {
        this.startController = startController;
        this.playController = playController;
        this.resumeController = resumeController;
        this.boardView = new BoardView(this.startController.getGame().getBoard());
        this.turnView = new TurnView(this.startController.getGame().getTurn());
    }

    // public GameView(Game game) {
    //     this.game = game;
    //     new LanguageMenu("SELECT LANGUAGE:").interact();
    //     this.boardView = new BoardView(game.getBoard());
    //     this.turnView = new TurnView(game.getTurn());
    // }

    // public void start() {
    //     this.turnView.configTurn();
    //     MessageManager.getInstance().writeln("GAME_TITLE");
    //     this.boardView.writeln();
    // }

    // public void start() {
    //     this.turnView.configTurn();
    //     MessageManager.getInstance().writeln("GAME_TITLE");
    //     this.boardView.writeln();
    // }

    // public void play() {
    //     do {
    //         this.turnView.play();
    //         this.boardView.writeln();
    //     } while (!this.boardView.isGameFinished());
    //     this.turnView.writeResult();
    // }

    // public boolean resume() {
    //     YesNoDialog yesNoDialog = new YesNoDialog();
    //     yesNoDialog.read(MessageManager.getInstance().getMessage("RESUME"));
    //     if (yesNoDialog.isAffirmative()) {
    //         this.game.reset();
    //     }
    //     return yesNoDialog.isAffirmative();
    // }

    public void start() {
        this.startController.interact(this.turnView, this.boardView);
    }

    public void play() {
        this.playController.interact(this.turnView, this.boardView);
    }

    public boolean resume() {
        return this.resumeController.interact(this.turnView);
    }

}

package main.es.connect4.views;

import main.es.connect4.models.Game;
import main.es.connect4.views.menu.LanguageMenu;
import main.es.utils.views.YesNoDialog;

public class GameView extends main.es.utils.framework.GameView<Game> {

    private BoardView boardView;
    private TurnView turnView;

    public GameView(Game game) {
        super(game);
        new LanguageMenu("SELECT LANGUAGE:").interact();
        this.boardView = new BoardView(game.getBoard());
        this.turnView = new TurnView(game.getTurn());
    }

    public void start() {
        this.turnView.configTurn();
        MessageManager.getInstance().writeln("GAME_TITLE");
        this.boardView.writeln();
    }

    public void play() {
        do {
            this.turnView.play();
            this.boardView.writeln();
        } while (!this.boardView.isGameFinished());
        this.turnView.writeResult();
    }

    public boolean resume() {
        YesNoDialog yesNoDialog = new YesNoDialog();
        yesNoDialog.read(MessageManager.getInstance().getMessage("RESUME"));
        if (yesNoDialog.isAffirmative()) {
            this.game.reset();
        }
        return yesNoDialog.isAffirmative();
    }

}

package main.es.connect4.views.menu;

import main.es.connect4.views.GameView;
import main.es.connect4.views.MessageManager;

public class StartNewGameOption extends GameOption {

    public StartNewGameOption(GameView gameView) {
        super(MessageManager.getInstance().getMessage("START"),gameView);
    }

    @Override
    public void interact() {
        this.gameView.play();
    }

}

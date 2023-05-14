package main.es.connect4.views.menu;

import main.es.connect4.views.GameView;
import main.es.utils.views.menu.Option;

public abstract class GameOption extends Option {

    protected GameView gameView;

    public GameOption(String title, GameView gameView) {
        super(title);
        this.gameView = gameView;
    }

}

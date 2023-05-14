package main.es.connect4;

import main.es.connect4.models.Game;
import main.es.connect4.views.GameView;
import main.es.connect4.utils.framework.GameApp;

public class Connect4 extends GameApp {

    @Override
	protected GameView createGameView(Game game) {
		return new GameView(game);
	}

    public static void main(final String[] args) {
        new Connect4().play();
    }

}

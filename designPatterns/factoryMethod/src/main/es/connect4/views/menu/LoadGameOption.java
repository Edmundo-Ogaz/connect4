package main.es.connect4.views.menu;

import main.es.connect4.models.GameManager_old;
import main.es.connect4.views.GameView;
import main.es.connect4.views.MessageManager;

public class LoadGameOption extends GameOption{

    private GameManager_old gameManager;

    public LoadGameOption(GameView gameView) {
        super(MessageManager.getInstance().getMessage("LOAD"),gameView);
       //TODO: this.gameManager = connect4.getGameManager();
    }

    @Override
    public void interact() {
        this.gameManager.load();
    }
    
}

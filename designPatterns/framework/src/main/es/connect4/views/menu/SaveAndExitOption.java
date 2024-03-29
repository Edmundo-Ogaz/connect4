package main.es.connect4.views.menu;

import main.es.connect4.models.GameManager_old;
import main.es.connect4.views.MessageManager;
import main.es.utils.views.menu.Option;

public class SaveAndExitOption extends Option {

    private GameManager_old gameManager;

    public SaveAndExitOption(GameManager_old gameManager) {
        super(MessageManager.getInstance().getMessage("SAVE AND EXIT"));
        this.gameManager = gameManager;
    }

    public void interact() {
        gameManager.save();
    }
    
}

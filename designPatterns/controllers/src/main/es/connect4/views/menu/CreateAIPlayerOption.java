package main.es.connect4.views.menu;

import main.es.connect4.controllers.Logic;
import main.es.connect4.models.MinMaxPlayer;
import main.es.connect4.views.MessageManager;

public class CreateAIPlayerOption extends ConfigTurnOption {

    public CreateAIPlayerOption(Logic logic) {
        super(MessageManager.getInstance().getMessage("AI"), logic);
    }

    @Override
    public void interact() {
        this.logic.addPlayer(new MinMaxPlayer(this.logic.getBoard()));
    }

}

package main.es.connect4.views.menu;

import main.es.connect4.controllers.Logic;
import main.es.connect4.models.HumanPlayer;
import main.es.connect4.views.MessageManager;

public class CreateHumanPlayerOption extends ConfigTurnOption{

    public CreateHumanPlayerOption(Logic logic) {
        super(MessageManager.getInstance().getMessage("HUMAN"), logic);
    }

    @Override
    public void interact() {
        this.logic.addPlayer(new HumanPlayer(this.logic.getBoard()));
    }
}

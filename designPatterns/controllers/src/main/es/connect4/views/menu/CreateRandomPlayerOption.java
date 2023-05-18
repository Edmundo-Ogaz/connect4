package main.es.connect4.views.menu;

import main.es.connect4.controllers.Logic;
import main.es.connect4.models.RandomPlayer;
import main.es.connect4.views.MessageManager;

public class CreateRandomPlayerOption extends ConfigTurnOption {

    public CreateRandomPlayerOption(Logic logic) {
        super(MessageManager.getInstance().getMessage("RANDOM"), logic);
    }

    @Override
    public void interact() {
        this.logic.addPlayer(new RandomPlayer(this.logic.getBoard()));
    }
}

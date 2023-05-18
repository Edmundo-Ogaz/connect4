package main.es.connect4.controllers;

import main.es.connect4.models.Game;

import main.es.connect4.views.TurnView;
import main.es.connect4.views.MessageManager;

import main.es.utils.views.YesNoDialog;



public class ResumeController extends Controller {

    public ResumeController(Game game) {
        super(game);
    }

    public boolean interact(TurnView turnView) {
        YesNoDialog yesNoDialog = new YesNoDialog();
        yesNoDialog.read(MessageManager.getInstance().getMessage("RESUME"));
        if (yesNoDialog.isAffirmative()) {
            this.game.reset();
        }
        return yesNoDialog.isAffirmative();
    }

    public void resetGame() {
        this.game.reset();
    }

}

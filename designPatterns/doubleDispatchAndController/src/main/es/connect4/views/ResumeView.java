package main.es.connect4.views;

import main.es.connect4.controllers.Logic;
import main.es.utils.views.YesNoDialog;

public class ResumeView {

    private Logic logic;

    ResumeView(Logic logic) {
        this.logic = logic;
    }

    public boolean interact() {
        YesNoDialog yesNoDialog = new YesNoDialog();
        yesNoDialog.read(MessageManager.getInstance().getMessage("RESUME"));
        if (yesNoDialog.isAffirmative()) {
            this.logic.resetGame();
        } else {
            this.logic.nextState();
        }
        return yesNoDialog.isAffirmative();
    }
}

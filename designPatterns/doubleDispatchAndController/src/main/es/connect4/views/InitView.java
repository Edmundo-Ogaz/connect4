package main.es.connect4.views;

import main.es.connect4.controllers.Logic;
import main.es.connect4.views.menu.LanguageMenu;

class InitView {

    private Logic logic;

    InitView(Logic logic) {
        this.logic = logic;
    }

    void interact() {
        new LanguageMenu("SELECT LANGUAGE:").interact();
        this.logic.nextState();
    }

}

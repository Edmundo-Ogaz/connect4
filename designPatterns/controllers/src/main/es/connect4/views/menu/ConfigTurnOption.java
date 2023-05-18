package main.es.connect4.views.menu;

import main.es.connect4.controllers.Logic;
import main.es.utils.views.menu.Option;

public abstract class ConfigTurnOption extends Option{

    protected Logic logic;

    public ConfigTurnOption(String title, Logic logic) {
        super(title);
        this.logic = logic;
    }  
}
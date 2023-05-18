package main.es.connect4.views.menu;

import main.es.connect4.controllers.Logic;
import main.es.connect4.types.Color;
import main.es.connect4.views.ColorView;
import main.es.connect4.views.MessageManager;
import main.es.utils.views.Console;
import main.es.utils.views.menu.IterativeMenu;

public class ConfigTurnMenu extends IterativeMenu {

    private Logic logic;

    public ConfigTurnMenu(Logic logic) {
        super("", logic.getNumberPlayers());
        this.logic = logic;
    }

    @Override
    protected void addOptions() {
        this.add(new CreateHumanPlayerOption(this.logic));
        this.add(new CreateRandomPlayerOption(this.logic));
        this.add(new CreateAIPlayerOption(this.logic));
    }

    @Override
    protected void showTitle() {
        this.title = MessageManager.getInstance().getMessage("CONFIG_TURN_MENU_TITLE",new ColorView(Color.get(this.counter)).toString());
        super.showTitle();
    }
    
    @Override
    protected void execChoosedOption() {
        int answer;
        boolean ok;
        do {
            answer = Console.getInstance().readInt(MessageManager.getInstance().getMessage("MENU_CHOOSE_OPTION_PREFIX") + this.options.size() + "]: ") - 1;
            ok = 0 <= answer && answer <= this.options.size() - 1;
            if (!ok) {
                Console.getInstance().writeln("Error!!!");
            }
        } while (!ok);
        this.options.get(answer).interact();
    }

    public void interact() {
        super.interact();
        this.logic.resetTurn();
    }

}

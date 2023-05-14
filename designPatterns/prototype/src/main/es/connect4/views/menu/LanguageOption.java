package main.es.connect4.views.menu;

import main.es.connect4.views.MessageManager;
import main.es.utils.views.menu.Option;

public abstract class LanguageOption extends Option {

    protected MessageManager messageManager;

    public LanguageOption(String title) {
        super(title);
        this.messageManager = MessageManager.getInstance();
    }

}

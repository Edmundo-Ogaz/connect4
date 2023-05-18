package main.es.connect4.views.menu;

import main.es.connect4.views.Language;

public class EnglishOption extends LanguageOption {

    public EnglishOption() {
        super("ENGLISH");
    }

    public void interact() {
        this.messageManager.setLanguage(Language.ENGLISH);
    }
}

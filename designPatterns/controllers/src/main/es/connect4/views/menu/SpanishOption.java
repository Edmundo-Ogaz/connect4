package main.es.connect4.views.menu;

import main.es.connect4.views.Language;

public class SpanishOption extends LanguageOption {

    public SpanishOption() {
        super("SPANISH");
    }

    public void interact() {
        this.messageManager.setLanguage(Language.SPANISH);
    }
}

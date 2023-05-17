package main.es.connect4.controllers;

import main.es.connect4.models.Game;
import main.es.connect4.views.menu.LanguageMenu;


public class StartController extends Controller {

    public StartController(Game game) {
        super(game);
        new LanguageMenu("SELECT LANGUAGE:").interact();
    }

}

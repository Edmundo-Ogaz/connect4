package main.es.connect4.controllers;

import main.es.connect4.models.Game;

public abstract class Controller {

    protected Game game;

    Controller(Game game) {
        this.game = game;
    }
}

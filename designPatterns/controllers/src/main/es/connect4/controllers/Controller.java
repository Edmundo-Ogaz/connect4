package main.es.connect4.controllers;

import main.es.connect4.models.Game;
import main.es.connect4.models.Player;
import main.es.connect4.models.Turn;
import main.es.connect4.types.Color;
import main.es.connect4.types.Coordinate;

public abstract class Controller {

    protected Game game;

    Controller(Game game) {
        this.game = game;
    }
}

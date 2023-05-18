package main.es.connect4.controllers;

import main.es.connect4.models.Game;
import main.es.connect4.models.State;

public abstract class Controller {

    protected Game game;
    protected State state;

    Controller(Game game, State state) {
        this.game = game;
        this.state = state;
    }

    public void nextState() {
        this.state.next();
    }

    public abstract void accept(ControllersVisitor controllersVisitor);
}

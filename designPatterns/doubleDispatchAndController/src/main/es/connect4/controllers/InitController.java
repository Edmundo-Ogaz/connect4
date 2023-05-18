package main.es.connect4.controllers;

import main.es.connect4.models.Game;
import main.es.connect4.models.State;

public class InitController extends Controller {

    public InitController(Game game, State state) {
        super(game, state);
    }

    @Override
    public void accept(ControllersVisitor controllersVisitor) {
        controllersVisitor.visit(this);
    }
}

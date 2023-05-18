package main.es.connect4.controllers;

import main.es.connect4.models.Board;
import main.es.connect4.models.Game;
import main.es.connect4.models.Player;
import main.es.connect4.models.State;
import main.es.connect4.types.Color;
import main.es.connect4.types.Coordinate;

public class StartController extends Controller {

    public StartController(Game game, State state) {
        super(game, state);
    }

    public Board getBoard() {
        return this.game.getBoard();
    }

    public Color getColor(Coordinate coordinate) {
        return this.game.getColor(coordinate);
    }

    public int getNumberPlayers() {
        return this.game.getNumberPlayers();
    }

    public void addPlayer(Player player) {
        this.game.addPlayer(player);
    }

    public void resetTurn() {
        this.game.resetTurn();
    }

    @Override
    public void accept(ControllersVisitor controllersVisitor) {
        controllersVisitor.visit(this);
    }

}

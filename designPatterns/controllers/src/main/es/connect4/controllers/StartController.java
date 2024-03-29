package main.es.connect4.controllers;

import main.es.connect4.models.Board;
import main.es.connect4.models.Game;
import main.es.connect4.models.Player;
import main.es.connect4.types.Color;
import main.es.connect4.types.Coordinate;
import main.es.connect4.views.menu.LanguageMenu;


public class StartController extends Controller {

    public StartController(Game game) {
        super(game);
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

}

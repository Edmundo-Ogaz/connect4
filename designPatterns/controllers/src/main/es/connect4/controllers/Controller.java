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

    public Game getGame() {
        return this.game;
    }

    public Color getColor(Coordinate coordinate) {
        return this.game.getBoard().getColor(coordinate);
    }

    public boolean isGameFinished() {
        return this.game.getBoard().isGameFinished();
    }

    public boolean isWinner() {
        return this.game.getBoard().isWinner();
    }

    public int getNumberPlayers() {
        return this.game.getTurn().getNumberPlayers();
    }

    public Turn getTurn() {
        return this.game.getTurn();
    }

    public void reset() {
        this.game.getTurn().reset();
    }

    public Player getActivePlayer() {
        return this.game.getTurn().getActivePlayer();
    }

    public void  play(int column) {
        this.game.getTurn().play(column);
    }
}

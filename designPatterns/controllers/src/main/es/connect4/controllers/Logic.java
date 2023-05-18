package main.es.connect4.controllers;

import main.es.connect4.models.Board;
import main.es.connect4.models.Game;
import main.es.connect4.models.Player;
import main.es.connect4.models.Turn;
import main.es.connect4.types.Color;
import main.es.connect4.types.Coordinate;

public class Logic {

    protected Game game;
    private StartController startController;
    private PlayController playController;
    private ResumeController resumeController;

    public Logic(Game game) {
        this.game = game;
        this.startController = new StartController(this.game);
        this.playController = new PlayController(this.game);
        this.resumeController = new ResumeController(this.game);
    }

    public Board getBoard() {
        return this.startController.getBoard();
    }

    public Color getColor(Coordinate coordinate) {
        return this.startController.getColor(coordinate);
    }

    public boolean isGameFinished() {
        return this.playController.isGameFinished();
    }

    public boolean isWinner() {
        return this.playController.isWinner();
    }

    public int getNumberPlayers() {
        return this.startController.getNumberPlayers();
    }

    public void resetTurn() {
        this.startController.resetTurn();
    }

    public void resetGame() {
        this.resumeController.resetGame();
    }

    public Player getActivePlayer() {
        return this.playController.getActivePlayer();
    }

    public void  play(int column) {
        this.playController.play(column);
    }

    public void addPlayer(Player player) {
        this.startController.addPlayer(player);
    }
}

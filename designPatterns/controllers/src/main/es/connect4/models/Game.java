package main.es.connect4.models;

import main.es.connect4.types.Color;
import main.es.connect4.types.Coordinate;

public class Game {

    private Board board;
    private Turn turn;

    public Game() {
        this.board = new Board();
        this.turn = new Turn(this.board);
    }

    public void reset() {
        this.board.reset();
        this.turn.resetPlayers();
    }

    public void resetTurn() {
        this.turn.reset();
    }

    public Board getBoard() {
        return board;
    }

    public Turn getTurn() {
        return turn;
    }

    public Color getColor(Coordinate coordinate) {
        return this.board.getColor(coordinate);
    }

    public boolean isGameFinished() {
        return this.board.isGameFinished();
    }

    public boolean isWinner() {
        return this.board.isWinner();
    }

    public int getNumberPlayers() {
        return this.turn.getNumberPlayers();
    }

    public void addPlayer(Player player) {
        this.turn.addPlayer(player);
    }

    public Player getActivePlayer() {
        return this.turn.getActivePlayer();
    }

    public void  play(int column) {
        this.turn.play(column);
    }

}

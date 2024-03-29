package main.es.connect4.models;

import main.es.connect4.types.Coordinate;
import main.es.connect4.types.PlayerType;

public class RandomPlayer extends MachinePlayer {
    
    public RandomPlayer(Board board) {
        super(board);
    }

    public int getColumn() {
        int column;
        do {
            column = (int) Math.floor(Math.random() * Coordinate.NUMBER_COLUMNS);
        } while (this.isComplete(column));
        return column;
    }

    public PlayerType getType() {
        return PlayerType.RANDOM;
    }

}

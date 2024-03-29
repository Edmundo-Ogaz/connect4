package models;

public class RandomPlayer extends Player {

    public RandomPlayer(Color color, Board board) {
        super(color, board);
        this.type = PlayerType.RANDOM;
    }

    public int getColumn() {
        int column;
        do {
            column = (int) Math.floor(Math.random() * Coordinate.NUMBER_COLUMNS);
        } while (this.isComplete(column));
        return column;
    }
}

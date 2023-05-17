package main.es.connect4.models;

import main.es.connect4.types.PlayerType;

public class HumanPlayer extends Player {

    public HumanPlayer(Board board) {
        super(board);
    }

    public PlayerType getType() {
        return PlayerType.HUMAN;
    }

}

package main.es.labturing.connect4.test;

import main.es.labturing.connect4.models.Game;
import main.es.labturing.connect4.models.Turn;
import main.es.labturing.connect4.models.Board;
import main.es.labturing.connect4.models.RandomPlayer;
import main.es.labturing.connect4.models.MachinePlayer;
import main.es.labturing.connect4.models.MinMaxPlayer;
import main.es.labturing.connect4.types.Coordinate;
import main.es.labturing.connect4.types.Color;

public class Connect4 {

    public static void main(final String[] args) {
        Game game = new Game();
        Turn turn = game.getTurn();
        Board board = game.getBoard();
        
        configTurnMinMax(turn);
        play(turn, board);
        showColors(board.getColors());
        System.out.println("fin 1");

        game.reset();
        
        configTurnRandom(turn);
        play(turn, board);
        showColors(board.getColors());
        System.out.println("fin 2");
    }

    private static void configTurnRandom(Turn turn) {
        turn.addPlayer(new RandomPlayer(turn.getBoard()));
        turn.addPlayer(new RandomPlayer(turn.getBoard()));
    }

    private static void configTurnMinMax(Turn turn) {
        turn.addPlayer(new MinMaxPlayer(turn.getBoard()));
        turn.addPlayer(new RandomPlayer(turn.getBoard()));
    }

    private static void play(Turn turn, Board board) {
        do {
            MachinePlayer player = (MachinePlayer) turn.getActivePlayer();
            int column = player.getColumn();
            turn.play(column);
        } while (!board.isGameFinished());
        System.out.println("Coordinate" + board.getLastDrop().getColumn() );
    }

    private static void showColors(Color[][] colors) {
        for (int i = Coordinate.NUMBER_ROWS - 1; i >= 0; i--) {
            for (int j = 0; j < Coordinate.NUMBER_COLUMNS; j++) {
                System.out.print("|" + colors[i][j].name().charAt(0));
            }
            System.out.println(" ");
        }
    }
}

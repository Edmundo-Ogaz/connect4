package main.es.labturing.connect4.test;

import main.es.labturing.connect4.models.Game;
import main.es.labturing.connect4.models.Turn;
import main.es.labturing.connect4.models.Board;
import main.es.labturing.connect4.models.RandomPlayer;
import main.es.labturing.connect4.models.MachinePlayer;
import main.es.labturing.connect4.types.Coordinate;

public class Connect4 {

    public static void main(final String[] args) {
        Game game = new Game();
        Turn turn = game.getTurn();
        Board board = game.getBoard();
        turn.addPlayer(new RandomPlayer(turn.getBoard()));
        turn.addPlayer(new RandomPlayer(turn.getBoard()));
        do {
            MachinePlayer player = (MachinePlayer) turn.getActivePlayer();
            turn.play(player.getColumn());
        } while (board.isGameFinished());
        showBoard(board);
        System.out.println("fin");
    }

    private static void showBoard(Board board) {
        for (int i = Coordinate.NUMBER_ROWS - 1; i >= 0; i--) {
            System.out.print("|");

            for (int j = 0; j < Coordinate.NUMBER_COLUMNS; j++) {
                board.getColor(new Coordinate(i, j)).name().charAt(0);
                System.out.print("|");
            }
            System.out.println(" ");
        }
        writeHorizontal();
    }

    private static void writeHorizontal() {
        for (int i = 0; i < 4 * Coordinate.NUMBER_COLUMNS; i++) {
            System.out.print("-");
        }
        System.out.print("-");
    }

}

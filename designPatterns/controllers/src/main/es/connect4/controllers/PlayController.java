package main.es.connect4.controllers;

import main.es.connect4.models.Game;
import main.es.connect4.types.Color;
import main.es.connect4.types.Coordinate;

import main.es.connect4.views.TurnView;
import main.es.connect4.views.BoardView;

//import main.es.connect4.types.Error;

public class PlayController extends Controller {

    public PlayController(Game game) {
        super(game);
    }

    public void interact(TurnView turnView, BoardView boardView) {
        do {
            turnView.play();
            boardView.writeln();
        } while (!boardView.isGameFinished());
        turnView.writeResult();
    }

    /*public boolean areAllTokensOnBoard() {
        return this.game.areAllTokensOnBoard();
    }

    public boolean isTicTacToe() {
        return this.game.isTicTacToe();
    }

    public void next() {
        this.game.next();
    }

    public Color getActiveColor() {
        return this.game.getActiveColor();
    }

    public void putToken(Coordinate coordinate) {
        this.game.putToken(new Coordinate(coordinate.getRow(), coordinate.getColumn()));
    }

    public Error getPutTokenError(Coordinate coordinate) {
        return this.game.getPutTokenError(coordinate);
    }

    public void moveToken(Coordinate origin, Coordinate target) {
        this.game.moveToken(
                new Coordinate(origin.getRow(), origin.getColumn()),
                new Coordinate(target.getRow(), target.getColumn())
        );
    }

    public Error getOriginMoveTokenError(Coordinate coordinate) {
        return this.game.getOriginMoveTokenError(coordinate);
    }

    public Error getTargetMoveTokenError(Coordinate origin, Coordinate target) {
        return this.game.getTargetMoveTokenError(origin, target);
    }*/

}

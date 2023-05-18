package main.es.connect4.controllers;

import java.util.HashMap;
import java.util.Map;

import main.es.connect4.models.Board;
import main.es.connect4.models.Game;
import main.es.connect4.models.Player;
import main.es.connect4.models.State;
import main.es.connect4.types.Color;
import main.es.connect4.types.Coordinate;
import main.es.connect4.types.StateValue;

public class Logic {

    private Game game;
    private State state;
    private Map<StateValue, Controller> controllers;

    public Logic() {
        this.state = new State();
        this.game = new Game();
        this.controllers = new HashMap<>();
        this.controllers.put(StateValue.CONFIG, new InitController(this.game, this.state));
        this.controllers.put(StateValue.INITIAL, new StartController(this.game, this.state));
        this.controllers.put(StateValue.IN_GAME, new PlayController(this.game, this.state));
        this.controllers.put(StateValue.RESUME, new ResumeController(this.game, this.state));
        this.controllers.put(StateValue.EXIT, null);
    }

    public Controller getController() {
        return this.controllers.get(this.state.getValueState());
    }

    public void nextState() {
        this.state.next();
    }

    public Board getBoard() {
        return this.getStartController().getBoard();
    }

    public Color getColor(Coordinate coordinate) {
        return this.getStartController().getColor(coordinate);
    }

    public boolean isGameFinished() {
        return this.getPlayController().isGameFinished();
    }

    public boolean isWinner() {
        return this.getPlayController().isWinner();
    }

    public int getNumberPlayers() {
        return this.getStartController().getNumberPlayers();
    }

    public void resetTurn() {
        this.getStartController().resetTurn();
    }

    public void resetGame() {
        this.getResumeController().resetGame();
    }

    public Player getActivePlayer() {
        return this.getPlayController().getActivePlayer();
    }

    public void  play(int column) {
        this.getPlayController().play(column);
    }

    public void addPlayer(Player player) {
        this.getStartController().addPlayer(player);
    }

    private StartController getStartController() {
        return (StartController)this.controllers.get(StateValue.INITIAL);
    }

    private PlayController getPlayController() {
        return (PlayController)this.controllers.get(StateValue.IN_GAME);
    }

    private ResumeController getResumeController() {
        return (ResumeController)this.controllers.get(StateValue.RESUME);
    }
}

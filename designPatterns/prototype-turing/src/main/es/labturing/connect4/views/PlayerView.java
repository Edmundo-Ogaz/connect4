package main.es.labturing.connect4.views;

import main.es.labturing.connect4.models.Player;

public abstract class PlayerView {

    protected Player player;

    protected void showWinner() {
        MessageManager.getInstance().writeln("PLAYER_WIN", new ColorView(this.player.getColor()).toString());
    }

    protected void showPlayerTurn() {
        MessageManager.getInstance().writeln("TURN", new ColorView(this.player.getColor()).toString());
    }

    public abstract int getColumn();

    public void setPlayer(Player player) {
        this.player = player;
    }

}

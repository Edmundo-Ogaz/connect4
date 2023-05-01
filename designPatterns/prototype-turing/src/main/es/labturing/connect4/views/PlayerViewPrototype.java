package main.es.labturing.connect4.views;

import main.es.labturing.connect4.models.Player;
import main.es.labturing.connect4.types.PlayerType;

import java.util.HashMap;

public class PlayerViewPrototype {

    private HashMap<PlayerType, PlayerView> playerViewMap;

    PlayerViewPrototype() {
        this.playerViewMap = new HashMap<>();
        this.playerViewMap.put(PlayerType.HUMAN, new HumanPlayerView());
        this.playerViewMap.put(PlayerType.RANDOM, new RandomPlayerView());
        this.playerViewMap.put(PlayerType.MINMAX, new MinMaxPlayerView());
    }

    PlayerView createView(Player activePlayer) {
        PlayerView playerView = this.playerViewMap.get(activePlayer.getType());
        playerView.setPlayer(activePlayer);
        return playerView;
    }
}

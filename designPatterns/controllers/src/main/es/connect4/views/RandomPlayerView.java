package main.es.connect4.views;

public class RandomPlayerView extends MachinePlayerView {

    public void showColumnSelected(int column) {
        MessageManager.getInstance().writeln("SHOW_RANDOM_COLUMN", String.valueOf(column + 1));
    }
}

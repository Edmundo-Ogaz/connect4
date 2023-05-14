package main.es.connect4.views;

public class MinMaxPlayerView extends MachinePlayerView {

    public void showColumnSelected(int column) {
        MessageManager.getInstance().writeln("SHOW_MINMAX_COLUMN", String.valueOf(column + 1));
    }
}
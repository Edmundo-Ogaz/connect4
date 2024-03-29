package main.es.connect4.views;

import main.es.connect4.types.Color;

public class ColorView {
    private final Color color;

    public ColorView(Color color) {
        this.color = color;

    }
    
    public void write() {
        MessageManager.getInstance().write("PLAYER_COLOR", this.getCode());
    }

    private char getCode() {
        if (this.color == Color.NULL) {
            return ' ';
        }
        return MessageManager.getInstance().getMessage(this.color.name()).charAt(0);
    }

    public String toString() {
        return MessageManager.getInstance().getMessage(this.color.name());
    }

}

package models;

public enum Color {

    RED("Red"),
    YELLOW("Yellow"),
    NULL("White");

    private Color(String name) {
    }

    public static Color get(int ordinal) {
        return Color.values()[ordinal];
    }

    public String getString() {
        return this.name();
    }

    public Color getOpposite() {
        return Color.values()[this.ordinal() % (Color.values().length - 1)];
    }

    public char getCode() {
        if (this == Color.NULL) {
            return ' ';
        }
        return this.name().charAt(0);
    }
}

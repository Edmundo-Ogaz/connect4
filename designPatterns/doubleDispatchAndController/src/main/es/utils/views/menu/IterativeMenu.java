package main.es.utils.views.menu;

public abstract class IterativeMenu extends Menu {

    protected int steps;
    protected int counter = 0;

    public IterativeMenu(String title, int steps) {
        super(title);
        this.steps = steps;
    }

    public void interact() {
        this.addOptions();
        do {
            this.interact_();
            this.counter++;
        } while (this.counter < this.steps);

    }
}

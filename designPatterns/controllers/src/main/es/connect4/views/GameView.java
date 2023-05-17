package main.es.connect4.views;

import main.es.connect4.controllers.Logic;

public class GameView {

    private StartView startView;
    private PlayView playView;
    private ResumeView resumeView;

    public GameView(Logic logic) {
        this.startView = new StartView(logic);
        this.playView = new PlayView(logic);
        this.resumeView = new ResumeView(logic);
    }

    public void start() {
        this.startView.interact();
    }

    public void play() {
        this.playView.interact();
    }

    public boolean resume() {
        return this.resumeView.interact();
    }

}

package main.es.connect4.views;

import main.es.connect4.controllers.Logic;
import main.es.connect4.controllers.PlayController;
import main.es.connect4.controllers.ResumeController;
import main.es.connect4.controllers.StartController;
import main.es.connect4.controllers.ControllersVisitor;
import main.es.connect4.controllers.InitController;

public class GameView implements ControllersVisitor {

    private InitView initView;
    private StartView startView;
    private PlayView playView;
    private ResumeView resumeView;

    public GameView(Logic logic) {
        this.initView = new InitView(logic);
        this.startView = new StartView(logic);
        this.playView = new PlayView(logic);
        this.resumeView = new ResumeView(logic);
    }

    public void visit(InitController initController) {
        this.initView.interact();
    }

    public void visit(StartController startController) {
        this.startView.interact();
    }

    public void visit(PlayController playController) {
        this.playView.interact();
    }

    public boolean visit(ResumeController resumeController) {
        return this.resumeView.interact();
    }


}

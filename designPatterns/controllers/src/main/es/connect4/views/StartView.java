package main.es.connect4.views.console;

import main.es.connect4.controllers.StartController;
//import main.es.connect4.views.Message;

class StartView {

    private StartController startController;

    StartView(StartController startController) {
        this.startController = startController;
    }

    void interact() {
        new MessageView().writeln(Message.TITLE);
        new BoardView().write(this.startController);
        // this.turnView.configTurn();
        // MessageManager.getInstance().writeln("GAME_TITLE");
        // this.boardView.writeln();
    }

}

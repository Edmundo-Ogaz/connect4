let { GameView } = require('./view/GameView');
let { YesNoDialogView } = require('./view/YesNoDialogView');

class Connect4 {
    
    static play() {
        const continueDialogView = new YesNoDialogView(`¿Quieres jugar otra partida? `);
        do {
            new GameView().play();
            continueDialogView.read();
        } while (continueDialogView.isAffirmative());
    }
}

module.exports.Connect4 = Connect4;
const { Console } = require("console-mpds");
const console = new Console();

class YesNoDialogView {

    question;
    answer;

    constructor(question) {
        this.question = question;
    }
    
    read() {
        let error;
        do {
            this.answer = console.readString(this.question);
            error = !this.isAffirmative() && !this.isNegative();
            if (error) {
                console.writeln(`Por favor, responda "si" o "no"`);
            }
        } while (error);
    }

    isAffirmative() {
        return this.answer === `si`;
    }

    isNegative() {
        return this.answer === `no`;
    }
}

module.exports.YesNoDialogView = YesNoDialogView;
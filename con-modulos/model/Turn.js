class Turn {

  constructor() {
    this.numberOfTurns = 0;
    this.MAX_TURNS = 42;
    this.PLAYER_1 = "X";
    this.COLORS = ["R", "Y"];
  }

  getTurn() {
    return this.numberOfTurns % 2;
  }

  getColor() {
    return this.COLORS[this.getTurn()];
  }

  changeTurn() {
    this.numberOfTurns++;
  }

  isFinished() {
    return this.numberOfTurns === this.MAX_TURNS - 1;
  }
}

module.exports.Turn = Turn;

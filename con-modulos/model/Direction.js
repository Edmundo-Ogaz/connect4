const { Coordinate } = require('./Coordinate');

class Direction {

  static UP = `UP`;
  static DOWN = `DOWN`
  static RIGHT = `RIGHT`;
  static LEFT = `LEFT`;
  static DIAGONAL_PRINCIPAL = `DIAGONAL_PRINCIPAL`;
  static DIAGONAL_SECOND = `DIAGONAL_SECOND`;

  constructor(type, token) {
    this.type = type;
    this.direction = [new Coordinate(token.col, token.row)];
    for (let i = 0; i < 4; i++) {
      if (type === Direction.DOWN) {
        this.direction.push(this.direction[i].getNorth());
      } else if (type === Direction.RIGHT) {
        this.direction.push(this.direction[i].getEast());
      } else if (type === Direction.DIAGONAL_PRINCIPAL) {
        this.direction.push(this.direction[i].getNorthEast());
      } else if (type === Direction.DIAGONAL_SECOND) {
        this.direction.push(this.direction[i].getSouthEast());
      }
    }
  }

  getDirection() {
    return this.direction;
  }

  getOppocite() {
    let oppocite = [this.direction[0]];
    for (let i = 0; i < 4; i++) {
      if (this.type === Direction.RIGHT) {
        oppocite.push(oppocite[i].getWest());
      } else if (this.type === Direction.DIAGONAL_PRINCIPAL) {
        oppocite.push(oppocite[i].getSouthWest());
      } else if (this.type === Direction.DIAGONAL_SECOND) {
        oppocite.push(oppocite[i].getNorthWest());
      }
    }
    return oppocite;
  }
}

module.exports.Direction = Direction;

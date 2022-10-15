const { Direction } = require('./Direction');

class Line {

  static LENGTH = 4;
  #coordinates;

  constructor(initialCoordinate, direction) {
    this.#coordinates = [initialCoordinate];
    for (let i = 0; i < Line.LENGTH - 1; i++) {
      this.#coordinates.push(this.#coordinates[i].getShifted(direction));
    }
  }

  get(ordinal) {
    return this.#coordinates[ordinal];
  }

  displaceOne(direction) {
    this.#coordinates = this.#coordinates.map(coordinate => coordinate.getShifted(direction));
    return this;
  }
}

module.exports.Line = Line;

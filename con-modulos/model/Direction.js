const { Coordinate } = require('./Coordinate');

class Direction extends Coordinate {

  static SOUTH = new Direction(-1, 0);
  static WEST = new Direction(0, -1);
  static SOUTH_WEST = new Direction(-1, -1);
  static NORTH_WEST = new Direction(1, -1);
  static VALUES = [Direction.SOUTH,Direction.WEST,Direction.SOUTH_WEST,Direction.NORTH_WEST];

  constructor(row, column) {
    super(row, column)
  }

  getOppocite() {
      return new Direction(this.row * -1, this.column * -1);
  }
}

module.exports.Direction = Direction;

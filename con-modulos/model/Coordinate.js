class Coordinate {

  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  shift(coordinate) {
    return new Coordinate(this.x + coordinate.x, this.y + coordinate.y);
  }
}

Coordinate.MAX_ROWS = 6;
Coordinate.MAX_COLUMNS = 7;

module.exports.Coordinate = Coordinate;

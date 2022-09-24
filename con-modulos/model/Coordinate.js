class Coordinate {

  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  getNorth() {
    return new Coordinate(this.x, this.y + 1);
  }

  getSouth() {
    return new Coordinate(this.x, this.y - 1);
  }

  getEast() {
    return new Coordinate(this.x + 1, this.y);
  }

  getWest() {
    return new Coordinate(this.x - 1, this.y);
  }

  getNorthEast() {
    return new Coordinate(this.x + 1, this.y + 1);
  }

  getSouthEast() {
    return new Coordinate(this.x + 1, this.y - 1);
  }

  getSouthWest() {
    return new Coordinate(this.x - 1, this.y - 1);
  }

  getNorthWest() {
    return new Coordinate(this.x - 1, this.y + 1);
  }
}

module.exports.Coordinate = Coordinate;

const { ClosedInterval } = require('./ClosedInterval');
class Coordinate {

  constructor(row, column) {
    this.row = row;
    this.column = column;
  }

  getRow() {
    return this.row;
  }

  getColumn() {
    return this.column;
  }

  getShifted(direction) {
    return new Coordinate(this.row + direction.getRow(), this.column + direction.getColumn());
  }
}

Coordinate.NUMBER_ROWS = 6;
Coordinate.ROWS = new ClosedInterval(0, Coordinate.NUMBER_ROWS - 1);
Coordinate.NUMBER_COLUMNS = 7;
Coordinate.COLUMNS = new ClosedInterval(0, Coordinate.NUMBER_COLUMNS - 1);
Coordinate.isColumnValid = function(column) {
  return Coordinate.COLUMNS.isIncluded(column);
}
Coordinate.isRowValid = function(row) {
  return Coordinate.ROWS.isIncluded(row);
}

module.exports.Coordinate = Coordinate;

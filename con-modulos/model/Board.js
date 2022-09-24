class Board {

  constructor() {
    const MIN_ROWS = 1;
    this.MIN_COLUMNS = 1;
    this.MAX_ROWS = 6;
    this.MAX_COLUMNS = 7;
    this.grid = [["*", "1", "2", "3", "4", "5", "6", "7"],
    ["1", "_", "_", "_", "_", "_", "_", "_"],
    ["2", "_", "_", "_", "_", "_", "_", "_"],
    ["3", "_", "_", "_", "_", "_", "_", "_"],
    ["4", "_", "_", "_", "_", "_", "_", "_"],
    ["5", "_", "_", "_", "_", "_", "_", "_"],
    ["6", "_", "_", "_", "_", "_", "_", "_"]];
  }

  getCell(coordinate) {
    return coordinate.y <= this.MAX_ROWS ? this.grid[coordinate.y][coordinate.x] : undefined;
  }

  getRow(number) {
    return this.grid[number];
  }

  calculateRow(col) {
    for (let row = this.grid.length - 1; row >= 0; row--) {
      if (this.grid[row][col] === "_") {
        return row;
      }
    }
  }

  addToken(coordinate, player) {
    this.grid[coordinate.row][coordinate.col] = player;
  }
}

module.exports.Board = Board;
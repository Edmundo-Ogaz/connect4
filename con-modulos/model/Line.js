const { Coordinate } = require('./Coordinate');

class Line {

  constructor(initial, coordinateShift) {
    this.LENGTH = 4;
    this.coordenates = this.getCoordenates(initial, coordinateShift);
    this.oppocite = this.getCoordenates(initial, new Coordinate(coordinateShift.x * -1, coordinateShift.y * -1));
  }

  getCoordenates(initial, coordinateShift) {
    let coordenates = [new Coordinate(initial.x, initial.y)];
    for (let i = 0; i < this.LENGTH - 1; i++) {
      coordenates.push(coordenates[i].shift(coordinateShift));
    }
    return coordenates;
  }

  getLine() {
    return this.coordenates;
  }

  getOppocite() {
    return this.oppocite;
  }
}

module.exports.Line = Line;

class ClosedInterval {

  constructor(min, max) {
    this.min = min;
    this.max = max;
  }

  isIncluded(value) {
    return this.min <= value && value <= this.max;
  }
}

module.exports.ClosedInterval = ClosedInterval;

class Color {
  
  static RED = new Color(`R`);
  static YELLOW = new Color(`Y`);
  static #values = [Color.RED, Color.YELLOW];
  #string;

  constructor(string) {
      this.#string = string;
  }

  static get(ordinal) {
      return Color.#values[ordinal];
  }

  toString() {
    return this.#string;
  }
}

module.exports.Color = Color;

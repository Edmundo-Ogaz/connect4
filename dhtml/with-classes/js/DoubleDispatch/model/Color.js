class Color {

  static RED = new Color(`red`);
  static YELLOW = new Color(`yellow`);
  #string;

  constructor(string) {
    this.#string = string;
  }

  toString() {
    return this.#string;
  }

  static get(ordinal) {
    return Color.#values()[ordinal];
  }

  static #values() {
    return [Color.YELLOW, Color.RED];
  }

}
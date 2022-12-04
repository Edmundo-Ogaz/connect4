class Color {

  static RED = new Color(`RED`);
  static YELLOW = new Color(`YELLOW`);
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
    return [Color.RED, Color.YELLOW];
  }

}

export { Color };

import { Coordinate } from '../model/Coordinate.js'
import { assert } from '../utils/assert.js';
export class BoardView {

  #board;

  constructor(board, callback) {
    this.#board = board;
    this.#addEventClick(callback);
  }

  reset(colors, currentColor) {
    assert(Array.isArray(colors));
    assert(currentColor)
    for (let row = 0; row < Coordinate.MAX_ROWS; row++) {
      for (let column = 0; column < Coordinate.MAX_COLUMNS; column++) {
        let checked = false;
        let className = 'board__cell';
        if (row === Coordinate.MAX_ROWS - 1) {
          className += ' board__header';
        }

        if (colors[row][column]) {
          className += ` has-${colors[row][column]}`;
          checked = true;
        }

        document.querySelector(`#cell-${row}${column}`).className = className;
        document.querySelector(`#checker-${row}${column}`).checked = checked;
      }
    }
    this.changeBoardTurn(currentColor);
  }

  #addEventClick(callback) {
    document.querySelectorAll('.board__header').forEach((element, key) => {
      element.addEventListener('click', () => {
        callback(key)
      })
    })
  }

  writeToken(color) {
    const currentCoordinate = this.#board.getCurrentCoordinate();
    document.getElementById(`cell-${currentCoordinate.row}${currentCoordinate.column}`).classList.add(`has-${color}`);
    document.getElementById(`checker-${currentCoordinate.row}${currentCoordinate.column}`).checked = true;
  }

  changeBoardTurn(color) {
    const header = document.querySelectorAll(`.board__header`);
    header.forEach((element, idx) => {
      element.className = 'board__header board__cell';
      element.classList.add(`turn-${color}`)
    })
  }
}
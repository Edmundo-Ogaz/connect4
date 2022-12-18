import { assert } from '../../utils/assert.js';
import { Coordinate } from '../../models/Coordinate.js'
import { Color } from '../../models/Color.js'
import { Turn } from '../../models/Turn.js';
import { Board } from '../../models/Board.js';
export class BoardView {

  #board;
  #callback;
  #existEventClick;

  constructor(board, callback) {
    this.#board = board;
    this.#callback = function() { callback(parseInt(this.role)) };
  }

  reset(currentColor, existEventClick) {
    assert(Color.isColorValid(currentColor));
    assert(typeof existEventClick == "boolean");
    for (let row = 0; row < Coordinate.MAX_ROWS; row++) {
      for (let column = 0; column < Coordinate.MAX_COLUMNS; column++) {
        let className = 'board__cell';
        if (row === Coordinate.MAX_ROWS - 1) {
          className += ' board__header';
        }

        const color = this.#board.getColor(new Coordinate(row, column));
        className += color ? ` has-${color}` : ``;

        document.querySelector(`#cell-${row}${column}`).className = className;
        document.querySelector(`#checker-${row}${column}`).checked = Boolean(color);
      }
    }
    this.#existEventClick = existEventClick;
    existEventClick && this.#changeTurn(currentColor);
    existEventClick ? this.#addEventClick(this.#callback) : this.#removeEventClick(this.#callback);
  }

  #addEventClick(callback) {
    assert(typeof callback === 'function')
    document.querySelectorAll('.board__header').forEach((element) => {
      element.addEventListener('click', this.#callback)
    })
  }

  #removeEventClick(callback) {
    assert(typeof callback === 'function')
    document.querySelectorAll('.board__header').forEach((element, key) => {
      element.removeEventListener('click', this.#callback)
    })
  }

  writeToken(currentColor, currentTurn) {
    assert(Color.isColorValid(currentColor));
    const currentCoordinate = this.#board.getCurrentCoordinate();
    document.getElementById(`cell-${currentCoordinate.row}${currentCoordinate.column}`).classList.add(`board__cell--has-${currentColor}`);
    document.getElementById(`checker-${currentCoordinate.row}${currentCoordinate.column}`).checked = true;
    const ordinal = (currentTurn + 1) % Turn.MAX_PLAYERS;
    this.#existEventClick && this.#changeTurn(Color.get(ordinal));
    
  }

  #changeTurn(currentColor) {
    assert(Color.isColorValid(currentColor));
    const header = document.querySelectorAll(`.board__header`);
    header.forEach((element, idx) => {
      element.className = 'board__header board__cell';
      element.classList.add(`turn-${currentColor}`)
    })
  }

  highlightLineWinner(line) {
    for (let i = 0; i < Board.LINE_LENGTH; i++) {
      const coordinate = line[i];
      document.querySelector(`#cell-${coordinate.row}${coordinate.column}`).classList.add('board__cell--highlight');
    }
  }
}
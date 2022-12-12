import { assert } from '../utils/assert.js';
import { Color } from './Color.js'
import { Coordinate } from './Coordinate.js';
import { Player } from './Player.js';

export class Human extends Player {

  constructor(playerNumber, board) {
    super(Color.get(playerNumber), board);
  }

  dropToken(column) {
    console.log(`dropToken ${column}`);
    console.log(`${JSON.stringify(super.board.getColors())}`);
    if (!Coordinate.isColumnValid(column)) 
      return `Remember columns between 1 and ${Coordinate.MAX_COLUMNS}`;
    if (this.isComplete(column)) 
      return `This column is full`;
    super.dropToken(column);
  }

  accept(turnView) {
    return turnView.visitHuman(this)
  }
}
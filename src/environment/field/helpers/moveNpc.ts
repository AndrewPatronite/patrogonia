import { Map } from '../../maps';
import { Npc } from '../../../npcs';
import { Direction } from '../../../navigation';
import { updateNpcPosition } from './updateNpcPosition';

export const moveNpc = (
  npc: Npc,
  direction: Direction,
  { layout }: Map,
  canMoveToPosition: (
    rowIndex: number,
    columnIndex: number,
    movementType: 'player' | 'npc'
  ) => boolean,
  updateNpc: (npc: Npc) => void
) => {
  const {
    currentRowIndex,
    currentColumnIndex,
    startingRowIndex,
    startingColumnIndex,
    movementRange,
  } = npc;

  switch (direction) {
    case Direction.Up:
      if (
        currentRowIndex > 0 &&
        startingRowIndex - currentRowIndex < movementRange
      ) {
        updateNpcPosition(
          npc,
          currentRowIndex - 1,
          currentColumnIndex,
          Direction.Up,
          canMoveToPosition,
          updateNpc
        );
      }
      break;
    case Direction.Down:
      if (
        currentRowIndex < layout.length - 1 &&
        currentRowIndex - startingRowIndex < movementRange
      ) {
        updateNpcPosition(
          npc,
          currentRowIndex + 1,
          currentColumnIndex,
          Direction.Down,
          canMoveToPosition,
          updateNpc
        );
      }
      break;
    case Direction.Left:
      if (
        currentColumnIndex > 0 &&
        startingColumnIndex - currentColumnIndex < movementRange
      ) {
        updateNpcPosition(
          npc,
          currentRowIndex,
          currentColumnIndex - 1,
          Direction.Left,
          canMoveToPosition,
          updateNpc
        );
      }
      break;
    case Direction.Right:
      if (
        currentColumnIndex < layout[currentRowIndex].length - 1 &&
        currentColumnIndex - startingColumnIndex < movementRange
      ) {
        updateNpcPosition(
          npc,
          currentRowIndex,
          currentColumnIndex + 1,
          Direction.Right,
          canMoveToPosition,
          updateNpc
        );
      }
      break;
    default:
      break;
  }
};

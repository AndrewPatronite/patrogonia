import { Npc } from '../../../npcs';
import { Direction } from '../../../navigation';

export const updateNpcPosition = (
  npc: Npc,
  rowIndex: number,
  columnIndex: number,
  directionFacing: Direction,
  canMoveToPosition: (
    rowIndex: number,
    columnIndex: number,
    movementType: 'player' | 'npc'
  ) => boolean,
  updateNpc: (npc: Npc) => void
) => {
  if (canMoveToPosition(rowIndex, columnIndex, 'npc')) {
    updateNpc({
      ...npc,
      currentRowIndex: rowIndex,
      currentColumnIndex: columnIndex,
      directionFacing,
    });
  }
};

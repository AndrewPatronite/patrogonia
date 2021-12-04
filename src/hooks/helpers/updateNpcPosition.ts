import { Npc } from '../../npcs'
import { Direction } from '../../navigation'

export const updateNpcPosition = (
  npc: Npc,
  rowIndex: number,
  columnIndex: number,
  directionFacing: Direction,
  mapName: string,
  canMoveToPosition: (rowIndex: number, columnIndex: number) => boolean,
  updateNpc: (npc: Npc) => void
) => {
  if (canMoveToPosition(rowIndex, columnIndex)) {
    updateNpc({
      ...npc,
      currentRowIndex: rowIndex,
      currentColumnIndex: columnIndex,
      directionFacing,
    })
  }
}

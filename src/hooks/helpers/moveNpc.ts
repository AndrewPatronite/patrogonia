import { Map } from '../../environment/maps'
import { Npc } from '../../npcs'
import { Direction, DirectionKeyMapper } from '../../navigation'
import { updateNpcPosition } from './updateNpcPosition'

export const moveNpc = (
  npc: Npc,
  direction: Direction,
  { name: mapName, layout }: Map,
  canMoveToPosition: (rowIndex: number, columnIndex: number) => boolean,
  updateNpc: (npc: Npc) => void
) => {
  const { up, down, left, right } = DirectionKeyMapper
  const {
    currentRowIndex,
    currentColumnIndex,
    startingRowIndex,
    startingColumnIndex,
    movementRange,
  } = npc

  switch (direction) {
    case Direction.up:
      if (
        currentRowIndex > 0 &&
        startingRowIndex - currentRowIndex < movementRange
      ) {
        updateNpcPosition(
          npc,
          currentRowIndex - 1,
          currentColumnIndex,
          up,
          mapName,
          canMoveToPosition,
          updateNpc
        )
      }
      break
    case Direction.down:
      if (
        currentRowIndex < layout.length - 1 &&
        currentRowIndex - startingRowIndex < movementRange
      ) {
        updateNpcPosition(
          npc,
          currentRowIndex + 1,
          currentColumnIndex,
          down,
          mapName,
          canMoveToPosition,
          updateNpc
        )
      }
      break
    case Direction.left:
      if (
        currentColumnIndex > 0 &&
        startingColumnIndex - currentColumnIndex < movementRange
      ) {
        updateNpcPosition(
          npc,
          currentRowIndex,
          currentColumnIndex - 1,
          left,
          mapName,
          canMoveToPosition,
          updateNpc
        )
      }
      break
    case Direction.right:
      if (
        currentColumnIndex < layout[currentRowIndex].length - 1 &&
        currentColumnIndex - startingColumnIndex < movementRange
      ) {
        updateNpcPosition(
          npc,
          currentRowIndex,
          currentColumnIndex + 1,
          right,
          mapName,
          canMoveToPosition,
          updateNpc
        )
      }
      break
    default:
      break
  }
}

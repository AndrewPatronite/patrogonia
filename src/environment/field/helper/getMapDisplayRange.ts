import { Map } from '../../maps'
import { MapDisplayRange } from '../types'
import { Player } from '../../../player'

export const getMapDisplayRange = (
  currentPlayer: Player,
  map?: Map
): MapDisplayRange | undefined => {
  if (map) {
    const {
      location: { rowIndex, columnIndex },
    } = currentPlayer
    const maxRowIndex = map.layout.length - 1
    const maxColumnIndex = map.layout[0].length - 1
    const centeringOffset = 6
    const minimumEndIndex = 9
    const tilesToDisplay = 10
    const rowEndIndex = Math.max(
      Math.min(rowIndex + centeringOffset, maxRowIndex),
      minimumEndIndex
    )
    const rowStartIndex = Math.max(rowEndIndex - tilesToDisplay + 1, 0)
    const columnEndIndex = Math.max(
      Math.min(columnIndex + centeringOffset, maxColumnIndex),
      minimumEndIndex
    )
    const columnStartIndex = Math.max(columnEndIndex - tilesToDisplay + 1, 0)
    return {
      rowStartIndex,
      rowEndIndex,
      columnStartIndex,
      columnEndIndex,
    }
  }
}

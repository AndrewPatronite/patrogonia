import { Direction } from '../../navigation'

export default interface Location {
  mapName: string
  rowIndex: number
  columnIndex: number
  facing: Direction
  entranceName: string
}

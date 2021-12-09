import { Location } from '../player'
import { Direction } from '../navigation'
import { Continent, Town } from '../environment/maps/Maps'

export const startingLocation: Location = {
  mapName: Continent.Atoris,
  entranceName: Town.Dewhurst,
  rowIndex: 6,
  columnIndex: 7,
  facing: Direction.Down,
}

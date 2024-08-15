import { Location } from '../player';
import { Direction } from '../navigation';
import { ContinentName, TownName } from '../environment/maps/types';

export const startingLocation: Location = {
  mapName: ContinentName.Atoris,
  entranceName: TownName.Dewhurst,
  rowIndex: 6,
  columnIndex: 7,
  facing: Direction.Down,
};

import { Direction } from '../../navigation';
import { MapName } from '../../environment/maps/types';

export default interface Location {
  mapName: MapName;
  rowIndex: number;
  columnIndex: number;
  facing: Direction;
  entranceName: string;
}

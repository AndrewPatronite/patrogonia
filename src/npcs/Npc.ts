import { NpcName } from './Npcs';
import { Direction } from '../navigation';
import { MapName } from '../environment/maps/types';

export enum NpcType {
  Knight = 'Knight',
  ItemMerchant = 'ItemMerchant',
}

export default interface Npc {
  name: NpcName;
  currentMapName: MapName;
  currentRowIndex: number;
  currentColumnIndex: number;
  movementRange: number;
  startingRowIndex: number;
  startingColumnIndex: number;
  type: NpcType;
  directionFacing: Direction;
  isTalking: boolean;
}

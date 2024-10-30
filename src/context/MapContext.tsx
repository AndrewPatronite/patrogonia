import { createContext } from 'react';
import { Map } from '../environment/maps';
import { Npc } from '../npcs';
import {
  LocationToPlayerMap,
  MapDisplayRange,
} from '../environment/field/types';

interface MapState {
  map?: Map;
  npcs: Npc[];
  locationToPlayerMap?: LocationToPlayerMap;
  mapDisplayRange?: MapDisplayRange;
  canMoveToPosition: (
    rowIndex: number,
    columnIndex: number,
    movementType: 'player' | 'npc'
  ) => boolean;
  updateNpc: (npc: Npc) => void;
}

const MapContext = createContext<MapState>({
  npcs: [],
  canMoveToPosition: () => false,
  updateNpc: () => {},
});

export default MapContext;

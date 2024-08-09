import Entrance from './Entrance';
import { Npc } from '../../../npcs';
import { Location } from '../../../player/types';
import { MapLayout } from './MapLayout';
import { MapName } from './MapName';

export default interface Map {
  name: MapName;
  layout: MapLayout;
  entrance: Entrance;
  exit?: Location;
  npcs: Npc[];
}

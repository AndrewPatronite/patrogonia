import Entrance from './Entrance';
import { Npc } from '../../npcs';

export default interface Map {
    name: string;
    layout: string[][];
    entrance: Entrance;
    exit?: {
        mapName: string;
        rowIndex: number;
        columnIndex: number;
    };
    npcs: Npc[];
}

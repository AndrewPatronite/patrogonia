import { NpcName } from './Npcs';

export enum NpcType {
    Knight,
}

export interface Npc {
    name: NpcName;
    currentRowIndex: number;
    currentColumnIndex: number;
    movementRange: number;
    startingRowIndex: number;
    startingColumnIndex: number;
    type: NpcType;
    directionFacing: string;
}

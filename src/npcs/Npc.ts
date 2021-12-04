import { NpcName } from './Npcs'
import { Direction } from '../navigation'

export enum NpcType {
  Knight,
}

export interface Npc {
  name: NpcName
  currentRowIndex: number
  currentColumnIndex: number
  movementRange: number
  startingRowIndex: number
  startingColumnIndex: number
  type: NpcType
  directionFacing: Direction
  isTalking: boolean
}

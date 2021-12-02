import Entrance from './Entrance'
import { Npc } from '../../npcs'
import Location from '../../player/Location'

export default interface Map {
  name: string
  layout: string[][]
  entrance: Entrance
  exit?: Location
  npcs: Npc[]
}

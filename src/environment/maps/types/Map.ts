import Entrance from './Entrance'
import { Npc } from '../../../npcs'
import { Location } from '../../../player/types'
import { MapLayout } from './MapLayout'

export default interface Map {
  name: string
  layout: MapLayout
  entrance: Entrance
  exit?: Location
  npcs: Npc[]
}

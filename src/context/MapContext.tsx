import { createContext } from 'react'
import { Map } from '../environment/maps'
import Player from '../player/Player'
import { Npc } from '../npcs'

interface MapState {
  map?: Map
  players: Player[]
  npcs: Npc[]
  canMoveToPosition: (rowIndex: number, columnIndex: number) => boolean
  updateNpc: (npc: Npc) => void
}

const MapContext = createContext<MapState>({
  players: [],
  npcs: [],
  canMoveToPosition: () => false,
  updateNpc: () => {},
})

export default MapContext

import { createContext } from 'react'
import { Map } from '../environment/maps'
import { Npc } from '../npcs'
import { Player } from '../player'

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

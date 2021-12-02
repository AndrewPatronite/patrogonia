import { createSlice } from '@reduxjs/toolkit'
import Player from '../player/Player'
import { Map } from '../environment/maps'
import { Npc } from '../npcs'

const INITIAL_STATE: { map?: Map; players: Player[]; npcs: Npc[] } = {
  map: undefined,
  players: [],
  npcs: [],
}

const mapSlice = createSlice({
  name: 'map',
  initialState: INITIAL_STATE,
  reducers: {
    loadMap: (state, { payload: { map, players } }) => ({
      ...state,
      map,
      players,
      npcs: map.npcs,
    }),
    updatePeerLocation: (state, { payload: { peer } }) => ({
      ...state,
      players: state.players
        .filter(({ id }) => id !== peer.id)
        .concat(peer.location.mapName === state?.map?.name ? peer : []),
    }),
    updateNpc: (state, { payload: { npc } }) => ({
      ...state,
      npcs: state.npcs.filter(({ name }) => name !== npc.name).concat(npc),
    }),
  },
})

export default mapSlice

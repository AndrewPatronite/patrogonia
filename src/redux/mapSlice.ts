import { createSlice } from '@reduxjs/toolkit';
import { Map } from '../environment/maps';
import { Npc } from '../npcs';
import { Player } from '../player';

const INITIAL_STATE: { map?: Map; players: Player[]; npcs: Npc[] } = {
  map: undefined,
  players: [],
  npcs: [],
};

const mapSlice = createSlice({
  name: 'map',
  initialState: INITIAL_STATE,
  reducers: {
    loadMap: (state, { payload: { map, players } }) => {
      return {
        ...state,
        map,
        players,
      };
    },
    updatePeerLocation: (state, { payload: { peer } }) => {
      return {
        ...state,
        players: state.players
          .filter(({ id }) => id !== peer.id)
          .concat(peer.location.mapName === state?.map?.name ? peer : []),
      };
    },
    updateNpc: (state, { payload: { npc } }) => {
      return {
        ...state,
        npcs: state.npcs.filter(({ name }) => name !== npc.name).concat(npc),
      };
    },
  },
});

export default mapSlice;

import { getPlayers as getPlayersRemote } from '../api'
import { Dispatch } from '@reduxjs/toolkit'
import { mapSlice } from '../redux'
import { Maps } from '../environment/maps/Maps'
import { Npc } from '../npcs'
import { Player } from '../player'

export const getPlayers = (
  dispatch: Dispatch,
  mapName: string,
  onFailure: (error: any) => void
) => {
  getPlayersRemote(
    mapName,
    (players: Player[]) => {
      // @ts-ignore
      dispatch(mapSlice.actions.loadMap({ map: Maps[mapName](), players }))
    },
    (error: any) => {
      onFailure(
        `Failed to get players for ${mapName}: ${JSON.stringify(error)}`
      )
    }
  )
}

export const updatePeerLocation = (dispatch: Dispatch, peer: Player) =>
  dispatch(mapSlice.actions.updatePeerLocation({ peer }))

export const updateNpc = (dispatch: Dispatch, npc: Npc) =>
  dispatch(mapSlice.actions.updateNpc({ npc }))

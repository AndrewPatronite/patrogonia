import { pick } from 'lodash'
import {
  castSpell as castSpellRemote,
  createAccount as createAccountRemote,
  getPlayer,
  loadSave as loadSaveRemote,
  login as loginRemote,
  updatePlayer as updatePlayerRemote,
} from '../api'
import { Dispatch } from '@reduxjs/toolkit'
import Player from '../player/Player'
import { playerSlice } from '../redux'

export const login = (
  dispatch: Dispatch,
  username: string,
  password: string,
  onFailure: (error: any) => void
) =>
  loginRemote(
    username,
    password,
    (loggedInPlayer: Player) =>
      updatePlayer(
        dispatch,
        {
          ...loggedInPlayer,
          loggedIn: true,
          completedLessons:
            JSON.parse(localStorage.getItem('currentPlayer') || '{}')
              ?.completedLessons || [],
        },
        false
      ),
    onFailure
  )

export const createAccount = (
  dispatch: Dispatch,
  player: Player,
  onFailure: (error: any) => void
) =>
  createAccountRemote(
    player,
    (createdPlayer: Player) =>
      updatePlayer(
        dispatch,
        { ...createdPlayer, loggedIn: true, completedLessons: [] },
        false
      ),
    onFailure
  )

export const loadPlayer = (dispatch: Dispatch, playerId: number) =>
  getPlayer(playerId, (player: Player) => {
    storeAndDispatchPlayerUpdate(player, dispatch)
  })

export const loadSave = (dispatch: Dispatch, playerId: number) => {
  loadSaveRemote(
    playerId,
    () => loadPlayer(dispatch, playerId),
    (error: any) => console.log(`Failed to load save ${JSON.stringify(error)}`)
  )
}

const getPlayerForServer = (player: Player) =>
  pick(
    player,
    'id',
    'name',
    'username',
    'location',
    'stats',
    'saveGame',
    'visited',
    'spells'
  )

export const updatePlayer = (
  dispatch: Dispatch,
  player: Player,
  updateToServer: boolean
) => {
  if (updateToServer) {
    updatePlayerRemote(
      getPlayerForServer(player),
      (playerResponse: Player) => {
        const updatedPlayer = {
          ...player,
          ...playerResponse,
        }
        storeAndDispatchPlayerUpdate(updatedPlayer, dispatch)
      },
      (error: any) => {
        console.log('Failed to update player: ' + JSON.stringify(error))
      }
    )
  } else {
    storeAndDispatchPlayerUpdate(player, dispatch)
  }
}

const storeAndDispatchPlayerUpdate = (
  updatedPlayer: Player,
  dispatch: Dispatch
) => {
  localStorage.setItem('currentPlayer', JSON.stringify(updatedPlayer))
  dispatch(playerSlice.actions.setPlayer(updatedPlayer))
}

export const castSpell = (
  dispatch: Dispatch,
  currentPlayer: Player,
  spellName: string,
  targetId: string
) => {
  castSpellRemote(
    getPlayerForServer(currentPlayer),
    spellName,
    targetId,
    (playerResponse: Player) => {
      const updatedPlayer = {
        ...currentPlayer,
        ...playerResponse,
      }
      storeAndDispatchPlayerUpdate(updatedPlayer, dispatch)
    },
    (error: any) => {
      console.log('Failed to cast spell: ' + JSON.stringify(error))
    }
  )
}

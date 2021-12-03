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
        },
        false,
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
        { ...createdPlayer, loggedIn: true },
        false,
        false
      ),
    onFailure
  )

export const loadPlayer = (
  dispatch: Dispatch,
  playerId: number,
  onFailure: (error: any) => void
) =>
  getPlayer(
    playerId,
    (player: Player) => storeAndDispatchPlayerUpdate(dispatch, player),
    onFailure
  )

export const loadSave = (
  dispatch: Dispatch,
  playerId: number,
  onFailure: (error: any) => void
) => {
  loadSaveRemote(
    playerId,
    () => loadPlayer(dispatch, playerId, onFailure),
    (error: any) => console.log(`Failed to load save ${JSON.stringify(error)}`)
  )
}

const assemblePlayerForServer = (player: Player) =>
  pick(
    player,
    'id',
    'battleId',
    'name',
    'username',
    'location',
    'stats',
    'visited',
    'spells',
    'tutorialLessons'
  )

export const updatePlayer = (
  dispatch: Dispatch,
  player: Player,
  saveGame: boolean,
  updateToServer: boolean = true
) => {
  if (updateToServer) {
    updatePlayerRemote(
      assemblePlayerForServer(player),
      saveGame,
      (updatedPlayer: Player) => {
        const mergedPlayer = {
          ...player,
          ...updatedPlayer,
        }
        storeAndDispatchPlayerUpdate(dispatch, mergedPlayer)
      },
      (error: any) => {
        console.log('Failed to update player: ' + JSON.stringify(error))
      }
    )
  } else {
    storeAndDispatchPlayerUpdate(dispatch, player)
  }
}

const storeAndDispatchPlayerUpdate = (
  dispatch: Dispatch,
  updatedPlayer: Player
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
    assemblePlayerForServer(currentPlayer),
    spellName,
    targetId,
    (updatedPlayer: Player) => {
      const mergedPlayer = {
        ...currentPlayer,
        ...updatedPlayer,
      }
      storeAndDispatchPlayerUpdate(dispatch, mergedPlayer)
    },
    (error: any) => {
      console.log('Failed to cast spell: ' + JSON.stringify(error))
    }
  )
}

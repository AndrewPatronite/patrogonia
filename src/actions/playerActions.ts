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
import { playerSlice } from '../redux'
import { Player } from '../player'

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
        false,
        onFailure
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
        false,
        onFailure
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
    (player: Player) =>
      storeAndDispatchPlayerUpdate(dispatch, { ...player, loggedIn: true }),
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
    () => onFailure('Failed to load save. Try again or refresh the page.')
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
  updateToServer: boolean,
  onFailure: (error: any) => void
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
      () => onFailure('Failed to update player. Try again or refresh the page.')
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
  targetId: string,
  onFailure: (error: any) => void
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
    () => onFailure('Failed to cast spell. Try again or refresh the page.')
  )
}

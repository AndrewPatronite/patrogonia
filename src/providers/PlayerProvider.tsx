import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { PlayerContext } from '../context'
import { RootState } from '../redux'
import Player from '../player/Player'
import {
  castSpell,
  createAccount,
  loadPlayer,
  loadSave,
  login,
  updatePlayer,
} from '../actions'
import { useToastErrorHandler } from './useToastErrorHandler'

const PlayerProvider = ({
  children,
}: {
  children: JSX.Element | JSX.Element[]
}) => {
  const displayError = useToastErrorHandler()
  const dispatch = useDispatch()

  const currentPlayer = useSelector((state: RootState) => state.currentPlayer)

  const playerState = {
    castSpell: useCallback(
      (spellName: string, targetId: string) =>
        castSpell(dispatch, currentPlayer, spellName, targetId),
      [dispatch, currentPlayer]
    ),
    createAccount: useCallback(
      (player: Player) => createAccount(dispatch, player, displayError),
      [dispatch, displayError]
    ),
    currentPlayer,
    loadPlayer: useCallback(
      (playerId: number) => loadPlayer(dispatch, playerId, displayError),
      [dispatch, displayError]
    ),
    loadSave: useCallback(
      (playerId: number) => loadSave(dispatch, playerId, displayError),
      [dispatch, displayError]
    ),
    login: useCallback(
      (username: string, password: string) =>
        login(dispatch, username, password, displayError),
      [dispatch, displayError]
    ),
    updatePlayer: useCallback(
      (updatedPlayer: Player, saveGame = false, updateToServer = true) => {
        updatePlayer(dispatch, updatedPlayer, saveGame, updateToServer)
      },
      [dispatch]
    ),
  }
  return (
    <PlayerContext.Provider value={playerState}>
      {children}
    </PlayerContext.Provider>
  )
}

export default PlayerProvider

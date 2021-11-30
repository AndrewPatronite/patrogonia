import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { PlayerContext } from '../context'
import { useToast } from '@chakra-ui/react'
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
import HttpStatus from '../api/HttpStatus'

const PlayerProvider = ({
  children,
}: {
  children: JSX.Element | JSX.Element[]
}) => {
  const toast = useToast()
  const dispatch = useDispatch()

  const displayError = useCallback(
    (error) => {
      let errorMessage = 'An unknown error occurred.'
      if (error && error.response && error.response.status) {
        switch (error.response.status) {
          case HttpStatus.UNAUTHORIZED:
            errorMessage = 'Invalid login.'
            break
          case HttpStatus.CONFLICT:
            errorMessage = 'Username already exists.'
            break
          case HttpStatus.INTERNAL_SERVER_ERROR:
            errorMessage = 'An internal server error occurred.'
            break
          default:
            break
        }
      }
      toast({
        position: 'top',
        variant: 'top-accent',
        status: 'error',
        duration: null,
        isClosable: true,
        description: errorMessage,
      })
    },
    [toast]
  )

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
      (playerId: number) => loadPlayer(dispatch, playerId),
      [dispatch]
    ),
    loadSave: useCallback((playerId: number) => loadSave(dispatch, playerId), [
      dispatch,
    ]),
    login: useCallback(
      (username: string, password: string) =>
        login(dispatch, username, password, displayError),
      [dispatch, displayError]
    ),
    updatePlayer: useCallback(
      (updatedPlayer: Player, updateToServer = true) => {
        updatePlayer(dispatch, updatedPlayer, updateToServer)
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

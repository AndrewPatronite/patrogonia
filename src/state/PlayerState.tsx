import { useCallback, useReducer } from 'react'
import {
  castSpell as castSpellAction,
  createAccountAction,
  loadPlayer as loadPlayerAction,
  loadSaveAction,
  loginAction,
  updatePlayerAction,
} from './actions/playerAction'
import { playerReducer } from './reducers/playerReducer'
import { UseToastOptions } from '@chakra-ui/react'
import HttpStatus from './api/HttpStatus'

export const PlayerState = (toast: (options?: UseToastOptions) => void) => {
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

  const getInitialPlayer = () => {
    const storedPlayer = localStorage.getItem('currentPlayer')
    return storedPlayer
      ? JSON.parse(storedPlayer)
      : { loggedIn: false, location: {}, completedLessons: [] }
  }

  const [currentPlayer, dispatchPlayer] = useReducer(
    playerReducer,
    getInitialPlayer()
  )

  const updatePlayer = useCallback((updatedPlayer, updateToServer = true) => {
    updatePlayerAction(dispatchPlayer, updatedPlayer, updateToServer)
  }, [])

  const loadPlayer = useCallback(
    (playerId) => loadPlayerAction(dispatchPlayer, playerId),
    []
  )

  const loadSave = useCallback(
    (playerId) => loadSaveAction(dispatchPlayer, playerId),
    []
  )

  const login = useCallback(
    (username, password) =>
      loginAction(dispatchPlayer, username, password, displayError),
    [displayError]
  )

  const createAccount = useCallback(
    (player) => createAccountAction(dispatchPlayer, player, displayError),
    [displayError]
  )

  const castSpell = useCallback(
    (spellName: string, targetId: string) =>
      castSpellAction(dispatchPlayer, currentPlayer, spellName, targetId),
    [currentPlayer]
  )

  return [
    currentPlayer,
    login,
    createAccount,
    updatePlayer,
    loadPlayer,
    loadSave,
    castSpell,
  ]
}

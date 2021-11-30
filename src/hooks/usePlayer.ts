import { useContext } from 'react'
import { PlayerContext } from '../context'

export const usePlayer = () => {
  const {
    castSpell,
    createAccount,
    currentPlayer,
    loadPlayer,
    loadSave,
    login,
    updatePlayer,
  } = useContext(PlayerContext)
  return {
    castSpell,
    createAccount,
    currentPlayer,
    loadPlayer,
    loadSave,
    login,
    updatePlayer,
  }
}

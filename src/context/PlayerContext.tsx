import Player from '../player/Player'
import { createContext } from 'react'

interface PlayerState {
  castSpell: (spellName: string, targetId: string) => void
  createAccount: (player: Player) => void
  currentPlayer: Player
  loadPlayer: (playerId: number) => void
  loadSave: (playerId: number) => void
  login: (username: string, password: string) => void
  updatePlayer: (player: Player, updateToServer: boolean) => void
}

const getInitialPlayer = () => {
  const storedPlayer = localStorage.getItem('currentPlayer')
  return storedPlayer
    ? JSON.parse(storedPlayer)
    : { loggedIn: false, location: {}, completedLessons: [] }
}

export const PlayerContext = createContext<PlayerState>({
  castSpell: () => {},
  createAccount: () => {},
  currentPlayer: getInitialPlayer(),
  loadPlayer: () => {},
  loadSave: () => {},
  login: () => {},
  updatePlayer: () => {},
})

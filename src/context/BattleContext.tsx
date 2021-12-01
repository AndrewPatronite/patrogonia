import { createContext } from 'react'
import { Battle } from '../battle/types'

interface BattleState {
  battle?: Battle
  takeTurn: (playerAction: string, targetId: string) => void
  dismissBattle: (dismissedBattle: Battle) => void
}

const BattleContext = createContext<BattleState>({
  takeTurn: () => {},
  dismissBattle: () => {},
})

export default BattleContext

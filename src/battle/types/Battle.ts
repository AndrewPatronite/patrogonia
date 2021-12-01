import { Enemy } from './Enemy'
import { LogEntry } from './LogEntry'
import { BattleStatus } from './BattleStatus'
import Stats from '../../player/Stats'
import { PlayerAction } from './PlayerAction'

export interface Battle {
  id: string
  enemies: Enemy[]
  log: LogEntry[]
  playerStats: { [playerId: number]: Stats }
  roundPlayerActions: { [playerId: number]: PlayerAction }
  status: BattleStatus
}

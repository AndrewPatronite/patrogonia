import Enemy from './Enemy'
import LogEntry from './LogEntry'
import { BattleStatus } from './BattleStatus'
import RoundPlayerActions from './RoundPlayerActions'
import { Stats } from '../../player'

export default interface Battle {
  id: string
  enemies: Enemy[]
  log: LogEntry[]
  playerStats: { [playerId: number]: Stats }
  roundPlayerActions: RoundPlayerActions
  status: BattleStatus
}

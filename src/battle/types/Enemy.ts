import EnemyStats from './EnemyStats'
import { EnemyName } from './EnemyName'

export default interface Enemy {
  id: string
  name: EnemyName
  stats: EnemyStats
}

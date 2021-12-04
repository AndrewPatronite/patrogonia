import { EnemyStats } from './EnemyStats'
import { EnemyName } from './EnemyName'

export interface Enemy {
  id: string
  name: EnemyName
  stats: EnemyStats
}

import { EnemyName } from './types'
import { Boar, Goblin, Knight, Mouse, Rat, Skeleton } from './enemy'

export const bestiary: { [key in EnemyName]: string } = {
  [EnemyName.Mouse]: Mouse,
  [EnemyName.Boar]: Boar,
  [EnemyName.Goblin]: Goblin,
  [EnemyName.Knight]: Knight,
  [EnemyName.Rat]: Rat,
  [EnemyName.Skeleton]: Skeleton,
}

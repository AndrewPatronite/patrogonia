import { Player } from '../../../player'

export default interface LocationToPlayerMap {
  [rowColumnIndices: string]: Player[]
}

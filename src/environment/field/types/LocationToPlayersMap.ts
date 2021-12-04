import { Player } from '../../../player'

export default interface LocationToPlayersMap {
  [rowColumnIndices: string]: Player[]
}

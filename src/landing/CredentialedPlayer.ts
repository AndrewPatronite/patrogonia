import { Player } from '../player'

export interface CredentialedPlayer extends Player {
  username: string
  password: string
}

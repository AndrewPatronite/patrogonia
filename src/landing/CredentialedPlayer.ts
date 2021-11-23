import Player from '../player/Player'

export interface CredentialedPlayer extends Player {
  username: string
  password: string
}

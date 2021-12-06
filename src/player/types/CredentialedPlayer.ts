import Player from './Player'

export default interface CredentialedPlayer extends Player {
  username: string
  password: string
}

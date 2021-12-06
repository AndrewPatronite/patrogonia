import PlayerAction from './PlayerAction'

export default interface RoundPlayerActions {
  [playerId: number]: PlayerAction
}

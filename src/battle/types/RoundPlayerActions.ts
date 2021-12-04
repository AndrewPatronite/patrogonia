import { PlayerAction } from './PlayerAction'

export interface RoundPlayerActions {
  [playerId: number]: PlayerAction
}

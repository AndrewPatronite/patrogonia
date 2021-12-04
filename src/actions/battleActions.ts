import { isEmpty } from 'lodash'
import {
  getBattle as getBattleRemote,
  takeTurn as takeTurnRemote,
} from '../api/battleService'
import { battleSlice } from '../redux'
import { Dispatch } from '@reduxjs/toolkit'
import { Battle } from '../battle/types'

export const dismissBattle = (dispatch: Dispatch) =>
  dispatch(battleSlice.actions.dismissBattle())

export const loadBattle = (
  dispatch: Dispatch,
  battleId: string,
  onBattleNotFound: () => void,
  onFailure: (error: any) => void
) => {
  const onSuccess = (battle: Battle) => {
    if (isEmpty(battle)) {
      onBattleNotFound()
    } else {
      dispatch(battleSlice.actions.loadBattle(battle))
    }
  }
  getBattleRemote(battleId, onSuccess, () =>
    onFailure('Failed to get battle. Try again or refresh the page.')
  )
}

export const takeTurn = (
  dispatch: Dispatch,
  battleId: string,
  playerId: number,
  playerAction: string,
  onFailure: (error: any) => void,
  targetId?: string | number
) => {
  const onSuccess = () => {}
  takeTurnRemote(
    battleId,
    playerId,
    playerAction,
    onSuccess,
    () => onFailure('Failed to take turn. Try again or refresh the page.'),
    targetId
  )
}

export const updateBattle = (dispatch: Dispatch, battle: Battle) =>
  dispatch(battleSlice.actions.updateBattle(battle))

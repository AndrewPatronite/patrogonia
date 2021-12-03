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
  onBattleNotFound: () => void
) => {
  const onSuccess = (battle: Battle) => {
    if (isEmpty(battle)) {
      onBattleNotFound()
    } else {
      dispatch(battleSlice.actions.loadBattle(battle))
    }
  }
  const onFailure = (error: any) => {
    console.log('Failed to get battle: ' + JSON.stringify(error))
  }
  getBattleRemote(battleId, onSuccess, onFailure)
}

export const takeTurn = (
  dispatch: Dispatch,
  battleId: string,
  playerId: number,
  playerAction: string,
  targetId: string
) => {
  const onSuccess = () => {}
  const onFailure = (error: any) =>
    console.log('Failed to take turn: ' + JSON.stringify(error))
  takeTurnRemote(
    battleId,
    playerId,
    playerAction,
    targetId,
    onSuccess,
    onFailure
  )
}

export const updateBattle = (dispatch: Dispatch, battle: Battle) =>
  dispatch(battleSlice.actions.updateBattle(battle))

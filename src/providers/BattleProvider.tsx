import React, { useCallback, useEffect, useState } from 'react'
import { usePlayer } from '../hooks'
import { isEmpty } from 'lodash'
import { subscribe } from '../subscription/subscribe'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../redux'
import { Battle, isBattleEnded } from '../battle/types'
import { dismissBattle, getBattle, takeTurn, updateBattle } from '../actions'
import { BattleContext } from '../context'

const BattleProvider = ({
  children,
}: {
  children: JSX.Element | JSX.Element[]
}) => {
  const battleUrl = `${process.env.REACT_APP_WEBSOCKET_BASE_URL}/battles`
  const { currentPlayer, loadPlayer, updatePlayer } = usePlayer()
  const { id: currentPlayerId, battleId } = currentPlayer
  const [battleMessage, setBattleMessage] = useState<Battle | undefined>(
    undefined
  )
  const battle = useSelector((state: RootState) => state.battleState.battle)
  const dispatch = useDispatch()

  useEffect(() => {
    if (battleId) {
      const battleSubscription = subscribe(battleUrl, setBattleMessage)
      return () => battleSubscription.close()
    }
  }, [battleUrl, battleId])

  const onBattleNotFound = useCallback(() => {
    updatePlayer({ ...currentPlayer, battleId: undefined }, false)
  }, [updatePlayer, currentPlayer])

  useEffect(() => {
    if (battle) {
      const isBattleMessagePresent = !isEmpty(battleMessage)
      if (isBattleMessagePresent && battle.id === battleMessage?.id) {
        updateBattle(dispatch, battleMessage)
        setBattleMessage(undefined)
      }
    } else if (battleId) {
      getBattle(dispatch, battleId, onBattleNotFound)
    }
  }, [dispatch, battleId, battle, battleMessage, onBattleNotFound])

  const battleState = {
    battle,
    dismissBattle: useCallback(
      (dismissedBattle) => {
        if (isBattleEnded(dismissedBattle.status)) {
          loadPlayer(currentPlayerId)
        }
        dismissBattle(dispatch)
      },
      [dispatch, loadPlayer, currentPlayerId]
    ),
    takeTurn: useCallback(
      (playerAction: string, targetId: string) =>
        battleId &&
        takeTurn(dispatch, battleId, currentPlayerId, playerAction, targetId),
      [dispatch, battleId, currentPlayerId]
    ),
  }
  return (
    <BattleContext.Provider value={battleState}>
      {children}
    </BattleContext.Provider>
  )
}

export default BattleProvider
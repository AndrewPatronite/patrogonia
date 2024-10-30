import React, { ReactNode, useCallback, useEffect, useState } from 'react';
import { usePlayer } from '../hooks';
import isEmpty from 'lodash/isEmpty';
import { subscribe } from '../subscription';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux';
import { Battle, isBattleEnded } from '../battle/types';
import { dismissBattle, loadBattle, takeTurn, updateBattle } from '../actions';
import { BattleContext } from '../context';
import { useToastErrorHandler } from './useToastErrorHandler';

const BattleProvider = ({ children }: { children: ReactNode }) => {
  const battleUrl = `${process.env.NEXT_PUBLIC_WEBSOCKET_BASE_URL}/battles`;
  const displayError = useToastErrorHandler();
  const { currentPlayer, loadPlayer } = usePlayer();
  const { id: currentPlayerId, battleId } = currentPlayer ?? {};
  const [battleMessage, setBattleMessage] = useState<Battle | undefined>(
    undefined
  );
  const battle = useSelector((state: RootState) => state.battleState.battle);
  const dispatch = useDispatch();

  useEffect(() => {
    if (battleId) {
      const battleSubscription = subscribe(battleUrl, setBattleMessage);
      return () => battleSubscription.close();
    }
  }, [battleUrl, battleId]);

  useEffect(() => {
    if (battle) {
      const isBattleMessagePresent = !isEmpty(battleMessage);
      if (isBattleMessagePresent && battle.id === battleMessage?.id) {
        updateBattle(dispatch, battleMessage);
        setBattleMessage(undefined);
      }
    } else if (battleId && currentPlayerId) {
      loadBattle(
        dispatch,
        battleId,
        () => loadPlayer(currentPlayerId),
        displayError
      );
    }
  }, [
    dispatch,
    battleId,
    battle,
    battleMessage,
    loadPlayer,
    currentPlayerId,
    displayError,
  ]);

  const battleState = {
    battle,
    dismissBattle: useCallback(
      (dismissedBattle: Battle) => {
        if (currentPlayerId && isBattleEnded(dismissedBattle.status)) {
          loadPlayer(currentPlayerId);
        }
        dismissBattle(dispatch);
      },
      [dispatch, loadPlayer, currentPlayerId]
    ),
    takeTurn: useCallback(
      (playerAction: string, targetId?: string | number) =>
        battleId &&
        currentPlayerId &&
        takeTurn(
          battleId,
          currentPlayerId,
          playerAction,
          displayError,
          targetId
        ),
      [battleId, currentPlayerId, displayError]
    ),
  };
  return (
    <BattleContext.Provider value={battleState}>
      {children}
    </BattleContext.Provider>
  );
};

export default BattleProvider;

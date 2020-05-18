import { useCallback, useReducer } from 'react';
import { isEmpty } from 'lodash';
import {
    dismissBattle as dismissBattleAction,
    getBattle,
    takeTurn as takeTurnAction,
    updateBattle as updateBattleAction,
} from './actions/battleAction';
import { battleReducer, EMPTY_BATTLE } from './reducers/battleReducer';

export const BattleState = (
    currentPlayer,
    updatePlayer,
    loadPlayer,
    battleMessage,
    setBattleMessage
) => {
    const { id: currentPlayerId, battleId } = currentPlayer;
    const [battle, dispatchBattle] = useReducer(battleReducer, EMPTY_BATTLE);
    const isBattleLoaded = battle.id;
    const isBattleMessagePresent = !isEmpty(battleMessage);

    const dismissBattle = useCallback(
        (dismissedBattle) => {
            if (
                !dismissedBattle ||
                ['VICTORY', 'DEFEAT'].includes(dismissedBattle.status)
            ) {
                loadPlayer(currentPlayerId);
            }
            dismissBattleAction(dispatchBattle);
        },
        [loadPlayer, currentPlayerId]
    );

    if (battleId && !isBattleLoaded) {
        getBattle(dispatchBattle, battleId, dismissBattle);
    }

    const takeTurn = useCallback(
        (playerAction, targetId) =>
            takeTurnAction(
                dispatchBattle,
                battleId,
                currentPlayerId,
                playerAction,
                targetId
            ),
        [battleId, currentPlayerId]
    );

    if (
        isBattleLoaded &&
        isBattleMessagePresent &&
        battle.id === battleMessage.id
    ) {
        updateBattleAction(dispatchBattle, battleMessage);
        setBattleMessage({});
    }

    return [battle, takeTurn, dismissBattle];
};

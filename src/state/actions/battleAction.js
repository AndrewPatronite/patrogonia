import { isEmpty } from 'lodash';
import {
    getBattle as getBattleRemote,
    takeTurn as taketurnRemote,
} from '../api/battleService';

export const DISMISS_BATTLE = 'DISMISS_BATTLE';
export const GET_BATTLE_SUCCESS = 'GET_BATTLE_SUCCESS';
export const UPDATE_BATTLE = 'UPDATE_BATTLE';

export const dismissBattle = (dispatch) => dispatch({ type: DISMISS_BATTLE });

export const getBattle = (dispatch, battleId, dismiss) => {
    const onSuccess = (battle) => {
        if (isEmpty(battle)) {
            dismiss();
        } else {
            dispatch({ type: GET_BATTLE_SUCCESS, battle });
        }
    };
    const onFailure = (error) => {
        console.log('Failed to get battle: ' + JSON.stringify(error));
    };
    getBattleRemote(battleId, onSuccess, onFailure);
};

export const takeTurn = (
    dispatch,
    battleId,
    playerId,
    playerAction,
    targetId
) => {
    const onSuccess = () => {};
    const onFailure = (error) =>
        console.log('Failed to take turn: ' + JSON.stringify(error));
    console.log(
        'player ' + playerId + ' turn: ' + playerAction + ' ' + targetId
    );
    taketurnRemote(
        battleId,
        playerId,
        playerAction,
        targetId,
        onSuccess,
        onFailure
    );
};

export const updateBattle = (dispatch, battle) =>
    dispatch({ type: UPDATE_BATTLE, battle });

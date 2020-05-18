import { uniqueId } from 'lodash';
export const RECEIVE_PLAYER_LOCATION_MESSAGE = uniqueId(
    'RECEIVE_PLAYER_LOCATION_MESSAGE'
);
export const RECEIVE_BATTLE_MESSAGE = uniqueId('RECEIVE_BATTLE_MESSAGE');

export const receivePlayerLocationMessage = (dispatch, message) =>
    dispatch({ type: RECEIVE_PLAYER_LOCATION_MESSAGE, message });

export const receiveBattleMessage = (dispatch, message) =>
    dispatch({ type: RECEIVE_BATTLE_MESSAGE, message });

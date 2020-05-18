import {
    RECEIVE_BATTLE_MESSAGE,
    RECEIVE_PLAYER_LOCATION_MESSAGE,
} from '../actions/messageAction';

export const messageReducer = (state, action) => {
    const { type, message } = action;
    switch (type) {
        case RECEIVE_BATTLE_MESSAGE:
            return { ...state, battleMessage: message };
        case RECEIVE_PLAYER_LOCATION_MESSAGE:
            return { ...state, playerLocationMessage: message };
        default:
            throw new Error('unhandled type');
    }
};

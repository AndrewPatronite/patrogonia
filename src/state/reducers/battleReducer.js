import {
    DISMISS_BATTLE,
    GET_BATTLE_SUCCESS,
    UPDATE_BATTLE,
} from '../actions/battleAction';

export const EMPTY_BATTLE = {
    enemies: [],
    log: [],
};

export const battleReducer = (state, action) => {
    switch (action.type) {
        case DISMISS_BATTLE:
            return EMPTY_BATTLE;
        case GET_BATTLE_SUCCESS:
            return { ...state, ...action.battle };
        case UPDATE_BATTLE:
            return { ...state, ...action.battle };
        default:
            throw new Error('unhandled type');
    }
};

import { SET_PLAYER } from '../actions/playerAction';

export const playerReducer = (state, action) => {
    switch (action.type) {
        case SET_PLAYER:
            return { ...state, ...action.updatedPlayer };
        default:
            throw new Error('unhandled type');
    }
};

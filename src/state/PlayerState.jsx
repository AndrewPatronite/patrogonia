import { useCallback, useReducer } from 'react';
import {
    createAccountAction,
    loadPlayer as loadPlayerAction,
    loginAction,
    updatePlayerAction,
} from './actions/playerAction';
import { playerReducer } from './reducers/playerReducer';

export const PlayerState = () => {
    const getInitialPlayer = () => {
        const storedPlayer = localStorage.getItem('currentPlayer');
        return storedPlayer
            ? JSON.parse(storedPlayer)
            : { loggedIn: false, location: {} };
    };

    const [currentPlayer, dispatchPlayer] = useReducer(
        playerReducer,
        getInitialPlayer()
    );

    const updatePlayer = useCallback((updatedPlayer, updateToServer = true) => {
        updatePlayerAction(dispatchPlayer, updatedPlayer, updateToServer);
    }, []);

    const loadPlayer = useCallback(
        (playerId) => loadPlayerAction(dispatchPlayer, playerId),
        []
    );

    const login = useCallback(
        (username, password, onFailure) =>
            loginAction(dispatchPlayer, username, password, onFailure),
        []
    );

    const createAccount = useCallback(
        (player, onFailure) =>
            createAccountAction(dispatchPlayer, player, onFailure),
        []
    );

    return [currentPlayer, login, createAccount, updatePlayer, loadPlayer];
};

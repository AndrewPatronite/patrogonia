import { useCallback, useReducer } from 'react';
import {
    createAccountAction,
    loadPlayer as loadPlayerAction,
    loadSaveAction,
    loginAction,
    updatePlayerAction,
    castSpell as castSpellAction,
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

    const loadSave = useCallback(
        (playerId) => loadSaveAction(dispatchPlayer, playerId),
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

    const castSpell = useCallback(
        (spellName: string, targetId: string) =>
            castSpellAction(dispatchPlayer, currentPlayer, spellName, targetId),
        [currentPlayer]
    );

    return [
        currentPlayer,
        login,
        createAccount,
        updatePlayer,
        loadPlayer,
        loadSave,
        castSpell,
    ];
};

import { pick } from 'lodash';
import {
    createAccount,
    getPlayer,
    loadSave,
    login,
    updatePlayer,
} from '../api/playerService';

export const SET_PLAYER = 'SET_PLAYER';

export const loginAction = (dispatch, username, password, onFailure) =>
    login(
        username,
        password,
        (loggedInPlayer) => updatePlayerAction(dispatch, loggedInPlayer, false),
        (error) => onFailure(error)
    );

export const createAccountAction = (dispatch, player, onFailure) =>
    createAccount(
        player,
        (createdPlayer) => updatePlayerAction(dispatch, createdPlayer, false),
        (error) => onFailure(error)
    );

export const loadPlayer = (dispatch, playerId) =>
    getPlayer(playerId, (player) => {
        storeAndDispatchPlayerUpdate(player, dispatch);
    });

export const loadSaveAction = (dispatch, playerId) => {
    loadSave(
        playerId,
        () => loadPlayer(dispatch, playerId),
        (error) => console.log(`Failed to load save ${JSON.stringify(error)}`)
    );
};

export const updatePlayerAction = (dispatch, player, updateToServer) => {
    if (updateToServer) {
        updatePlayer(
            pick(
                player,
                'id',
                'name',
                'username',
                'location',
                'stats',
                'saveGame'
            ),
            (playerResponse) => {
                const updatedPlayer = {
                    ...player,
                    ...playerResponse,
                };
                storeAndDispatchPlayerUpdate(updatedPlayer, dispatch);
            },
            (error) => {
                console.log(
                    'Failed to update player: ' + JSON.stringify(error)
                );
            }
        );
    } else {
        storeAndDispatchPlayerUpdate(player, dispatch);
    }
};

const storeAndDispatchPlayerUpdate = (updatedPlayer, dispatch) => {
    const loggedInPlayer = { ...updatedPlayer, loggedIn: true };
    localStorage.setItem('currentPlayer', JSON.stringify(loggedInPlayer));
    dispatch({
        type: SET_PLAYER,
        updatedPlayer: loggedInPlayer,
    });
};

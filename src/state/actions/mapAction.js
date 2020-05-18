import { getPlayers } from '../api/playerService';

export const GET_PLAYERS = 'GET_PLAYERS';
export const GET_PLAYERS_SUCCESS = 'GET_PLAYERS_SUCCESS';
export const UPDATE_PLAYER = 'UPDATE_PLAYER';
export const REMOVE_PLAYER = 'REMOVE_PLAYER';

export const getPlayersAction = (dispatch, mapName) => {
    dispatch({ type: GET_PLAYERS });
    getPlayers(
        mapName,
        (players) => {
            dispatch({ type: GET_PLAYERS_SUCCESS, mapName, players });
        },
        (error) => {
            console.log(
                `Failed to get players for ${mapName}: ${JSON.stringify(error)}`
            );
        }
    );
};

export const updatePlayerLocationAction = (dispatch, mapName, player) => {
    dispatch({ type: UPDATE_PLAYER, mapName, player });
};

export const removePlayerFromMapAction = (dispatch, mapName, player) => {
    dispatch({ type: REMOVE_PLAYER, mapName, player });
};

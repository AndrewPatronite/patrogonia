import {
    GET_PLAYERS,
    GET_PLAYERS_SUCCESS,
    UPDATE_PLAYER,
    REMOVE_PLAYER,
} from '../actions/mapAction';
import { remove } from 'lodash';

export const mapReducer = (state, action) => {
    const { type, mapName, players, player } = action;

    const getOtherPlayers = () => {
        const mapPlayersCopy = JSON.parse(JSON.stringify(state[mapName] || []));
        remove(
            mapPlayersCopy,
            (existingPlayer) => existingPlayer.id === player.id
        );
        return mapPlayersCopy;
    };

    switch (type) {
        case GET_PLAYERS:
            return { ...state, loadingPlayers: true };
        case GET_PLAYERS_SUCCESS:
            return { ...state, [mapName]: players, loadingPlayers: false };
        case UPDATE_PLAYER:
            const playersToUpdate = getOtherPlayers();
            playersToUpdate.push(player);
            return { ...state, [mapName]: playersToUpdate };
        case REMOVE_PLAYER:
            const otherPlayers = getOtherPlayers();
            return { ...state, [mapName]: otherPlayers };
        default:
            throw new Error('unhandled type');
    }
};

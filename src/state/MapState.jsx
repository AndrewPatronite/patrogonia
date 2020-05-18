import { useReducer } from 'react';
import { isEmpty } from 'lodash';
import {
    getPlayersAction,
    removePlayerFromMapAction,
    updatePlayerLocationAction,
} from './actions/mapAction';
import { mapReducer } from './reducers/mapReducer';
import { Maps } from '../environment/maps/Maps';

export const MapState = (
    currentPlayer,
    playerLocationMessage,
    setPlayerLocationMessage
) => {
    const {
        id: currentPlayerId,
        battleId,
        location: { mapName },
    } = currentPlayer;
    const [mapPlayers, dispatchMapPlayers] = useReducer(mapReducer, {});

    if (!mapName) {
        return [{}, []];
    }

    const map = Maps[mapName]();

    if (
        !mapPlayers.loadingPlayers &&
        isEmpty(mapPlayers[mapName]) &&
        !battleId
    ) {
        getPlayersAction(dispatchMapPlayers, mapName);
    }

    if (
        !isEmpty(playerLocationMessage) &&
        playerLocationMessage.id !== currentPlayerId
    ) {
        if (playerLocationMessage.location.mapName !== mapName) {
            removePlayerFromMapAction(
                dispatchMapPlayers,
                mapName,
                playerLocationMessage
            );
        } else {
            updatePlayerLocationAction(
                dispatchMapPlayers,
                mapName,
                playerLocationMessage
            );
        }
        setPlayerLocationMessage({});
    }

    return [map, mapPlayers];
};

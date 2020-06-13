import { filter, forEach, isEmpty, isEqual } from 'lodash';

export const getLocationToPlayerMap = (playersOnMap, currentPlayer = {}) => {
    const locationToPlayers = {};
    const { location: currentPlayerLocation } = currentPlayer;
    if (!isEmpty(playersOnMap) && !isEmpty(currentPlayerLocation)) {
        const otherPlayers = filter(
            playersOnMap[currentPlayerLocation.mapName],
            (otherPlayer) =>
                !isEqual(otherPlayer.id, currentPlayer.id) &&
                isEqual(
                    otherPlayer.location.mapName,
                    currentPlayerLocation.mapName
                )
        );
        forEach(otherPlayers.concat(currentPlayer), (player) => {
            const {
                location: { rowIndex, columnIndex },
            } = player;
            locationToPlayers[`${rowIndex}-${columnIndex}`] =
                locationToPlayers[`${rowIndex}-${columnIndex}`] || [];
            locationToPlayers[`${rowIndex}-${columnIndex}`].push(player);
        });
    }
    return locationToPlayers;
};

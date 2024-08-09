import filter from 'lodash/filter';
import forEach from 'lodash/forEach';
import isEmpty from 'lodash/isEmpty';
import isEqual from 'lodash/isEqual';
import { LocationToPlayerMap } from '../types';
import { Player } from '../../../player';

export const getLocationToPlayerMap = (
  players: Player[],
  currentPlayer: Player
) => {
  const locationToPlayers: LocationToPlayerMap = {};
  const { location: currentPlayerLocation } = currentPlayer;
  if (!isEmpty(players) && !isEmpty(currentPlayerLocation)) {
    const otherPlayers = filter(
      players,
      (otherPlayer) =>
        !isEqual(otherPlayer.id, currentPlayer.id) &&
        isEqual(otherPlayer.location.mapName, currentPlayerLocation.mapName)
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

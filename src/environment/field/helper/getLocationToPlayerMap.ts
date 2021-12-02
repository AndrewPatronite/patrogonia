import { filter, forEach, isEmpty, isEqual } from 'lodash'
import Player from '../../../player/Player'

export const getLocationToPlayerMap = (
  playersOnMap: Player[],
  currentPlayer: Player
) => {
  const locationToPlayers: { [rowColumnIndices: string]: Player[] } = {}
  const { location: currentPlayerLocation } = currentPlayer
  if (!isEmpty(playersOnMap) && !isEmpty(currentPlayerLocation)) {
    const otherPlayers = filter(
      playersOnMap,
      (otherPlayer) =>
        !isEqual(otherPlayer.id, currentPlayer.id) &&
        isEqual(otherPlayer.location.mapName, currentPlayerLocation.mapName)
    )
    forEach(otherPlayers.concat(currentPlayer), (player) => {
      const {
        location: { rowIndex, columnIndex },
      } = player
      locationToPlayers[`${rowIndex}-${columnIndex}`] =
        locationToPlayers[`${rowIndex}-${columnIndex}`] || []
      locationToPlayers[`${rowIndex}-${columnIndex}`].push(player)
    })
  }
  return locationToPlayers
}

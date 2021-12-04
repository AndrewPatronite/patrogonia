import { filter, forEach, isEmpty, isEqual } from 'lodash'
import { LocationToPlayersMap } from '../types'
import { Player } from '../../../player'

export const getLocationToPlayerMap = (
  playersOnMap: Player[],
  currentPlayer: Player
) => {
  const locationToPlayers: LocationToPlayersMap = {}
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

import React from 'react'
import { find, isEmpty, isEqual } from 'lodash'
import { getLandBorderStyles, getTileKey } from './helper'
import Character from '../../player/Character'
import { Maps } from '../maps/Maps'
import { isAdjacentToCurrentPlayer } from '../../utils'
import { getTile } from './tiles'

const Tile = ({
  mapSymbol,
  rowIndex,
  columnIndex,
  locationToPlayersMap,
  mapLayout,
  currentPlayer,
  npcs,
}) => {
  const { id: currentPlayerId } = currentPlayer
  const isTown = Maps.isTown(mapSymbol)
  const getPlayerToDisplay = (players, playerId) => {
    return isEmpty(players)
      ? undefined
      : find(players, (player) => isEqual(player.id, playerId)) ||
          (!isTown && players[0])
  }
  const landBorderStyles = getLandBorderStyles(
    mapSymbol,
    mapLayout,
    rowIndex,
    columnIndex
  )
  const tileKey = getTileKey(rowIndex, columnIndex)
  const playersOnTile = locationToPlayersMap[tileKey]
  const playerToDisplay = getPlayerToDisplay(playersOnTile, currentPlayerId)
  const npcToDisplay = npcs.find(
    (npc) =>
      npc.currentRowIndex === rowIndex && npc.currentColumnIndex === columnIndex
  )
  const npcInDialogRange =
    npcToDisplay &&
    isAdjacentToCurrentPlayer(
      currentPlayer,
      npcToDisplay.currentRowIndex,
      npcToDisplay.currentColumnIndex
    )
  const TileComponent = getTile(mapSymbol)

  return (
    <TileComponent
      key={tileKey}
      className={`tile rc${tileKey}`}
      height="6.25rem"
      width="6.25rem"
      {...landBorderStyles}
      mapSymbol={mapSymbol}
    >
      {playerToDisplay && (
        <Character
          player={playerToDisplay}
          isCurrentPlayer={isEqual(playerToDisplay.id, currentPlayerId)}
        />
      )}
      {npcToDisplay && (
        <Character
          player={{
            name: npcToDisplay.name,
            location: { facing: npcToDisplay.directionFacing },
            lastUpdate: new Date().toString(),
          }}
          isCurrentPlayer={false}
          inDialogRange={npcInDialogRange}
        />
      )}
    </TileComponent>
  )
}

export default Tile

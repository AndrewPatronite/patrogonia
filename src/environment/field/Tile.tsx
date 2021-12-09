import React from 'react'
import { find, isEmpty, isEqual } from 'lodash'
import { getLandBorderStyles, getTileKey } from './helper'
import Character from '../../player/Character'
import { Maps } from '../maps/Maps'
import { isAdjacentToCurrentPlayer } from '../../utils'
import { getTile } from './tiles'
import { LocationToPlayerMap } from './types'
import { MapLayout } from '../maps'
import { Player } from '../../player'
import { Npc } from '../../npcs'

interface TileProps {
  mapSymbol: string
  rowIndex: number
  columnIndex: number
  locationToPlayerMap: LocationToPlayerMap
  mapLayout: MapLayout
  currentPlayer: Player
  npcs: Npc[]
}

const Tile = ({
  mapSymbol,
  rowIndex,
  columnIndex,
  locationToPlayerMap,
  mapLayout,
  currentPlayer,
  npcs,
}: TileProps) => {
  const { id: currentPlayerId } = currentPlayer
  const isTown = Maps.isTown(mapSymbol)
  const getPlayerToDisplay = (players: Player[], playerId: number) => {
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
  const playersOnTile = locationToPlayerMap[tileKey]
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
      mapsymbol={mapSymbol}
      data-testid="tile"
    >
      {playerToDisplay && (
        <Character
          name={playerToDisplay.name}
          directionFacing={playerToDisplay.location.facing}
          isCurrentPlayer={isEqual(playerToDisplay.id, currentPlayerId)}
        />
      )}
      {npcToDisplay && (
        <Character
          name={npcToDisplay.name}
          directionFacing={npcToDisplay.directionFacing}
          lastUpdate={new Date().toString()}
          inDialogRange={npcInDialogRange}
        />
      )}
    </TileComponent>
  )
}

export default Tile

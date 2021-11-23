import React from 'react'
import Tile from './Tile'
import { Flex } from '@chakra-ui/react'

const TileRow = ({
  rowSymbols,
  rowIndex,
  locationToPlayersMap,
  displayIndexRange: { columnStartIndex, columnEndIndex },
  mapLayout,
  currentPlayer,
  npcs,
}) => (
  <Flex>
    {rowSymbols
      .slice(columnStartIndex, columnEndIndex + 1)
      .map((mapSymbol, tileIndexOffset) => (
        <Tile
          key={`tile-${rowIndex}-${columnStartIndex + tileIndexOffset}`}
          mapSymbol={mapSymbol}
          rowIndex={rowIndex}
          columnIndex={columnStartIndex + tileIndexOffset}
          locationToPlayersMap={locationToPlayersMap}
          mapLayout={mapLayout}
          currentPlayer={currentPlayer}
          npcs={npcs}
        />
      ))}
  </Flex>
)

export default TileRow

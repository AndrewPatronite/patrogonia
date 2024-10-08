import React from 'react';
import Tile from './Tile';
import { Flex } from '@chakra-ui/react';
import { LocationToPlayerMap, MapDisplayRange } from './types';
import { MapLayout } from '../maps';
import { Player } from '../../player';
import { Npc } from '../../npcs';

interface TileRowProps {
  rowSymbols: string[];
  rowIndex: number;
  locationToPlayerMap: LocationToPlayerMap;
  mapDisplayRange: MapDisplayRange;
  mapLayout: MapLayout;
  currentPlayer: Player;
  npcs: Npc[];
}

const TileRow = ({
  rowSymbols,
  rowIndex,
  locationToPlayerMap,
  mapDisplayRange: { columnStartIndex, columnEndIndex },
  mapLayout,
  currentPlayer,
  npcs,
}: TileRowProps) => (
  <Flex data-testid="tile-row">
    {rowSymbols
      .slice(columnStartIndex, columnEndIndex + 1)
      .map((mapSymbol, tileIndexOffset) => (
        <Tile
          key={`tile-${rowIndex}-${columnStartIndex + tileIndexOffset}`}
          mapSymbol={mapSymbol}
          rowIndex={rowIndex}
          columnIndex={columnStartIndex + tileIndexOffset}
          locationToPlayerMap={locationToPlayerMap}
          mapLayout={mapLayout}
          currentPlayer={currentPlayer}
          npcs={npcs}
        />
      ))}
  </Flex>
);

export default TileRow;

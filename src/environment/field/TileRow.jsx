import React from 'react';
import Tile from './Tile';

const TileRow = ({
    rowSymbols,
    rowIndex,
    locationToPlayersMap,
    displayIndexRange: { columnStartIndex, columnEndIndex },
    mapLayout,
    currentPlayer,
    npcs,
}) => (
    <div className="row">
        {rowSymbols
            .slice(columnStartIndex, columnEndIndex + 1)
            .map((mapSymbol, tileIndexOffset) => (
                <Tile
                    key={`tile-${rowIndex}-${
                        columnStartIndex + tileIndexOffset
                    }`}
                    mapSymbol={mapSymbol}
                    rowIndex={rowIndex}
                    columnIndex={columnStartIndex + tileIndexOffset}
                    locationToPlayersMap={locationToPlayersMap}
                    mapLayout={mapLayout}
                    currentPlayer={currentPlayer}
                    npcs={npcs}
                />
            ))}
    </div>
);

export default TileRow;

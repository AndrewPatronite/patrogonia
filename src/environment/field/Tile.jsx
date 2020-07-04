import React from 'react';
import { find, isEmpty, isEqual } from 'lodash';
import { Legend } from '../maps/Legend';
import { getBorderClasses } from './helper/getBorderClasses';
import Character from '../../player/Character'
import { getTileKey } from './helper/getTileKey';

const Tile = ({
    mapSymbol,
    rowIndex,
    columnIndex,
    locationToPlayersMap,
    mapLayout,
    currentPlayer,
}) => {
    const { id: currentPlayerId } = currentPlayer;
    const getPlayerToDisplay = (players, playerId) => {
        return isEmpty(players)
            ? undefined
            : find(players, (player) => isEqual(player.id, playerId)) ||
                  players[0];
    };
    const entrance = 'entrance';
    const className = Legend[mapSymbol] || entrance;
    const entranceName = isEqual(className, entrance) ? mapSymbol : undefined;
    const borderClasses = getBorderClasses(
        mapSymbol,
        mapLayout,
        rowIndex,
        columnIndex
    );
    const tileKey = getTileKey(rowIndex, columnIndex);
    const playersOnTile = locationToPlayersMap[tileKey];
    const playerToDisplay = getPlayerToDisplay(playersOnTile, currentPlayerId);
    const isTown = isEqual(mapSymbol, Legend.symbols.TOWN);
    return (
        <div
            key={tileKey}
            className={`tile rc${tileKey} ${className}${borderClasses}`}
        >
            {playerToDisplay ? (
                <Character
                    player={playerToDisplay}
                    isCurrentPlayer={isEqual(
                        playerToDisplay.id,
                        currentPlayerId
                    )}
                    isSaveLocation={isTown}
                />
            ) : (
                entranceName && <p>{entranceName}</p>
            )}
        </div>
    );
};

export default Tile;

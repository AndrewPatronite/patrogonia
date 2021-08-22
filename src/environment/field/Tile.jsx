import React from 'react';
import { find, isEmpty, isEqual } from 'lodash';
import { Legend } from '../maps/Legend';
import { getBorderClasses } from './helper/getBorderClasses';
import Character from '../../player/Character';
import { getTileKey } from './helper/getTileKey';
import { Maps } from '../maps/Maps';
import { isAdjacentToCurrentPlayer } from '../../utils';

const Tile = ({
    mapSymbol,
    rowIndex,
    columnIndex,
    locationToPlayersMap,
    mapLayout,
    currentPlayer,
    npcs,
}) => {
    const { id: currentPlayerId } = currentPlayer;
    const isTown = Maps.isTown(mapSymbol);
    const getPlayerToDisplay = (players, playerId) => {
        return isEmpty(players)
            ? undefined
            : find(players, (player) => isEqual(player.id, playerId)) ||
                  (!isTown && players[0]);
    };
    const entrance = 'entrance';
    const town = 'town';
    const className = Legend[mapSymbol] || (isTown ? town : entrance);
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
    const npcToDisplay = npcs.find(
        (npc) =>
            npc.currentRowIndex === rowIndex &&
            npc.currentColumnIndex === columnIndex
    );

    const npcInDialogRange =
        npcToDisplay &&
        isAdjacentToCurrentPlayer(
            currentPlayer,
            npcToDisplay.currentRowIndex,
            npcToDisplay.currentColumnIndex
        );
    return (
        <div
            key={tileKey}
            className={`tile rc${tileKey} ${className}${borderClasses}`}
        >
            {isTown && <b className={'town-name'}>{mapSymbol}</b>}
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
            {npcToDisplay && (
                <Character
                    player={{
                        name: npcToDisplay.name,
                        location: { facing: npcToDisplay.directionFacing },
                        lastUpdate: new Date().toString(),
                    }}
                    isCurrentPlayer={false}
                    isSaveLocation={false}
                    inDialogRange={npcInDialogRange}
                />
            )}
        </div>
    );
};

export default Tile;

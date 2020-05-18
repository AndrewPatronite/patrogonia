import { throttle } from 'lodash';
import { Maps } from '../environment/maps/Maps';
import { Direction } from './Direction';

const moveDelay = 250;

const updatePlayerLocation = (
    currentMap,
    nextRowIndex,
    nextColumnIndex,
    directionFacing,
    currentPlayer,
    updatePlayer
) => {
    const nextPosition = currentMap.layout[nextRowIndex][nextColumnIndex];
    const isTravelDestination = Maps.isTravelDestination(nextPosition);

    if (isTravelDestination) {
        const nextMap = Maps[nextPosition](currentMap.name);
        const { name: mapName, entrance } = nextMap;

        updatePlayer({
            ...currentPlayer,
            location: {
                mapName,
                ...entrance,
                facing: 'down',
            },
        });
    } else if (Maps.canTraverse(nextPosition)) {
        updatePlayer({
            ...currentPlayer,
            location: {
                mapName: currentMap.name,
                rowIndex: nextRowIndex,
                columnIndex: nextColumnIndex,
                facing: directionFacing,
            },
            saveGame: Maps.isTown(nextPosition),
        });
    }
};

export const movePlayer = throttle((currentPlayer, direction, updatePlayer) => {
    const currentMap = Maps[currentPlayer.location.mapName]();
    const { up, down, left, right } = Direction;
    const {
        rowIndex: currentRowIndex,
        columnIndex: currentColumnIndex,
    } = currentPlayer.location;

    switch (direction) {
        case up:
            if (currentRowIndex > 0) {
                updatePlayerLocation(
                    currentMap,
                    currentRowIndex - 1,
                    currentColumnIndex,
                    up,
                    currentPlayer,
                    updatePlayer
                );
            }
            break;
        case down:
            if (currentRowIndex < currentMap.layout.length - 1) {
                updatePlayerLocation(
                    currentMap,
                    currentRowIndex + 1,
                    currentColumnIndex,
                    down,
                    currentPlayer,
                    updatePlayer
                );
            }
            break;
        case left:
            if (currentColumnIndex > 0) {
                updatePlayerLocation(
                    currentMap,
                    currentRowIndex,
                    currentColumnIndex - 1,
                    left,
                    currentPlayer,
                    updatePlayer
                );
            }
            break;
        case right:
            if (
                currentColumnIndex <
                currentMap.layout[currentRowIndex].length - 1
            ) {
                updatePlayerLocation(
                    currentMap,
                    currentRowIndex,
                    currentColumnIndex + 1,
                    right,
                    currentPlayer,
                    updatePlayer
                );
            }
            break;
        default:
            break;
    }
}, moveDelay);

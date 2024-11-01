import throttle from 'lodash/throttle';
import uniq from 'lodash/uniq';
import { Direction } from './types';
import { Map } from '../environment/maps';
import {
  isSaveLocation,
  isTravelDestination,
  Maps,
} from '../environment/maps/Maps';
import { Player } from '../player';
import { LessonEnum } from '../tutorial';
import { CaveName, MapName } from '../environment/maps/types';

const moveDelay = 250;

const getCompletedLessons = (
  saveGame: boolean,
  currentPlayer: Player,
  mapName: string,
  playerMoved: boolean
): string[] => {
  const completedLessons = saveGame
    ? currentPlayer.tutorialLessons.concat(LessonEnum.TownVisitLesson)
    : [...currentPlayer.tutorialLessons];

  if (mapName === CaveName.LavaGrotto) {
    completedLessons.push(LessonEnum.CaveExplorationLesson);
  }
  if (playerMoved) {
    completedLessons.push(LessonEnum.MovementLesson);
  }
  return uniq(completedLessons);
};

const updatePlayerLocation = (
  currentMap: Map,
  nextRowIndex: number,
  nextColumnIndex: number,
  directionFacing: Direction,
  currentPlayer: Player,
  updatePlayer: (
    player: Player,
    saveGame?: boolean,
    updateToServer?: boolean
  ) => void,
  canMoveToPosition: (
    rowIndex: number,
    columnIndex: number,
    movementType: 'player' | 'npc'
  ) => boolean
) => {
  const nextPosition = currentMap.layout[nextRowIndex][nextColumnIndex];

  if (isTravelDestination(nextPosition)) {
    const nextMap = Maps[nextPosition as MapName](currentMap.name);
    const { name: mapName, entrance } = nextMap;
    const saveGame = isSaveLocation(mapName);

    updatePlayer(
      {
        ...currentPlayer,
        location: {
          mapName,
          ...entrance,
          facing: Direction.Down,
        },
        tutorialLessons: getCompletedLessons(
          saveGame,
          currentPlayer,
          mapName,
          true
        ),
      },
      saveGame
    );
  } else if (canMoveToPosition(nextRowIndex, nextColumnIndex, 'player')) {
    const nextLocation = {
      ...currentPlayer.location,
      mapName: currentMap.name,
      rowIndex: nextRowIndex,
      columnIndex: nextColumnIndex,
      facing: directionFacing,
    };
    const saveGame = isSaveLocation(nextPosition);
    updatePlayer(
      {
        ...currentPlayer,
        location: nextLocation,
        tutorialLessons: getCompletedLessons(
          saveGame,
          currentPlayer,
          currentMap.name,
          true
        ),
      },
      saveGame
    );
  } else {
    const nextLocation = {
      ...currentPlayer.location,
      facing: directionFacing,
    };
    const saveGame = isSaveLocation(nextPosition);
    updatePlayer(
      {
        ...currentPlayer,
        location: nextLocation,
        tutorialLessons: getCompletedLessons(
          saveGame,
          currentPlayer,
          currentMap.name,
          false
        ),
      },
      saveGame
    );
  }
};

const tryExit = (
  currentPlayer: Player,
  { exit }: Map,
  updatePlayer: (
    player: Player,
    saveGame?: boolean,
    updateToServer?: boolean
  ) => void
) => {
  if (exit) {
    updatePlayer({
      ...currentPlayer,
      location: exit,
    });
  }
};

export const movePlayer = throttle(
  (
    currentPlayer: Player,
    direction: string,
    updatePlayer: (
      player: Player,
      saveGame?: boolean,
      updateToServer?: boolean
    ) => void,
    canMoveToPosition: (
      rowIndex: number,
      columnIndex: number,
      movementType: 'player' | 'npc'
    ) => boolean
  ) => {
    const currentMap = Maps[currentPlayer.location.mapName]();
    const {
      rowIndex: currentRowIndex,
      columnIndex: currentColumnIndex,
    } = currentPlayer.location;

    switch (direction) {
      case Direction.Up:
        if (currentRowIndex > 0) {
          updatePlayerLocation(
            currentMap,
            currentRowIndex - 1,
            currentColumnIndex,
            Direction.Up,
            currentPlayer,
            updatePlayer,
            canMoveToPosition
          );
        } else {
          tryExit(currentPlayer, currentMap, updatePlayer);
        }
        break;
      case Direction.Down:
        if (currentRowIndex < currentMap.layout.length - 1) {
          updatePlayerLocation(
            currentMap,
            currentRowIndex + 1,
            currentColumnIndex,
            Direction.Down,
            currentPlayer,
            updatePlayer,
            canMoveToPosition
          );
        } else {
          tryExit(currentPlayer, currentMap, updatePlayer);
        }
        break;
      case Direction.Left:
        if (currentColumnIndex > 0) {
          updatePlayerLocation(
            currentMap,
            currentRowIndex,
            currentColumnIndex - 1,
            Direction.Left,
            currentPlayer,
            updatePlayer,
            canMoveToPosition
          );
        } else {
          tryExit(currentPlayer, currentMap, updatePlayer);
        }
        break;
      case Direction.Right:
        if (
          currentColumnIndex <
          currentMap.layout[currentRowIndex].length - 1
        ) {
          updatePlayerLocation(
            currentMap,
            currentRowIndex,
            currentColumnIndex + 1,
            Direction.Right,
            currentPlayer,
            updatePlayer,
            canMoveToPosition
          );
        } else {
          tryExit(currentPlayer, currentMap, updatePlayer);
        }
        break;
      default:
        break;
    }
  },
  moveDelay
);

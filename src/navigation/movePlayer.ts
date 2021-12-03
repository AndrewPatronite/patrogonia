import { throttle, uniq } from 'lodash'
import { Map } from '../environment/maps'
import { Cave, Maps } from '../environment/maps/Maps'
import { DirectionKeyMapper } from './DirectionKeyMapper'
import { LessonEnum } from '../tutorial'
import Player from '../player/Player'

const moveDelay = 250

const getCompletedLessons = (
  saveGame: boolean,
  currentPlayer: Player,
  mapName: string,
  playerMoved: boolean
): string[] => {
  const completedLessons = saveGame
    ? currentPlayer.tutorialLessons.concat(LessonEnum.TownVisitLesson)
    : [...currentPlayer.tutorialLessons]

  if (mapName === Cave.LavaGrotto) {
    completedLessons.push(LessonEnum.CaveExplorationLesson)
  }
  if (playerMoved) {
    completedLessons.push(LessonEnum.MovementLesson)
  }
  return uniq(completedLessons)
}

const updatePlayerLocation = (
  currentMap: Map,
  nextRowIndex: number,
  nextColumnIndex: number,
  directionFacing: string,
  currentPlayer: Player,
  updatePlayer: (
    player: Player,
    saveGame?: boolean,
    updateToServer?: boolean
  ) => void,
  canMoveToPosition: (rowIndex: number, columnIndex: number) => boolean
) => {
  const nextPosition = currentMap.layout[nextRowIndex][nextColumnIndex]
  const isTravelDestination = Maps.isTravelDestination(nextPosition)

  if (isTravelDestination) {
    // @ts-ignore
    const nextMap = Maps[nextPosition](currentMap.name)
    const { name: mapName, entrance } = nextMap
    const saveGame = Maps.isSaveLocation(mapName)

    updatePlayer(
      {
        ...currentPlayer,
        location: {
          mapName,
          ...entrance,
          facing: 'down',
        },
        tutorialLessons: getCompletedLessons(
          saveGame,
          currentPlayer,
          mapName,
          true
        ),
      },
      saveGame
    )
  } else if (canMoveToPosition(nextRowIndex, nextColumnIndex)) {
    const nextLocation = {
      ...currentPlayer.location,
      mapName: currentMap.name,
      rowIndex: nextRowIndex,
      columnIndex: nextColumnIndex,
      facing: directionFacing,
    }
    const saveGame = Maps.isSaveLocation(nextPosition)
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
    )
  } else {
    const nextLocation = {
      ...currentPlayer.location,
      facing: directionFacing,
    }
    const saveGame = Maps.isSaveLocation(nextPosition)
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
    )
  }
}

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
    })
  }
}

export const movePlayer = throttle(
  (
    currentPlayer: Player,
    direction: string,
    updatePlayer: (
      player: Player,
      saveGame?: boolean,
      updateToServer?: boolean
    ) => void,
    canMoveToPosition: (rowIndex: number, columnIndex: number) => boolean
  ) => {
    // @ts-ignore
    const currentMap = Maps[currentPlayer.location.mapName]()
    const { up, down, left, right } = DirectionKeyMapper
    const {
      rowIndex: currentRowIndex,
      columnIndex: currentColumnIndex,
    } = currentPlayer.location

    switch (direction) {
      case up:
        if (currentRowIndex > 0) {
          updatePlayerLocation(
            currentMap,
            currentRowIndex - 1,
            currentColumnIndex,
            up,
            currentPlayer,
            updatePlayer,
            canMoveToPosition
          )
        } else {
          tryExit(currentPlayer, currentMap, updatePlayer)
        }
        break
      case down:
        if (currentRowIndex < currentMap.layout.length - 1) {
          updatePlayerLocation(
            currentMap,
            currentRowIndex + 1,
            currentColumnIndex,
            down,
            currentPlayer,
            updatePlayer,
            canMoveToPosition
          )
        } else {
          tryExit(currentPlayer, currentMap, updatePlayer)
        }
        break
      case left:
        if (currentColumnIndex > 0) {
          updatePlayerLocation(
            currentMap,
            currentRowIndex,
            currentColumnIndex - 1,
            left,
            currentPlayer,
            updatePlayer,
            canMoveToPosition
          )
        } else {
          tryExit(currentPlayer, currentMap, updatePlayer)
        }
        break
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
            updatePlayer,
            canMoveToPosition
          )
        } else {
          tryExit(currentPlayer, currentMap, updatePlayer)
        }
        break
      default:
        break
    }
  },
  moveDelay
)

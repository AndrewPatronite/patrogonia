import { throttle } from 'lodash'
import { Cave, Maps } from '../environment/maps/Maps'
import { DirectionKeyMapper } from './DirectionKeyMapper'
import { LessonEnum, recordLesson } from '../tutorial'

const moveDelay = 250

const recordTownVisitLessonOnSave = (saveGame, player, updatePlayer) => {
  if (saveGame) {
    recordLesson(player, LessonEnum.TownVisitLesson, updatePlayer)
  }
}

const updatePlayerLocation = (
  currentMap,
  nextRowIndex,
  nextColumnIndex,
  directionFacing,
  currentPlayer,
  updatePlayer,
  canMoveToPosition,
  updateCharacterPosition
) => {
  const nextPosition = currentMap.layout[nextRowIndex][nextColumnIndex]
  const isTravelDestination = Maps.isTravelDestination(nextPosition)

  if (isTravelDestination) {
    const nextMap = Maps[nextPosition](currentMap.name)
    const { name: mapName, entrance } = nextMap

    if (mapName === Cave.LavaGrotto) {
      recordLesson(
        currentPlayer,
        LessonEnum.CaveExplorationLesson,
        updatePlayer
      )
    }

    const saveGame = Maps.isSaveLocation(mapName)
    recordTownVisitLessonOnSave(saveGame, currentPlayer, updatePlayer)
    updatePlayer({
      ...currentPlayer,
      location: {
        mapName,
        ...entrance,
        facing: 'down',
      },
      saveGame,
    })
  } else if (
    canMoveToPosition({
      mapName: currentMap.name,
      rowIndex: nextRowIndex,
      columnIndex: nextColumnIndex,
    })
  ) {
    const nextLocation = {
      ...currentPlayer.location,
      mapName: currentMap.name,
      rowIndex: nextRowIndex,
      columnIndex: nextColumnIndex,
      facing: directionFacing,
    }
    updateCharacterPosition(
      `${currentPlayer.name}-${currentPlayer.id}`,
      nextLocation
    )
    const saveGame = Maps.isSaveLocation(nextPosition)
    recordTownVisitLessonOnSave(saveGame, currentPlayer, updatePlayer)
    updatePlayer({
      ...currentPlayer,
      location: nextLocation,
      saveGame,
    })
  } else {
    const nextLocation = {
      ...currentPlayer.location,
      facing: directionFacing,
    }
    updateCharacterPosition(
      `${currentPlayer.name}-${currentPlayer.id}`,
      nextLocation
    )
    const saveGame = Maps.isSaveLocation(nextPosition)
    recordTownVisitLessonOnSave(saveGame, currentPlayer, updatePlayer)
    updatePlayer({
      ...currentPlayer,
      location: nextLocation,
      saveGame,
    })
  }
}

const tryExit = (currentPlayer, { exit }, updatePlayer) => {
  if (exit) {
    updatePlayer({
      ...currentPlayer,
      location: exit,
    })
  }
}

export const movePlayer = throttle(
  (
    currentPlayer,
    direction,
    updatePlayer,
    canMoveToPosition,
    updateCharacterPosition
  ) => {
    recordLesson(currentPlayer, LessonEnum.MovementLesson, updatePlayer)
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
            canMoveToPosition,
            updateCharacterPosition
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
            canMoveToPosition,
            updateCharacterPosition
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
            canMoveToPosition,
            updateCharacterPosition
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
            canMoveToPosition,
            updateCharacterPosition
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

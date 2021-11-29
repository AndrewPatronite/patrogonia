import { useEffect } from 'react'
import { DirectionKeyMapper } from './DirectionKeyMapper'
import { movePlayer } from './movePlayer'
import { OPEN_DIALOG, OPEN_FIELD_MENU } from './FieldMenuKeys'
import { ModalEnum } from '../context/ModalStateContext'
import { isAdjacentToCurrentPlayer } from '../utils'
import { LessonEnum, recordLesson } from '../tutorial'

export const usePlayerNavigationEffect = (
  currentPlayer,
  updatePlayer,
  canMoveToPosition,
  updateCharacterPosition,
  openModal,
  npcs,
  setCharacterTalking,
  isModalOpen
) => {
  return useEffect(() => {
    const { isDirectionKey, getDirection } = DirectionKeyMapper

    const handleKeyDown = ({ key }) => {
      const isDialogOpen = isModalOpen(ModalEnum.Dialog)
      const isFieldMenuOpen = isModalOpen(ModalEnum.FieldMenu)
      const navigationEnabled =
        currentPlayer.loggedIn &&
        !currentPlayer.battleId &&
        !currentPlayer.showFieldMenu &&
        !(isDialogOpen || isFieldMenuOpen)
      if (navigationEnabled) {
        if (isDirectionKey(key)) {
          movePlayer(
            currentPlayer,
            getDirection(key),
            updatePlayer,
            canMoveToPosition,
            updateCharacterPosition
          )
        } else {
          switch (key) {
            case OPEN_DIALOG:
              const firstAdjacentNpc = npcs.find((npc) =>
                isAdjacentToCurrentPlayer(
                  currentPlayer,
                  npc.currentRowIndex,
                  npc.currentColumnIndex
                )
              )
              if (firstAdjacentNpc) {
                recordLesson(currentPlayer, LessonEnum.NpcLesson, updatePlayer)
                setCharacterTalking(`npc-${firstAdjacentNpc.name}`, true)
                let npcFacing
                let playerFacing
                if (
                  firstAdjacentNpc.currentRowIndex >
                  currentPlayer.location.rowIndex
                ) {
                  playerFacing = 'down'
                  npcFacing = 'up'
                } else if (
                  firstAdjacentNpc.currentRowIndex <
                  currentPlayer.location.rowIndex
                ) {
                  playerFacing = 'up'
                  npcFacing = 'down'
                } else if (
                  firstAdjacentNpc.currentColumnIndex <
                  currentPlayer.location.columnIndex
                ) {
                  playerFacing = 'left'
                  npcFacing = 'right'
                } else {
                  playerFacing = 'right'
                  npcFacing = 'left'
                }
                movePlayer(
                  currentPlayer,
                  playerFacing,
                  updatePlayer,
                  canMoveToPosition,
                  updateCharacterPosition
                )
                const nextLocation = {
                  mapName: currentPlayer.location.mapName,
                  rowIndex: firstAdjacentNpc.currentRowIndex,
                  columnIndex: firstAdjacentNpc.currentColumnIndex,
                  facing: npcFacing,
                  entranceName: '',
                }
                updateCharacterPosition(
                  `npc-${firstAdjacentNpc.name}`,
                  nextLocation
                )
              }
              break
            case OPEN_FIELD_MENU:
              recordLesson(
                currentPlayer,
                LessonEnum.FieldMenuLesson,
                updatePlayer
              )
              openModal(ModalEnum.FieldMenu)
              break
            default:
              break
          }
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [
    canMoveToPosition,
    currentPlayer,
    setCharacterTalking,
    isModalOpen,
    openModal,
    npcs,
    updateCharacterPosition,
    updatePlayer,
  ])
}

import { useEffect } from 'react'
import { DirectionKeyMapper } from './DirectionKeyMapper'
import { OPEN_DIALOG, OPEN_FIELD_MENU } from './FieldMenuKeys'
import { ModalEnum } from '../context'
import { isAdjacentToCurrentPlayer } from '../utils'
import { hasCompletedLesson, LessonEnum, recordLesson } from '../tutorial'
import { useMap, useModalState, usePlayer } from '../hooks'
import { getDialog } from '../npcs'
import { movePlayer } from './movePlayer'
import { uniq } from 'lodash'

export const usePlayerNavigationEffect = () => {
  const { isModalOpen, openModal } = useModalState()
  const { currentPlayer, updatePlayer } = usePlayer()
  const { npcs, canMoveToPosition, updateNpc } = useMap()
  return useEffect(() => {
    const { isDirectionKey, getDirection } = DirectionKeyMapper

    const handleKeyDown = ({ key }: { key: string }) => {
      const isDialogOpen = isModalOpen(ModalEnum.Dialog)
      const isFieldMenuOpen = isModalOpen(ModalEnum.FieldMenu)
      const navigationEnabled =
        currentPlayer.loggedIn &&
        !currentPlayer.battleId &&
        !(isDialogOpen || isFieldMenuOpen) &&
        hasCompletedLesson(currentPlayer, LessonEnum.Introduction)
      if (navigationEnabled) {
        if (isDirectionKey(key)) {
          movePlayer(
            currentPlayer,
            getDirection(key),
            updatePlayer,
            canMoveToPosition
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
                  {
                    ...currentPlayer,
                    tutorialLessons: uniq(
                      currentPlayer.tutorialLessons.concat(LessonEnum.NpcLesson)
                    ),
                  },
                  playerFacing,
                  updatePlayer,
                  canMoveToPosition
                )
                updateNpc({
                  ...firstAdjacentNpc,
                  directionFacing: npcFacing,
                  isTalking: true,
                })
                openModal(ModalEnum.Dialog, getDialog(firstAdjacentNpc.name))
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
    isModalOpen,
    openModal,
    npcs,
    updatePlayer,
    updateNpc,
  ])
}

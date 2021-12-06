import { useEffect } from 'react'
import { FieldMenuKeys } from './FieldMenuKeys'
import { ModalEnum } from '../context'
import { isAdjacentToCurrentPlayer } from '../utils'
import { hasCompletedLesson, LessonEnum, recordLesson } from '../tutorial'
import { useMap, useModalState, usePlayer } from '../hooks'
import { getDialog } from '../npcs'
import { movePlayer } from './movePlayer'
import { uniq } from 'lodash'
import { DirectionKeyMap, isDirectionKey } from './DirectionKeyMapper'
import { Direction } from './types'

export const usePlayerNavigationEffect = () => {
  const { isModalOpen, openModal } = useModalState()
  const { currentPlayer, updatePlayer } = usePlayer()
  const { npcs, canMoveToPosition, updateNpc } = useMap()
  return useEffect(() => {
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
            DirectionKeyMap[key],
            updatePlayer,
            canMoveToPosition
          )
        } else {
          switch (key) {
            case FieldMenuKeys.OpenDialog:
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
                  playerFacing = Direction.Down
                  npcFacing = Direction.Up
                } else if (
                  firstAdjacentNpc.currentRowIndex <
                  currentPlayer.location.rowIndex
                ) {
                  playerFacing = Direction.Up
                  npcFacing = Direction.Down
                } else if (
                  firstAdjacentNpc.currentColumnIndex <
                  currentPlayer.location.columnIndex
                ) {
                  playerFacing = Direction.Left
                  npcFacing = Direction.Right
                } else {
                  playerFacing = Direction.Right
                  npcFacing = Direction.Left
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
            case FieldMenuKeys.OpenFieldMenu:
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

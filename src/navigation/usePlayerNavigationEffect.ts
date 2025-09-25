import { useEffect } from 'react';
import { FieldMenuKeys } from './FieldMenuKeys';
import { ModalEnum } from '../context';
import { isAdjacentToCurrentPlayer } from '../utils';
import { hasCompletedLesson, LessonEnum, recordLesson } from '../tutorial';
import { useModalState, usePlayer } from '../hooks';
import { getDialog, NpcType } from '../npcs';
import { movePlayer } from './movePlayer';
import uniq from 'lodash/uniq';
import { DirectionKeyMap, isDirectionKey } from './DirectionKeyMapper';
import { Direction } from './types';
import { useMap } from '../environment/field';
import { ShopType } from '../shop';

export const usePlayerNavigationEffect = () => {
  const { closeModal, isModalOpen, openModal } = useModalState();
  const { currentPlayer, updatePlayer, updateInProgress } = usePlayer();
  const { npcs, canMoveToPosition, updateNpc } = useMap();
  return useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const { key } = e;
      if (currentPlayer && !updateInProgress) {
        const isDialogOpen = isModalOpen(ModalEnum.Dialog);
        const isFieldMenuOpen = isModalOpen(ModalEnum.FieldMenu);
        const isShopModalOpen = isModalOpen(ModalEnum.Shop);
        const navigationEnabled =
          currentPlayer.loggedIn &&
          !currentPlayer.battleId &&
          !(isDialogOpen || isFieldMenuOpen || isShopModalOpen) &&
          hasCompletedLesson(currentPlayer, LessonEnum.Introduction);
        if (navigationEnabled) {
          if (isDirectionKey(key)) {
            movePlayer(
              currentPlayer,
              DirectionKeyMap[key],
              updatePlayer,
              canMoveToPosition
            );
          } else {
            switch (key) {
              case FieldMenuKeys.OpenDialog:
                {
                  const firstAdjacentNpc = npcs.find((npc) =>
                    isAdjacentToCurrentPlayer(
                      currentPlayer,
                      npc.currentRowIndex,
                      npc.currentColumnIndex
                    )
                  );
                  if (firstAdjacentNpc) {
                    let npcFacing: Direction;
                    let playerFacing;
                    if (
                      firstAdjacentNpc.currentRowIndex >
                      currentPlayer.location.rowIndex
                    ) {
                      playerFacing = Direction.Down;
                      npcFacing = Direction.Up;
                    } else if (
                      firstAdjacentNpc.currentRowIndex <
                      currentPlayer.location.rowIndex
                    ) {
                      playerFacing = Direction.Up;
                      npcFacing = Direction.Down;
                    } else if (
                      firstAdjacentNpc.currentColumnIndex <
                      currentPlayer.location.columnIndex
                    ) {
                      playerFacing = Direction.Left;
                      npcFacing = Direction.Right;
                    } else {
                      playerFacing = Direction.Right;
                      npcFacing = Direction.Left;
                    }
                    movePlayer(
                      {
                        ...currentPlayer,
                        tutorialLessons: uniq(
                          currentPlayer.tutorialLessons.concat(
                            LessonEnum.NpcLesson
                          )
                        ),
                      },
                      playerFacing,
                      updatePlayer,
                      canMoveToPosition
                    );
                    closeModal(ModalEnum.PlayerStats);
                    if (firstAdjacentNpc.type === NpcType.ItemMerchant) {
                      openModal(ModalEnum.Shop, {
                        mapName: firstAdjacentNpc.currentMapName,
                        shopType: ShopType.General,
                      });
                    } else {
                      updateNpc({
                        ...firstAdjacentNpc,
                        directionFacing: npcFacing,
                        isTalking: true,
                      });
                      openModal(
                        ModalEnum.Dialog,
                        getDialog(firstAdjacentNpc.name),
                        () =>
                          updateNpc({
                            ...firstAdjacentNpc,
                            directionFacing: npcFacing,
                            isTalking: false,
                          })
                      );
                    }
                  }
                }
                break;
              case FieldMenuKeys.OpenFieldMenu:
                e.preventDefault();
                e.stopPropagation();
                recordLesson(
                  currentPlayer,
                  LessonEnum.FieldMenuLesson,
                  updatePlayer
                );
                openModal(ModalEnum.FieldMenu);
                break;
              default:
                break;
            }
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [
    canMoveToPosition,
    closeModal,
    currentPlayer,
    isModalOpen,
    npcs,
    openModal,
    updateInProgress,
    updateNpc,
    updatePlayer,
  ]);
};

import React, { useEffect, useMemo, useState } from 'react';
import TileRow from './TileRow';
import { Sound } from '../sound';
import PlayerStatsModal from '../../player/PlayerStatsModal';
import { isField, isTown } from '../maps/Maps';
import { useMap } from './useMap';
import { useNpcMovementEffect } from './useNpcMovementEffect';
import { useModalState, usePlayer, useSound } from '../../hooks';
import DialogModal from '../../dialog/DialogModal';
import { usePlayerNavigationEffect } from '../../navigation';
import { Box, Text } from '@chakra-ui/react';
import { CaptionModal } from '../../components';
import { ModalEnum } from '../../context';
import useRoutingEffect from '../../app/useRoutingEffect';
import { TileColors } from './tiles/terrain';
import ShopModal from '../../dialog/ShopModal';
import { FieldMenu } from '../../menu';

const SHOW_PLAYER_STATS_DELAY = 5000;

const World = () => {
  const { castSpell, currentPlayer } = usePlayer();

  useRoutingEffect(currentPlayer);

  const { playSound } = useSound();
  const {
    closeModal,
    getModalContent,
    isModalOpen,
    openModal,
  } = useModalState();
  const {
    location: { mapName, rowIndex, columnIndex },
    stats,
  } = currentPlayer ?? { location: {} };
  const { map, npcs, locationToPlayerMap, mapDisplayRange } = useMap();
  usePlayerNavigationEffect();
  useNpcMovementEffect(map);
  const [isLocationCaptionModalOpen, setLocationCaptionModalOpen] = useState(
    false
  );
  const [isSaveCaptionModalOpen, setSaveCaptionModalOpen] = useState(false);

  useEffect(() => {
    setSaveCaptionModalOpen(false);
    if (mapName) {
      if (isField(mapName)) {
        playSound(Sound.FieldMusic);
        setLocationCaptionModalOpen(false);
      } else if (isTown(mapName)) {
        playSound(Sound.TownMusic);
        setLocationCaptionModalOpen(true);
      } else {
        playSound(Sound.CaveMusic);
        setLocationCaptionModalOpen(true);
      }
    }
    const timeout = setTimeout(() => {
      setLocationCaptionModalOpen(false);
      setSaveCaptionModalOpen(true);
    }, 3000);
    const timeout2 = setTimeout(() => {
      setSaveCaptionModalOpen(false);
    }, 6000);
    return () => {
      clearTimeout(timeout);
      clearTimeout(timeout2);
    };
  }, [mapName, playSound]);

  useEffect(() => {
    closeModal(ModalEnum.PlayerStats);
    const timer = setTimeout(
      () => openModal(ModalEnum.PlayerStats),
      SHOW_PLAYER_STATS_DELAY
    );
    return () => clearTimeout(timer);
  }, [rowIndex, columnIndex, closeModal, openModal]);

  const {
    closePlayerStats,
    closeFieldMenu,
    closeDialog,
    closeShopModal,
  } = useMemo(
    () => ({
      closePlayerStats: () => closeModal(ModalEnum.PlayerStats),
      closeFieldMenu: () => closeModal(ModalEnum.FieldMenu),
      closeDialog: () => closeModal(ModalEnum.Dialog),
      closeShopModal: () => closeModal(ModalEnum.Shop),
    }),
    [closeModal]
  );

  const isPlayerStatsOpen = isModalOpen(ModalEnum.PlayerStats);
  const isFieldMenuOpen = isModalOpen(ModalEnum.FieldMenu);
  const isDialogOpen = isModalOpen(ModalEnum.Dialog);
  const isShopModalOpen = isModalOpen(ModalEnum.Shop);

  return (
    (locationToPlayerMap &&
      mapDisplayRange &&
      currentPlayer &&
      mapName &&
      stats && (
        <Box
          backgroundColor={TileColors.Water}
          height="62.5rem"
          maxHeight="62.5rem"
          width="62.5rem"
          maxWidth="62.5rem"
        >
          {map?.layout
            .slice(
              mapDisplayRange.rowStartIndex,
              mapDisplayRange.rowEndIndex + 1
            )
            .map((rowSymbols: string[], rowIndexOffset: number) => (
              <TileRow
                key={`tileRow-${
                  mapDisplayRange.rowStartIndex + rowIndexOffset
                }`}
                rowSymbols={rowSymbols}
                rowIndex={mapDisplayRange.rowStartIndex + rowIndexOffset}
                locationToPlayerMap={locationToPlayerMap}
                mapDisplayRange={mapDisplayRange}
                mapLayout={map.layout}
                currentPlayer={currentPlayer}
                npcs={npcs}
              />
            ))}
          <PlayerStatsModal
            isOpen={isPlayerStatsOpen}
            onClose={closePlayerStats}
            stats={stats}
          />
          <FieldMenu
            showFieldMenu={isFieldMenuOpen}
            closeFieldMenu={closeFieldMenu}
            currentPlayer={currentPlayer}
            castSpell={castSpell}
          />
          <DialogModal
            showDialog={isDialogOpen}
            closeDialog={closeDialog}
            getDialog={getModalContent}
          />
          <ShopModal
            currentPlayer={currentPlayer}
            showDialog={isShopModalOpen}
            closeShop={closeShopModal}
            getDialog={getModalContent}
          />
          <CaptionModal message={mapName} isOpen={isLocationCaptionModalOpen} />
          {isTown(mapName) && (
            <CaptionModal
              message={
                <>
                  <Text>HP/MP restored</Text>
                  <Text>Game saved</Text>
                </>
              }
              isOpen={isSaveCaptionModalOpen}
            />
          )}
        </Box>
      )) ??
    null
  );
};

export default World;

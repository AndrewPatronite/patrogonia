import React, { useEffect, useState } from 'react'
import TileRow from './TileRow'
import { getLocationToPlayerMap, getMapDisplayRange } from './helper'
import { Sound } from '../sound'
import PlayerStatsModal from '../../player/PlayerStatsModal'
import FieldMenu from '../../player/FieldMenu'
import { Maps } from '../maps/Maps'
import {
  useMap,
  useModalState,
  useNpcMovementEffect,
  useSound,
} from '../../hooks'
import DialogModal from '../../dialog/DialogModal'
import { usePlayerNavigationEffect } from '../../navigation'
import { Box, Text } from '@chakra-ui/react'
import { CaptionModal } from '../../components'
import { ModalEnum } from '../../context'
import { Player } from '../../player'

const SHOW_PLAYER_STATS_DELAY = 5000

const World = ({
  currentPlayer,
  castSpell,
}: {
  currentPlayer: Player
  castSpell: (spellName: string, targetId: string) => void
}) => {
  const { playSound } = useSound()
  const {
    closeModal,
    getModalContent,
    isModalOpen,
    openModal,
  } = useModalState()
  const {
    location: { mapName, rowIndex, columnIndex },
    stats,
  } = currentPlayer
  const { map, players, npcs } = useMap()
  usePlayerNavigationEffect()
  useNpcMovementEffect(map)
  const [isLocationCaptionModalOpen, setLocationCaptionModalOpen] = useState(
    false
  )
  const [isSaveCaptionModalOpen, setSaveCaptionModalOpen] = useState(false)

  useEffect(() => {
    setSaveCaptionModalOpen(false)
    if (Maps.isField(mapName)) {
      playSound(Sound.FieldMusic, [Sound.CaveMusic, Sound.TownMusic])
      setLocationCaptionModalOpen(false)
    } else if (Maps.isTown(mapName)) {
      playSound(Sound.TownMusic, [Sound.CaveMusic, Sound.FieldMusic])
      setLocationCaptionModalOpen(true)
    } else {
      playSound(Sound.CaveMusic, [Sound.FieldMusic, Sound.TownMusic])
      setLocationCaptionModalOpen(true)
    }
    const timeout = setTimeout(() => {
      setLocationCaptionModalOpen(false)
      setSaveCaptionModalOpen(true)
    }, 3000)
    const timeout2 = setTimeout(() => {
      setSaveCaptionModalOpen(false)
    }, 6000)
    return () => {
      clearTimeout(timeout)
      clearTimeout(timeout2)
    }
  }, [mapName, playSound])

  useEffect(() => {
    closeModal(ModalEnum.PlayerStats)
    const timer = setTimeout(
      () => openModal(ModalEnum.PlayerStats),
      SHOW_PLAYER_STATS_DELAY
    )
    return () => clearTimeout(timer)
  }, [rowIndex, columnIndex, closeModal, openModal])

  const locationToPlayersMap = getLocationToPlayerMap(players, currentPlayer)
  const displayIndexRange = getMapDisplayRange(currentPlayer, map)
  const isPlayerStatsOpen = isModalOpen(ModalEnum.PlayerStats)
  const isFieldMenuOpen = isModalOpen(ModalEnum.FieldMenu)
  const isDialogOpen = isModalOpen(ModalEnum.Dialog)
  const isTutorialOpen = isModalOpen(ModalEnum.Tutorial)

  return (
    <Box
      backgroundColor="#0055d4"
      height="62.5rem"
      maxHeight="62.5rem"
      width="62.5rem"
      maxWidth="62.5rem"
    >
      {displayIndexRange &&
        map?.layout
          .slice(
            displayIndexRange.rowStartIndex,
            displayIndexRange.rowEndIndex + 1
          )
          .map((rowSymbols: string[], rowIndexOffset: number) => (
            <TileRow
              key={`tileRow-${
                displayIndexRange.rowStartIndex + rowIndexOffset
              }`}
              rowSymbols={rowSymbols}
              rowIndex={displayIndexRange.rowStartIndex + rowIndexOffset}
              locationToPlayersMap={locationToPlayersMap}
              displayIndexRange={displayIndexRange}
              mapLayout={map.layout}
              currentPlayer={currentPlayer}
              npcs={npcs}
            />
          ))}
      <PlayerStatsModal
        isOpen={
          isPlayerStatsOpen &&
          !isFieldMenuOpen &&
          !isDialogOpen &&
          !isTutorialOpen
        }
        onClose={() => closeModal(ModalEnum.PlayerStats)}
        stats={stats}
      />
      <FieldMenu
        showFieldMenu={isFieldMenuOpen && !isDialogOpen}
        closeFieldMenu={() => closeModal(ModalEnum.FieldMenu)}
        currentPlayer={currentPlayer}
        castSpell={castSpell}
      />
      <DialogModal
        showDialog={isDialogOpen}
        closeDialog={() => closeModal(ModalEnum.Dialog)}
        getDialog={() => getModalContent(ModalEnum.Dialog)}
      />
      <CaptionModal message={mapName} isOpen={isLocationCaptionModalOpen} />
      {Maps.isTown(mapName) && (
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
  )
}

export default World

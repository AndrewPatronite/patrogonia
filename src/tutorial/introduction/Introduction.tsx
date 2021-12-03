import React, { useState } from 'react'

import Description from './Description'
import TeamUp from './TeamUp'
import CampingPlayer from './CampingPlayer'
import Welcome from './Welcome'
import PopIn from './PopIn'
import Player from '../../player/Player'
import { LessonEnum, recordLesson } from '../index'
import { Button, Flex, Stack } from '@chakra-ui/react'

interface IntroductionProps {
  currentPlayer?: Player
  updatePlayer?: (
    player: Player,
    saveGame?: boolean,
    updateToServer?: boolean
  ) => void
  isCompact?: boolean
}

const Introduction = ({
  currentPlayer,
  updatePlayer,
  isCompact = false,
}: IntroductionProps) => {
  const [introductionPanelIndex, setIntroductionPanelIndex] = useState(0)

  const introductionPanels = [
    Welcome,
    Description,
    TeamUp,
    CampingPlayer,
    PopIn,
  ].slice(isCompact ? 1 : 0)
  const IntroductionPanel = introductionPanels[introductionPanelIndex]

  const handlePreviousClick = () =>
    setIntroductionPanelIndex((previousIndex) => Math.max(previousIndex - 1, 0))

  const handleNextClick = () => {
    setIntroductionPanelIndex((previousIndex) => {
      if (previousIndex < introductionPanels.length - 1) {
        return previousIndex + 1
      } else {
        if (currentPlayer && updatePlayer) {
          recordLesson(currentPlayer, LessonEnum.Introduction, updatePlayer)
        }
        return isCompact ? 0 : previousIndex
      }
    })
  }

  return (
    <Stack spacing="2rem">
      <IntroductionPanel currentPlayer={currentPlayer} isCompact={isCompact} />
      <Flex justifyContent="flex-end">
        {introductionPanelIndex > 0 && (
          <Button
            size="sm"
            colorScheme="blue"
            marginRight="0.5rem"
            variant="outline"
            onClick={handlePreviousClick}
          >
            Previous
          </Button>
        )}
        <Button size="sm" colorScheme="blue" onClick={handleNextClick}>
          {introductionPanelIndex >= introductionPanels.length ? 'OK' : 'Next'}
        </Button>
      </Flex>
    </Stack>
  )
}

export default Introduction

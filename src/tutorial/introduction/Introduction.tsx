import React, { useCallback, useEffect, useState } from 'react'

import Description from './Description'
import TeamUp from './TeamUp'
import PlayerInBattle from './PlayerInBattle'
import CampingPlayer from './CampingPlayer'
import Welcome from './Welcome'
import PopIn from './PopIn'
import ReviewAgain from './ReviewAgain'
import Player from '../../player/Player'
import { recordLesson } from '../index'

interface IntroductionProps {
  currentPlayer?: Player
  updatePlayer?: (player: Player, updateToServer: boolean) => void
  isCompact?: boolean
}

const Introduction = ({
  currentPlayer,
  updatePlayer,
  isCompact = false,
}: IntroductionProps) => {
  const [dialogueIndex, setDialogueIndex] = useState(0)

  const dialoguePanes = isCompact
    ? [Description, TeamUp, PlayerInBattle, CampingPlayer]
    : [
        Welcome,
        Description,
        TeamUp,
        PlayerInBattle,
        CampingPlayer,
        PopIn,
        ReviewAgain,
      ]

  const recordLessonCallback = useCallback(
    () =>
      currentPlayer &&
      updatePlayer &&
      recordLesson(currentPlayer, Introduction.name, updatePlayer),
    [currentPlayer, updatePlayer]
  )

  useEffect(() => {
    const interval = setInterval(
      () =>
        setDialogueIndex((previousIndex) => {
          if (previousIndex < dialoguePanes.length - 1) {
            return previousIndex + 1
          } else {
            recordLessonCallback()
            return 0
          }
        }),
      isCompact ? 4000 : 10000
    )
    return () => {
      clearInterval(interval)
    }
  }, [dialoguePanes.length, recordLessonCallback, isCompact])

  const Dialogue = dialoguePanes[dialogueIndex]

  return <Dialogue currentPlayer={currentPlayer} isCompact={isCompact} />
}

export default Introduction

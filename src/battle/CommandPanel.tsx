import React from 'react'
import { filter, isEmpty, upperFirst } from 'lodash'
import OptionPanel from './OptionPanel'
import ThemedHeader from '../components/theme/ThemedHeader'
import { Stack } from '@chakra-ui/react'
import { getLesson, LessonEnum, TutorialModal } from '../tutorial'
import { Command } from './types'
import { Player, Spell } from '../player'

export interface CommandPanelProps {
  currentPlayer: Player
  handleCommand: (command: Command | Spell) => void
  mp: number
}

const CommandPanel = ({
  currentPlayer,
  handleCommand,
  mp,
}: CommandPanelProps) => {
  const options = [
    { value: Command.Attack, display: 'Attack' },
    ...(isEmpty(currentPlayer.spells)
      ? []
      : filter(
          currentPlayer.spells,
          (spell) => spell.battleSpell && spell.mpCost <= mp
        ).map((spell) => ({
          value: spell,
          display: upperFirst(spell.spellName.toLowerCase()),
        }))),
    { value: Command.Parry, display: 'Parry' },
    { value: Command.Run, display: 'Run' },
  ]

  return (
    <Stack spacing={0}>
      <ThemedHeader>Command</ThemedHeader>
      <OptionPanel
        options={options}
        onNext={handleCommand}
        isBackEnabled={false}
      />
      <TutorialModal
        player={currentPlayer}
        lesson={getLesson(LessonEnum.BattleCommandLesson)}
        lessonProps={{ options }}
      />
    </Stack>
  )
}

export default CommandPanel

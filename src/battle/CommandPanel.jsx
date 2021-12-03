import React from 'react'
import { filter, isEmpty, upperFirst } from 'lodash'
import OptionPanel from './OptionPanel'
import ThemedHeader from '../components/theme/ThemedHeader'
import { Stack } from '@chakra-ui/react'
import { getLesson, LessonEnum, TutorialModal } from '../tutorial'

const CommandPanel = ({ currentPlayer, handleCommand, mp }) => {
  const actionLabel = 'Command'
  const options = [{ value: 'attack', display: 'Attack' }]

  if (!isEmpty(currentPlayer.spells)) {
    filter(
      currentPlayer.spells,
      (spell) => spell.battleSpell && spell.mpCost <= mp
    ).map((spell) =>
      options.push({
        value: JSON.stringify(spell),
        display: upperFirst(spell.spellName.toLowerCase()),
      })
    )
  }
  options.push({ value: 'parry', display: 'Parry' })
  options.push({ value: 'run', display: 'Run' })

  return (
    <Stack spacing={0}>
      <ThemedHeader>{actionLabel}</ThemedHeader>
      <OptionPanel
        options={options}
        onNext={handleCommand}
        showBackButton={false}
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

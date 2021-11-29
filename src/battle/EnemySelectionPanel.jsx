import React, { useEffect } from 'react'
import { upperFirst } from 'lodash'
import OptionPanel from './OptionPanel'
import ThemedHeader from '../components/theme/ThemedHeader'
import {
  BattleOptionLesson as CommandLesson,
  LessonEnum,
  TutorialModal,
} from '../tutorial'
import { Stack } from '@chakra-ui/react'

const EnemySelectionPanel = ({
  currentPlayer,
  enemies,
  action,
  handleBack,
  handleNext,
  selectEnemy,
  selectedEnemyId,
  playerTurnEnabled,
}) => {
  const options = enemies.map(({ id, name }) => ({
    value: id,
    display: name,
  }))

  useEffect(() => {
    if (playerTurnEnabled && !selectedEnemyId) {
      selectEnemy(enemies[0].id)
    }
  }, [enemies, playerTurnEnabled, selectEnemy, selectedEnemyId])

  const BattleTargetLesson = () => (
    <CommandLesson options={options} subject="target" />
  )

  return (
    <Stack spacing={0}>
      <ThemedHeader>{upperFirst(action)}</ThemedHeader>
      <OptionPanel
        options={options}
        onBack={handleBack}
        onChange={selectEnemy}
        onNext={handleNext}
        showBackButton={true}
      />
      <TutorialModal
        player={currentPlayer}
        lessons={[
          {
            name: LessonEnum.BattleTargetLesson,
            component: BattleTargetLesson,
          },
        ]}
      />
    </Stack>
  )
}

export default EnemySelectionPanel

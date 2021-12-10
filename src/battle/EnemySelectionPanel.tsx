import React, { useEffect } from 'react'
import { upperFirst } from 'lodash'
import OptionPanel from './OptionPanel'
import ThemedHeader from '../components/theme/ThemedHeader'
import { getLesson, LessonEnum, TutorialModal } from '../tutorial'
import { Stack } from '@chakra-ui/react'
import { Enemy } from './types'
import { Player } from '../player'

export interface EnemySelectionPanelProps {
  currentPlayer: Player
  enemies: Enemy[]
  action: string
  handleBack: () => void
  handleNext: (selectedEnemyId: string) => void
  selectEnemy: (selectedEnemyId: string) => void
  selectedEnemyId?: string
  playerTurnEnabled: boolean
}

const EnemySelectionPanel = ({
  currentPlayer,
  enemies,
  action,
  handleBack,
  handleNext,
  selectEnemy,
  selectedEnemyId,
  playerTurnEnabled,
}: EnemySelectionPanelProps) => {
  const options = enemies.map(({ id, name }) => ({
    value: id,
    display: name,
  }))

  useEffect(() => {
    if (playerTurnEnabled && !selectedEnemyId) {
      selectEnemy(enemies[0].id)
    }
  }, [enemies, playerTurnEnabled, selectEnemy, selectedEnemyId])

  return (
    <Stack spacing={0}>
      <ThemedHeader>{upperFirst(action)}</ThemedHeader>
      <OptionPanel
        options={options}
        onBack={handleBack}
        onChange={selectEnemy}
        onNext={handleNext}
        isBackEnabled={true}
      />
      <TutorialModal
        player={currentPlayer}
        lesson={getLesson(LessonEnum.BattleTargetLesson)}
        lessonProps={{ options }}
      />
    </Stack>
  )
}

export default EnemySelectionPanel

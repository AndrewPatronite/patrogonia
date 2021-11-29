import React, { useMemo, useState } from 'react'
import { filter, upperFirst } from 'lodash'
import CommandPanel from './CommandPanel'
import EnemySelectionPanel from './EnemySelectionPanel'
import PlayerSelectionPanel from './PlayerSelectionPanel'
import { LessonEnum, recordLesson } from '../tutorial'

const PlayerTurnWizard = ({
  currentPlayer,
  players,
  enemies,
  selectEnemy,
  takeTurn,
  selectedEnemyId,
  playerTurnEnabled,
  mp,
  updatePlayer,
}) => {
  const [action, setAction] = useState('command')
  const livingEnemies = useMemo(
    () => filter(enemies, (enemy) => enemy.stats.hp > 0),
    [enemies]
  )
  const handleBack = () => {
    selectEnemy(undefined)
    setAction('command')
  }
  const handleCommand = (command) => {
    recordLesson(currentPlayer, LessonEnum.BattleCommandLesson, updatePlayer)
    switch (command) {
      case 'parry':
      case 'run':
        takeTurn(command)
        break
      case 'attack':
        if (livingEnemies.length > 1) {
          setAction(command)
        } else {
          takeTurn(command, livingEnemies[0].id)
        }
        break
      default:
        const { spellName, offensive } = JSON.parse(command)
        const formattedSpellName = upperFirst(spellName.toLowerCase())
        if (offensive) {
          if (livingEnemies.length > 1) {
            setAction(command)
          } else {
            takeTurn(formattedSpellName, livingEnemies[0].id)
          }
        } else {
          if (players.length > 1) {
            setAction(command)
          } else {
            takeTurn(formattedSpellName, currentPlayer.id)
          }
        }
    }
  }

  switch (action) {
    case 'command':
      return (
        <CommandPanel
          currentPlayer={currentPlayer}
          handleCommand={handleCommand}
          mp={mp}
        />
      )
    case 'attack':
      return (
        <EnemySelectionPanel
          currentPlayer={currentPlayer}
          enemies={livingEnemies}
          action={action}
          handleBack={handleBack}
          handleNext={(targetId) => {
            recordLesson(
              currentPlayer,
              LessonEnum.BattleTargetLesson,
              updatePlayer
            )
            takeTurn(action, targetId)
          }}
          selectEnemy={selectEnemy}
          selectedEnemyId={selectedEnemyId}
          playerTurnEnabled={playerTurnEnabled}
        />
      )
    default:
      const { spellName, offensive } = JSON.parse(action)
      const formattedSpellName = upperFirst(spellName.toLowerCase())
      return offensive ? (
        <EnemySelectionPanel
          enemies={livingEnemies}
          action={formattedSpellName}
          handleBack={handleBack}
          handleNext={(targetId) => {
            recordLesson(
              currentPlayer,
              LessonEnum.BattleTargetLesson,
              updatePlayer
            )
            takeTurn(formattedSpellName, targetId)
          }}
          selectEnemy={selectEnemy}
          selectedEnemyId={selectedEnemyId}
          playerTurnEnabled={playerTurnEnabled}
        />
      ) : (
        <PlayerSelectionPanel
          players={players}
          action={formattedSpellName}
          handleBack={handleBack}
          handleNext={(targetId) => takeTurn(formattedSpellName, targetId)}
          showBackButton={true}
        />
      )
  }
}

export default PlayerTurnWizard

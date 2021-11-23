import React from 'react'
import { has } from 'lodash'
import ThemedPanel from '../components/theme/ThemedPanel'
import { Button, Stack } from '@chakra-ui/react'
import PlayerTurnWizard from './PlayerTurnWizard'

const PlayerPanel = ({
  currentPlayer,
  playerStats: { playerId, playerName, level, hp, hpTotal, mp, mpTotal },
  players,
  battleStatusStyle,
  enemies,
  selectEnemy,
  takeTurn,
  roundPlayerActions,
  selectedEnemyId,
  playerTurnEnabled,
  loadSave,
  updatePlayer,
}) => {
  const currentPlayerTurn =
    currentPlayer.id === playerId && !has(roundPlayerActions, currentPlayer.id)
  return (
    <ThemedPanel className="player-panel" padding="1rem" sx={battleStatusStyle}>
      <Stack marginRight="2rem" spacing="1rem">
        <label>
          Player: <span>{playerName}</span>
        </label>
        <label>
          Level: <span>{level}</span>
        </label>
        <label>
          HP: <span>{`${hp}/${hpTotal}`}</span>
        </label>
        <label>
          MP: <span>{`${mp}/${mpTotal}`}</span>
        </label>
      </Stack>
      {currentPlayerTurn &&
        (hp > 0 ? (
          <PlayerTurnWizard
            currentPlayer={currentPlayer}
            players={players}
            enemies={enemies}
            selectEnemy={selectEnemy}
            takeTurn={takeTurn}
            selectedEnemyId={selectedEnemyId}
            playerTurnEnabled={playerTurnEnabled}
            mp={mp}
            updatePlayer={updatePlayer}
          />
        ) : (
          <Button
            autoFocus={true}
            colorScheme="blue"
            marginTop="1rem"
            marginRight="1rem"
            onClick={() => loadSave(playerId)}
          >
            Load save
          </Button>
        ))}
    </ThemedPanel>
  )
}

export default PlayerPanel

import React, { useEffect, useMemo, useState } from 'react'
import { filter, values } from 'lodash'
import { getBattleStatusBorder } from './helper'
import EnemyDisplay from './EnemyDisplay'
import Log from './Log'
import PlayerPanel from './PlayerPanel'
import { BattleState } from '../state/BattleState'
import { subscribe } from '../subscription/subscribe'
import { pauseSound, playSound } from '../environment/sound/sound'
import battleMusic from '../environment/sound/crusaderp/BattleNO3.mp3'
import ThemedPanel from '../components/theme/ThemedPanel'
import { Flex } from '@chakra-ui/react'

const Battle = ({
  currentPlayer,
  loadPlayer,
  updatePlayer,
  battleUrl,
  loadSave,
}) => {
  const [battleMessage, setBattleMessage] = useState({})
  useEffect(() => {
    const battleSubscription = subscribe(battleUrl, setBattleMessage)
    return () => battleSubscription.close()
  }, [battleUrl])
  useEffect(() => {
    playSound('battle-music')
  }, [])
  const [battle, takeTurn, dismissBattle] = BattleState(
    currentPlayer,
    updatePlayer,
    loadPlayer,
    battleMessage,
    setBattleMessage
  )
  const {
    location: { mapName },
  } = currentPlayer
  const { enemies, log, playerStats, roundPlayerActions, status } = battle
  const [selectedEnemyId, selectEnemy] = useState()
  const [playerTurnEnabled, setPlayerTurnEnabled] = useState(true)
  const players = values(playerStats)
  const battleStatusStyle = getBattleStatusBorder(players)
  const battleEnded = ['VICTORY', 'DEFEAT'].includes(status)
  //TODO clean this up after breaking battleMessage up into smaller pieces
  const deliveredLogEntries = useMemo(
    () => filter(log, (entry) => entry.delivered),
    [log]
  )
  const allMessagesDelivered = log.length === deliveredLogEntries.length

  useEffect(() => {
    if (allMessagesDelivered) {
      if (battleEnded) {
        pauseSound('battle-music')
      } else {
        setPlayerTurnEnabled(true)
      }
    }
  }, [allMessagesDelivered, battleEnded])

  return (
    <ThemedPanel
      flexDirection="column"
      padding="0"
      height="62.5rem"
      maxHeight="62.5rem"
      width="62.5rem"
      maxWidth="62.5rem"
      sx={battleStatusStyle}
    >
      <audio className="battle-music" autoPlay loop>
        <source src={battleMusic} />
      </audio>
      <EnemyDisplay
        mapName={mapName}
        enemies={enemies}
        selectedEnemyId={selectedEnemyId}
        deliveredLogEntries={deliveredLogEntries}
      />
      <Log
        deliveredEntries={deliveredLogEntries}
        onDismiss={() => dismissBattle(battle)}
        showDismiss={battleEnded}
        battleStatusStyle={battleStatusStyle}
        allMessagesDelivered={allMessagesDelivered}
      />
      {!battleEnded && playerTurnEnabled && (
        <Flex flex="1 1 auto" maxHeight="14.75rem" margin="0 1px 1px 1px">
          {players.map((playerStat) => (
            <PlayerPanel
              key={playerStat.playerId}
              currentPlayer={currentPlayer}
              playerStats={playerStat}
              players={players}
              battleStatusStyle={battleStatusStyle}
              enemies={enemies}
              selectEnemy={(enemyId) => selectEnemy(enemyId)}
              takeTurn={(action, targetId) => {
                takeTurn(action, targetId)
                setPlayerTurnEnabled(false)
                selectEnemy(undefined)
              }}
              roundPlayerActions={roundPlayerActions}
              selectedEnemyId={selectedEnemyId}
              playerTurnEnabled={playerTurnEnabled}
              loadSave={loadSave}
              updatePlayer={updatePlayer}
            />
          ))}
        </Flex>
      )}
    </ThemedPanel>
  )
}

export default Battle

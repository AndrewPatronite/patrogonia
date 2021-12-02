import React, { useEffect, useMemo, useState } from 'react'
import { filter, values } from 'lodash'
import { getBattleStatusBorder } from './helper'
import EnemyDisplay from './EnemyDisplay'
import Log from './Log'
import PlayerPanel from './PlayerPanel'
import { pauseSound, playSound } from '../environment/sound/sound'
import ThemedPanel from '../components/theme/ThemedPanel'
import { Flex } from '@chakra-ui/react'
import { useBattle, usePlayer } from '../hooks'
import { BattleMusic } from '../environment/sound'
import { isBattleEnded } from './types'

const Battle = () => {
  const { currentPlayer, loadSave, updatePlayer } = usePlayer()
  const { battle, dismissBattle, takeTurn } = useBattle()
  const { enemies, log, playerStats, roundPlayerActions, status } = battle || {}

  useEffect(() => {
    playSound('battle-music')
  }, [])
  const {
    location: { mapName },
  } = currentPlayer
  const [selectedEnemyId, selectEnemy] = useState<string>()
  const [playerTurnEnabled, setPlayerTurnEnabled] = useState(true)
  const players = values(playerStats)
  const battleStatusStyle = getBattleStatusBorder(players)
  const battleEnded = !!status && isBattleEnded(status)
  //TODO AP clean this up after breaking battleMessage up into smaller pieces
  const deliveredLogEntries = useMemo(
    () => filter(log, (entry) => entry.delivered),
    [log]
  )
  const allMessagesDelivered = log?.length === deliveredLogEntries.length

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
        <source src={BattleMusic} />
      </audio>
      <EnemyDisplay
        mapName={mapName}
        enemies={enemies}
        selectedEnemyId={selectedEnemyId}
        deliveredLogEntries={deliveredLogEntries}
      />
      <Log
        deliveredEntries={deliveredLogEntries}
        onDismiss={() => battle && dismissBattle(battle)}
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
              selectEnemy={(enemyId: string) => selectEnemy(enemyId)}
              takeTurn={(action: string, targetId: string) => {
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

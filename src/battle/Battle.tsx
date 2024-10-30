import React, { useEffect, useMemo, useState } from 'react';
import filter from 'lodash/filter';
import values from 'lodash/values';
import { getBattleStatusStyle } from './helper';
import Log from './Log';
import PlayerPanel from './PlayerPanel';
import ThemedPanel from '../components/theme/ThemedPanel';
import { Flex } from '@chakra-ui/react';
import { usePlayer, useSound } from '../hooks';
import { isBattleEnded } from './types';
import EnemyDisplay from './EnemyDisplay';
import { Sound } from '../environment/sound';
import useRoutingEffect from '../app/useRoutingEffect';
import { useBattle } from './useBattle';

const Battle = () => {
  const { currentPlayer, loadSave, updatePlayer } = usePlayer();

  useRoutingEffect(currentPlayer);

  const { playSound, pauseSound } = useSound();
  const { battle, dismissBattle, takeTurn } = useBattle();
  const { enemies = [], log, playerStats, roundPlayerActions = {}, status } =
    battle || {};
  const mapName = currentPlayer?.location.mapName;
  const [selectedEnemyId, selectEnemy] = useState<string>();
  const [playerTurnEnabled, setPlayerTurnEnabled] = useState<boolean>(true);
  const players = values(playerStats);
  const battleStatusStyle = getBattleStatusStyle(players);
  const battleEnded = !!status && isBattleEnded(status);

  //TODO AP clean this up after breaking battleMessage up into smaller pieces
  const { deliveredLogEntries, allMessagesDelivered } = useMemo(() => {
    const deliveredLogEntries = filter(log, (entry) => entry.delivered);
    const allMessagesDelivered = log?.length === deliveredLogEntries.length;
    return { deliveredLogEntries, allMessagesDelivered };
  }, [log]);

  useEffect(() => {
    playSound(Sound.BattleMusic);
  }, [playSound]);

  useEffect(() => {
    if (allMessagesDelivered) {
      if (battleEnded) {
        pauseSound(Sound.BattleMusic);
      } else {
        setPlayerTurnEnabled(true);
      }
    }
  }, [
    deliveredLogEntries.length,
    allMessagesDelivered,
    battleEnded,
    pauseSound,
  ]);

  return battle && mapName ? (
    <ThemedPanel
      flexDirection="column"
      padding="0"
      height="62.5rem"
      maxHeight="62.5rem"
      width="62.5rem"
      maxWidth="62.5rem"
      sx={battleStatusStyle}
    >
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
      {!battleEnded && playerTurnEnabled && currentPlayer && (
        <Flex flex="1 1 auto" maxHeight="14.75rem" margin="0 1px 1px 1px">
          {players.map((playerStat) => (
            <PlayerPanel
              key={playerStat.playerId}
              currentPlayer={currentPlayer}
              playerStats={playerStat}
              players={players}
              battleStatusStyle={battleStatusStyle}
              enemies={enemies}
              selectEnemy={selectEnemy}
              takeTurn={(action: string, targetId?: string | number) => {
                setPlayerTurnEnabled(false);
                takeTurn(action, targetId);
                selectEnemy(undefined);
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
  ) : null;
};

export default Battle;

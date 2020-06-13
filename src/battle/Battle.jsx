import React, { useEffect, useMemo, useState } from 'react';
import { filter, values } from 'lodash';
import './Battle.css';
import { getBattleStatusClass } from './helper/getBattleStatusClass';
import EnemyDisplay from './EnemyDisplay';
import Log from './Log';
import PlayerPanel from './PlayerPanel';
import { BattleState } from '../state/BattleState';
import { subscribe } from '../subscription/subscribe';
import { playSound, pauseSound } from '../environment/sound/sound';
import battleMusic from '../environment/sound/crusaderp/BattleNO3.mp3';

const Battle = ({
    currentPlayer,
    loadPlayer,
    updatePlayer,
    battleUrl,
    loadSave,
}) => {
    const [battleMessage, setBattleMessage] = useState({});
    useEffect(() => {
        const battleSubscription = subscribe(battleUrl, setBattleMessage);
        return () => battleSubscription.close();
    }, [battleUrl]);
    useEffect(() => {
        playSound('battle-music');
    }, []);
    const [battle, takeTurn, dismissBattle] = BattleState(
        currentPlayer,
        updatePlayer,
        loadPlayer,
        battleMessage,
        setBattleMessage
    );
    const {
        location: { mapName },
    } = currentPlayer;
    const { enemies, log, playerStats, roundPlayerActions, status } = battle;
    const [selectedEnemyId, selectEnemy] = useState();
    const [playerTurnEnabled, setPlayerTurnEnabled] = useState(true);
    const players = values(playerStats);
    const battleStatusClass = getBattleStatusClass(players);
    const battleEnded = ['VICTORY', 'DEFEAT'].includes(status);
    //TODO clean this up after breaking battleMessage up into smaller pieces
    const deliveredLogEntries = useMemo(
        () => filter(log, (entry) => entry.delivered),
        [log]
    );
    const allMessagesDelivered = log.length === deliveredLogEntries.length;

    useEffect(() => {
        if (allMessagesDelivered) {
            if (battleEnded) {
                pauseSound('battle-music');
            } else {
                setPlayerTurnEnabled(true);
            }
        }
    }, [allMessagesDelivered, battleEnded]);

    return (
        <div className={`battle ${battleStatusClass}`}>
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
                statusClass={battleStatusClass}
                allMessagesDelivered={allMessagesDelivered}
            />
            {!battleEnded && playerTurnEnabled && (
                <div className="players">
                    {players.map((playerStat) => (
                        <PlayerPanel
                            key={playerStat.playerId}
                            currentPlayer={currentPlayer}
                            playerStats={playerStat}
                            players={players}
                            battleStatusClass={battleStatusClass}
                            enemies={enemies}
                            selectEnemy={(enemyId) => selectEnemy(enemyId)}
                            takeTurn={(action, targetId) => {
                                takeTurn(action, targetId);
                                setPlayerTurnEnabled(false);
                                selectEnemy(undefined);
                            }}
                            roundPlayerActions={roundPlayerActions}
                            selectedEnemyId={selectedEnemyId}
                            playerTurnEnabled={playerTurnEnabled}
                            loadSave={loadSave}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Battle;

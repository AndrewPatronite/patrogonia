import React from 'react';
import { has } from 'lodash';
import PlayerTurnWizard from './PlayerTurnWizard';
import './PlayerPanel.css'

const PlayerPanel = ({
    currentPlayer,
    playerStats: { playerId, playerName, level, hp, hpTotal, mp, mpTotal },
    players,
    battleStatusClass,
    enemies,
    selectEnemy,
    takeTurn,
    roundPlayerActions,
    selectedEnemyId,
    playerTurnEnabled,
    loadSave,
}) => {
    const currentPlayerTurn =
        currentPlayer.id === playerId &&
        !has(roundPlayerActions, currentPlayer.id);
    return (
        <div className={`player-panel ${battleStatusClass}`}>
            <div className="player-stats">
                <label>{playerName}</label>
                <label>{`Level: ${level}`}</label>
                <label>{`HP: ${hp}/${hpTotal}`}</label>
                <label>{`MP: ${mp}/${mpTotal}`}</label>
            </div>
            {currentPlayerTurn && (hp > 0 ? (
                <PlayerTurnWizard
                    currentPlayer={currentPlayer}
                    players={players}
                    enemies={enemies}
                    selectEnemy={selectEnemy}
                    takeTurn={takeTurn}
                    selectedEnemyId={selectedEnemyId}
                    playerTurnEnabled={playerTurnEnabled}
                    mp={mp}
                />
            ) : (
                <button className="load-save" autoFocus={true} onClick={() => loadSave(playerId)}>
                    Load save
                </button>
            ))}
        </div>
    );
};

export default PlayerPanel;

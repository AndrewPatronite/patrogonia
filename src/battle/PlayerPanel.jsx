import React, { useContext } from 'react';
import { has } from 'lodash';
import PlayerTurnWizard from './PlayerTurnWizard';
import styled from 'styled-components';
import ThemedPanel from '../components/theme/ThemedPanel';
import './PlayerPanel.css'

const PlayerStats = styled.div`
    display: flex;
    flex-direction: column;
    margin-right: 30px;
    max-height: 90px;

    label {
        margin-bottom: 5px;
    }
`;

const LoadSaveButton = styled.button`
    margin-top: 10px;
    height: 35px;
`;

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
        <ThemedPanel
            className={`player-panel ${battleStatusClass}`}
            padding="5px"
        >
            <PlayerStats className="player-stats">
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
            </PlayerStats>
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
                    />
                ) : (
                    <LoadSaveButton
                        className="load-save"
                        autoFocus={true}
                        onClick={() => loadSave(playerId)}
                    >
                        Load save
                    </LoadSaveButton>
                ))}
        </ThemedPanel>
    );
};

export default PlayerPanel;

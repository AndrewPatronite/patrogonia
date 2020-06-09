import React, { useState } from 'react';
import CommandPanel from './CommandPanel';
import EnemySelectionPanel from './EnemySelectionPanel';
import PlayerSelectionPanel from './PlayerSelectionPanel';

const PlayerTurnWizard = ({
    currentPlayer,
    players,
    enemies,
    selectEnemy,
    takeTurn,
    selectedEnemyId,
    playerTurnEnabled,
}) => {
    const [action, setAction] = useState('command');
    const handleBack = () => setAction('command');
    const handleCommand = (command) =>
        ['parry', 'run'].includes(command)
            ? takeTurn(command)
            : setAction(command);
    const submitTurn = (targetId) => takeTurn(action, targetId);

    switch (action) {
        case 'command':
            return (
                <CommandPanel
                    currentPlayer={currentPlayer}
                    handleCommand={handleCommand}
                />
            );
        case 'attack':
            return (
                <EnemySelectionPanel
                    enemies={enemies}
                    action={action}
                    handleBack={handleBack}
                    handleNext={submitTurn}
                    selectEnemy={selectEnemy}
                    selectedEnemyId={selectedEnemyId}
                    playerTurnEnabled={playerTurnEnabled}
                />
            );
        default:
            const { spellName, offensive } = action;
            if (offensive) {
                return (
                    <EnemySelectionPanel
                        enemies={enemies}
                        action={spellName}
                        handleBack={handleBack}
                        handleNext={submitTurn}
                        selectedEnemyId={selectedEnemyId}
                        playerTurnEnabled={playerTurnEnabled}
                    />
                );
            } else {
                return (
                    <PlayerSelectionPanel
                        players={players}
                        action={spellName}
                        handleBack={handleBack}
                        handleNext={submitTurn}
                        showBackButton={true}
                    />
                );
            }
    }
};

export default PlayerTurnWizard;

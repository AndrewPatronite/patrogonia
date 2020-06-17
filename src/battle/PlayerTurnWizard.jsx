import React, {useState} from 'react';
import {upperFirst} from 'lodash';
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
    mp,
}) => {
    const [action, setAction] = useState('command');
    const handleBack = () => {
        selectEnemy(undefined);
        setAction('command');
    };
    const handleCommand = (command) => {
        switch (command) {
            case 'parry':
            case 'run':
                takeTurn(command);
                break;
            case 'attack':
                setAction(command);
                break;
            default:
                const { spellName, offensive } = JSON.parse(command);
                const formattedSpellName = upperFirst(spellName.toLowerCase());
                if (offensive) {
                    if (enemies.length > 1) {
                        setAction(command);
                    } else {
                        takeTurn(formattedSpellName, selectedEnemyId);
                    }
                } else {
                    if (players.length > 1) {
                        setAction(command);
                    } else {
                        takeTurn(formattedSpellName, currentPlayer.id);
                    }
                }
        }
    };
    switch (action) {
        case 'command':
            return (
                <CommandPanel
                    currentPlayer={currentPlayer}
                    handleCommand={handleCommand}
                    mp={mp}
                />
            );
        case 'attack':
            return (
                <EnemySelectionPanel
                    enemies={enemies}
                    action={action}
                    handleBack={handleBack}
                    handleNext={(targetId) => takeTurn(action, targetId)}
                    selectEnemy={selectEnemy}
                    selectedEnemyId={selectedEnemyId}
                    playerTurnEnabled={playerTurnEnabled}
                />
            );
        default:
            const { spellName, offensive } = JSON.parse(action);
            const formattedSpellName = upperFirst(spellName.toLowerCase());
            return offensive ? (
                <EnemySelectionPanel
                    enemies={enemies}
                    action={formattedSpellName}
                    handleBack={handleBack}
                    handleNext={(targetId) => takeTurn(formattedSpellName, targetId)}
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
            );
    }
};

export default PlayerTurnWizard;

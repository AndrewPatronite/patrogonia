import React, { useEffect } from 'react';
import { upperFirst } from 'lodash';
import OptionPanel from './OptionPanel';

const EnemySelectionPanel = ({
    enemies,
    action,
    handleBack,
    handleNext,
    selectEnemy,
    selectedEnemyId,
    playerTurnEnabled,
}) => {
    const options = enemies.map(({ id, name }) => ({
        value: id,
        display: name,
    }));

    useEffect(() => {
        if (playerTurnEnabled && !selectedEnemyId) {
            selectEnemy(enemies[0].id);
        }
    }, [enemies, playerTurnEnabled, selectEnemy, selectedEnemyId]);

    return (
        <div className="action-options">
            <label>{upperFirst(action)}</label>
            <OptionPanel
                options={options}
                onBack={handleBack}
                onChange={selectEnemy}
                onNext={handleNext}
                showBackButton={true}
            />
        </div>
    );
};

export default EnemySelectionPanel;

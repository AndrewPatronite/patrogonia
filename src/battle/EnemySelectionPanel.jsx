import React, { useEffect, useMemo } from 'react';
import { filter, upperFirst } from 'lodash';
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
    const livingEnemies = useMemo(
        () => filter(enemies, (enemy) => enemy.stats.hp > 0),
        [enemies]
    );
    const options = livingEnemies.map(({ id, name }) => ({
        value: id,
        display: name,
    }));

    useEffect(() => {
        if (playerTurnEnabled && !selectedEnemyId) {
            selectEnemy(livingEnemies[0].id);
        }
    }, [livingEnemies, playerTurnEnabled, selectEnemy, selectedEnemyId]);

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

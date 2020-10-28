import React, { useContext, useEffect } from 'react';
import { upperFirst } from 'lodash';
import OptionPanel from './OptionPanel';
import ThemedHeader from '../components/theme/ThemedHeader';
import { ThemeContext } from '../components/theme/ThemeContext';

const EnemySelectionPanel = ({
    enemies,
    action,
    handleBack,
    handleNext,
    selectEnemy,
    selectedEnemyId,
    playerTurnEnabled,
}) => {
    const { theme } = useContext(ThemeContext);
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
            <ThemedHeader theme={theme}>{upperFirst(action)}</ThemedHeader>
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

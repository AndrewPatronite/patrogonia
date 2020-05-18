import React from 'react';
import { upperFirst } from 'lodash';
import OptionPanel from './OptionPanel';

const CommandPanel = ({
    currentPlayer,
    handleBack,
    handleNext,
    showBackButton,
}) => {
    const actionLabel = 'Command';
    const options = [{ value: 'attack', display: 'Attack' }];
    if (currentPlayer.spells) {
        currentPlayer.spells.map((spell) =>
            options.push({ value: spell, display: upperFirst(spell.spellName) })
        );
    }
    options.push({ value: 'parry', display: 'Parry' });
    options.push({ value: 'run', display: 'Run' });
    return (
        <div className="action-options">
            <label>{actionLabel}</label>
            <OptionPanel
                options={options}
                onBack={handleBack}
                onNext={handleNext}
                showBackButton={showBackButton}
            />
        </div>
    );
};

export default CommandPanel;

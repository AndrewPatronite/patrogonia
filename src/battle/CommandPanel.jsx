import React from 'react';
import { upperFirst } from 'lodash';
import OptionPanel from './OptionPanel';

const CommandPanel = ({
    currentPlayer,
    handleCommand,
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
                onNext={handleCommand}
                showBackButton={false}
            />
        </div>
    );
};

export default CommandPanel;

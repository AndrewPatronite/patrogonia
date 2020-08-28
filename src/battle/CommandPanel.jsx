import React from 'react';
import { filter, isEmpty, upperFirst } from 'lodash';
import OptionPanel from './OptionPanel';

const CommandPanel = ({ currentPlayer, handleCommand, mp }) => {
    const actionLabel = 'Command';
    const options = [{ value: 'attack', display: 'Attack' }];
    if (!isEmpty(currentPlayer.spells)) {
        filter(
            currentPlayer.spells,
            (spell) => spell.battleSpell && spell.mpCost <= mp
        ).map((spell) =>
            options.push({
                value: JSON.stringify(spell),
                display: upperFirst(spell.spellName.toLowerCase()),
            })
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

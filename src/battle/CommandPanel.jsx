import React, { useContext } from 'react';
import { filter, isEmpty, upperFirst } from 'lodash';
import OptionPanel from './OptionPanel';
import ThemedHeader from '../components/theme/ThemedHeader';
import { ThemeContext } from '../components/theme/ThemeContext';

const CommandPanel = ({ currentPlayer, handleCommand, mp }) => {
    const { theme } = useContext(ThemeContext);
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
            <ThemedHeader theme={theme}>{actionLabel}</ThemedHeader>
            <OptionPanel
                options={options}
                onNext={handleCommand}
                showBackButton={false}
            />
        </div>
    );
};

export default CommandPanel;

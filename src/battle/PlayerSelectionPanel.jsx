import React from 'react';
import { upperFirst } from 'lodash';
import OptionPanel from './OptionPanel';

const PlayerSelectionPanel = ({
    players,
    action,
    handleBack,
    handleNext,
    showBackButton,
}) => {
    const options = players.map(({ playerId, playerName }) => ({
        value: playerId,
        display: playerName,
    }));
    return (
        <div className="action-options">
            <label>{upperFirst(action)}</label>
            <OptionPanel
                options={options}
                onBack={handleBack}
                onNext={handleNext}
                showBackButton={showBackButton}
            />
        </div>
    );
};

export default PlayerSelectionPanel;

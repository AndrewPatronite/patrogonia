import React from 'react';
import { upperFirst } from 'lodash';
import OptionPanel from './OptionPanel';
import ThemedHeader from '../components/theme/ThemedHeader';

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
      <ThemedHeader>{upperFirst(action)}</ThemedHeader>
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

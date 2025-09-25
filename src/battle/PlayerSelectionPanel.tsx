import React from 'react';
import { OptionPanel } from '../control';
import ThemedHeader from '../components/theme/ThemedHeader';
import { Stack } from '@chakra-ui/react';
import { Stats } from '../player';

export interface PlayerSelectionPanelProps {
  players: Stats[];
  action: string;
  handleBack: () => void;
  handleNext: (playerId: number) => void;
  isBackEnabled: boolean;
}

const PlayerSelectionPanel = ({
  players,
  action,
  handleBack,
  handleNext,
  isBackEnabled,
}: PlayerSelectionPanelProps) => {
  const options = players.map(({ playerId, playerName }) => ({
    value: playerId,
    display: playerName,
  }));

  return (
    <Stack spacing={0}>
      <ThemedHeader>{action}</ThemedHeader>
      <OptionPanel
        options={options}
        onBack={handleBack}
        onNext={handleNext}
        isBackEnabled={isBackEnabled}
      />
    </Stack>
  );
};

export default PlayerSelectionPanel;

import React from 'react';
import ThemedPanel from '../components/theme/ThemedPanel';
import { ColorModeToggle } from '../components/theme';
import { Button, Stack } from '@chakra-ui/react';
import InstructionsModal from '../tutorial/InstructionsModal';

const PlayerOptions = () => {
  const logOut = () => {
    const currentPlayerKey = 'currentPlayer';
    const currentPlayer = JSON.parse(
      localStorage.getItem(currentPlayerKey) || ''
    );
    currentPlayer.loggedIn = false;
    localStorage.setItem(currentPlayerKey, JSON.stringify(currentPlayer));
    window.location.href = '/login';
  };

  return (
    <ThemedPanel flexDirection="column" includeBorder={false}>
      <Stack spacing="1.5rem">
        <ColorModeToggle />
        <InstructionsModal />
        <Button variant="link" marginTop="1rem" onClick={logOut}>
          Log out
        </Button>
      </Stack>
    </ThemedPanel>
  );
};

export default PlayerOptions;

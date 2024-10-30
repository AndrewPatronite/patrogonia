import React from 'react';
import { FaDragon } from 'react-icons/fa';
import { ColorModeToggle } from '../components/theme';
import ThemedPanel from '../components/theme/ThemedPanel';
import { Credits } from '../credits';
import { Heading, Text, useColorMode, VStack } from '@chakra-ui/react';
import { HeadingColor } from '../theme';
import AccountSelector from './AccountSelector';
import { InstructionsModal } from '../tutorial';
import { usePlayer } from '../hooks';
import useRoutingEffect from '../app/useRoutingEffect';

const LandingPage = () => {
  const { currentPlayer, createAccount, login } = usePlayer();

  useRoutingEffect(currentPlayer);

  const { colorMode } = useColorMode();
  const lastUpdate = new Date(
    `${process.env.NEXT_PUBLIC_BUILD_DATE}`
  ).toLocaleString();

  return (
    <ThemedPanel
      flexDirection="column"
      alignItems="center"
      justifyContent="space-around"
      height="62.5rem"
      maxHeight="62.5rem"
      width="62.5rem"
      maxWidth="62.5rem"
      includeBorder={false}
    >
      <Heading as="h1" size="2xl" color={HeadingColor[colorMode]}>
        Chronicles of Patrogonia
      </Heading>
      <AccountSelector createAccount={createAccount} login={login} />
      <VStack>
        <FaDragon size="1.5rem" />
        <Text>Last update: {lastUpdate}</Text>
        <Text>Recommended: Chrome with viewport: 1000 x 1000</Text>
        <ColorModeToggle />
        <InstructionsModal />
        <Credits />
      </VStack>
    </ThemedPanel>
  );
};

export default LandingPage;

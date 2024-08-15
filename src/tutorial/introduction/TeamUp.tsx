import { Box, Flex, Icon, Image, Stack, Text } from '@chakra-ui/react';
import React from 'react';
import { FaDragon } from 'react-icons/fa';
import InBattle from './screenshots/inBattle.png';

const TeamUp = ({ isCompact }: { isCompact: boolean }) => (
  <Stack>
    <Text marginBottom={isCompact ? '1rem' : '2rem'}>
      Team up with {isCompact ? 'others' : 'other players'} to even the odds.
    </Text>
    <Flex>
      <Stack marginTop={isCompact ? undefined : '4rem'}>
        <Box>
          Join battling players with{' '}
          <Icon as={FaDragon} height="1.5rem" width="1.5rem" />
        </Box>
        <Text>over their shoulder by</Text>
        <Text>approaching their position.</Text>
      </Stack>
      <Image
        alt="Player in battle"
        boxSize={isCompact ? '12rem' : '20rem'}
        marginLeft="1rem"
        src={InBattle}
      />
    </Flex>
  </Stack>
);

export default TeamUp;

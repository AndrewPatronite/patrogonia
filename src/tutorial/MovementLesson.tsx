import React from 'react';
import { Box, Flex, Icon, Kbd, Stack, Text, VStack } from '@chakra-ui/react';
import {
  FaArrowDown,
  FaArrowLeft,
  FaArrowRight,
  FaArrowUp,
} from 'react-icons/fa';

const MovementLesson = () => (
  <Stack width="100%" spacing="1rem">
    <Text>Move using the direction keys:</Text>
    <Flex alignItems="center" justifyContent="space-around">
      <VStack>
        <Kbd>W</Kbd>
        <Box>
          <Kbd>A</Kbd>
          <Kbd marginLeft="2rem">D</Kbd>
        </Box>
        <Kbd>S</Kbd>
      </VStack>
      {' or '}
      <VStack>
        <Kbd>
          <Icon as={FaArrowUp} />
        </Kbd>
        <Box>
          <Kbd>
            <Icon as={FaArrowLeft} />
          </Kbd>
          <Kbd marginLeft="2rem">
            <Icon as={FaArrowRight} />
          </Kbd>
        </Box>
        <Kbd>
          <Icon as={FaArrowDown} />
        </Kbd>
      </VStack>
    </Flex>
  </Stack>
);

export default MovementLesson;

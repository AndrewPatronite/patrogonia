import React from 'react';
import { Flex, Image, Stack, Text } from '@chakra-ui/react';

const TownVisitLesson = () => (
  <Flex>
    <Stack>
      <Text>
        Visit a town to restore
        <br />
        your health and magic
        <br />
        and save your progress.
      </Text>
    </Stack>
    <Image
      alt="Town"
      boxSize="5rem"
      marginLeft="1rem"
      src="/images/terrain/town.svg"
    />
  </Flex>
);

export default TownVisitLesson;

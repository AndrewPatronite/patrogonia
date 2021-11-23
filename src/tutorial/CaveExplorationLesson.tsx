import React from 'react'
import { Flex, Image, Stack, Text } from '@chakra-ui/react'
import { Cave } from '../environment/field/tiles/terrain'

const CaveExplorationLesson = () => (
  <Flex>
    <Stack>
      <Text>
        Enter the Lava Grotto
        <br />
        to venture onward
        <br />
        to Grimes.
      </Text>
    </Stack>
    <Image alt="Town" boxSize="5rem" marginLeft="1rem" src={Cave} />
  </Flex>
)

export default CaveExplorationLesson

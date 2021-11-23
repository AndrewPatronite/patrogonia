import React from 'react'
import { Flex, Image, Stack, Text } from '@chakra-ui/react'
import { Town } from '../environment/field/tiles/terrain'

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
    <Image alt="Town" boxSize="5rem" marginLeft="1rem" src={Town} />
  </Flex>
)

export default TownVisitLesson

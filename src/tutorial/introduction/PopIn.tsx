import { Flex, Kbd, Stack, Text } from '@chakra-ui/react'
import React from 'react'
import Character from '../../player/Character'

const PopIn = ({ isCompact }: { isCompact: boolean }) => (
  <Stack>
    {isCompact ? (
      <Flex>
        <Stack>
          <Text>Redwan will pop in from</Text>
          <Text>time to time with instructions.</Text>
        </Stack>
        <Character
          player={{
            name: 'Redwan',
            //@ts-ignore
            location: { facing: 'down' },
            isCurrentPlayer: false,
          }}
        />
      </Flex>
    ) : (
      <Text>I'll pop in from time to time with instructions.</Text>
    )}
    <Text>You can review them again anytime from</Text>
    <Text>
      the field menu by pressing <Kbd>Enter</Kbd>
    </Text>
  </Stack>
)

export default PopIn

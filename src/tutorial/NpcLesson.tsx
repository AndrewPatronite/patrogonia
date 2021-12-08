import React from 'react'
import { Icon, Kbd, Stack, Text } from '@chakra-ui/react'
import { FaInfoCircle } from 'react-icons/fa'

const NpcLesson = () => {
  return (
    <Stack>
      <Text>
        Press <Kbd>Space Bar</Kbd> to talk to
      </Text>
      <Text>
        villagers in dialog range{' '}
        <Icon as={FaInfoCircle} height="1.5rem" width="1.5rem" />.
      </Text>
    </Stack>
  )
}

export default NpcLesson

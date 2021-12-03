import { Box, Flex, Icon, Image, Stack, Text } from '@chakra-ui/react'
import { FaCampground } from 'react-icons/fa'
import Camping from './screenshots/camping.png'
import React from 'react'

interface CampingPlayerProps {
  isCompact: boolean
}

const CampingPlayer = ({ isCompact }: CampingPlayerProps) => (
  <Flex>
    <Stack marginTop={isCompact ? undefined : '4rem'}>
      <Box>
        Players with <Icon as={FaCampground} height="1.5rem" width="1.5rem" />
      </Box>
      <Text>over their shoulder</Text>
      <Text>aren't playing at the moment.</Text>
    </Stack>
    <Image
      alt="Player camping"
      boxSize={isCompact ? '10rem' : '20rem'}
      marginLeft="1rem"
      src={Camping}
    />
  </Flex>
)

export default CampingPlayer

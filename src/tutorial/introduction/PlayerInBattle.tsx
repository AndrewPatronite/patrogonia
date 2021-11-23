import { Box, Flex, Icon, Image, Stack, Text } from '@chakra-ui/react'
import { FaDragon } from 'react-icons/fa'
import InBattle from './screenshots/inBattle.png'
import React from 'react'

interface PlayerInBattleProps {
  isCompact: boolean
}

const PlayerInBattle = ({ isCompact }: PlayerInBattleProps) => (
  <Flex>
    <Stack marginTop={isCompact ? undefined : '2rem'}>
      <Box>
        Players with a <Icon as={FaDragon} height="1.5rem" width="1.5rem" />
      </Box>
      <Text>icon over their shoulder are in</Text>
      <Text>battles that you can join</Text>
      <Text>by approaching their position.</Text>
    </Stack>
    <Image
      alt="Player in battle"
      boxSize={isCompact ? '12rem' : '20rem'}
      marginLeft="1rem"
      src={InBattle}
    />
  </Flex>
)

export default PlayerInBattle

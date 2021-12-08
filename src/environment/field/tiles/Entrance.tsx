import React from 'react'
import { Box, BoxProps, Flex, Text } from '@chakra-ui/react'

interface EntranceProps extends BoxProps {
  mapsymbol: string
}

const Entrance = ({ children, mapsymbol, ...baseProps }: EntranceProps) => (
  <Flex
    {...baseProps}
    alignItems="center"
    backgroundColor="black"
    color="white"
    fontWeight="bold"
    justifyContent="center"
    position="relative"
  >
    <Text position="absolute">{mapsymbol}</Text>
    <Box position="absolute">{children}</Box>
  </Flex>
)

export default Entrance

import React from 'react'
import { Box, BoxProps, Flex, Text } from '@chakra-ui/react'

interface EntranceProps extends BoxProps {
  mapSymbol: string
}

const Entrance = ({ children, mapSymbol, ...baseProps }: EntranceProps) => (
  <Flex
    {...baseProps}
    alignItems="center"
    backgroundColor="black"
    color="white"
    fontWeight="bold"
    justifyContent="center"
    position="relative"
  >
    <Text position="absolute">{mapSymbol}</Text>
    <Box position="absolute">{children}</Box>
  </Flex>
)

export default Entrance

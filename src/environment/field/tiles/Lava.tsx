import React from 'react'
import { Box, BoxProps } from '@chakra-ui/react'
import { Lava as LavaImage } from './terrain'

const Lava = ({ children, ...baseProps }: BoxProps) => (
  <Box {...baseProps} backgroundImage={LavaImage}>
    {children}
  </Box>
)

export default Lava

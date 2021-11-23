import React from 'react'
import { Box, BoxProps } from '@chakra-ui/react'
import { Cave as CaveImage, LandColors } from './terrain'

const Cave = ({ children, ...baseProps }: BoxProps) => (
  <Box
    {...baseProps}
    backgroundColor={LandColors.Grass}
    backgroundImage={CaveImage}
  >
    {children}
  </Box>
)

export default Cave

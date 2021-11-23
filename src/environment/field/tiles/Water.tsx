import React from 'react'
import { Box, BoxProps } from '@chakra-ui/react'
import { Water as WaterImage } from './terrain'

const Water = ({ children, ...baseProps }: BoxProps) => (
  <Box {...baseProps} backgroundImage={WaterImage}>
    {children}
  </Box>
)

export default Water

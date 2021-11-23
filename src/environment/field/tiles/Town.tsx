import React from 'react'
import { Box, BoxProps } from '@chakra-ui/react'
import { LandColors, Town as TownImage } from './terrain'

interface TownProps extends BoxProps {
  mapSymbol: string
}

const Town = ({ children, mapSymbol, ...baseProps }: TownProps) => (
  <Box
    {...baseProps}
    backgroundColor={LandColors.Grass}
    backgroundImage={TownImage}
    backgroundRepeat="no-repeat"
    backgroundSize="6rem"
  >
    {children}
  </Box>
)

export default Town

import React from 'react';
import { Box, BoxProps } from '@chakra-ui/react';
import { Grass as GrassImage, LandColors } from './terrain';

const Grass = ({ children, ...baseProps }: BoxProps) => (
  <Box
    {...baseProps}
    backgroundColor={LandColors.Grass}
    backgroundImage={GrassImage}
  >
    {children}
  </Box>
);

export default Grass;

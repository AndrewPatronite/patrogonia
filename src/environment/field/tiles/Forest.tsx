import React from 'react';
import { Box, BoxProps } from '@chakra-ui/react';
import { Forest as ForestImage, LandColors } from './terrain';

const Forest = ({ children, ...baseProps }: BoxProps) => (
  <Box
    {...baseProps}
    backgroundColor={LandColors.Grass}
    backgroundImage={ForestImage}
  >
    {children}
  </Box>
);

export default Forest;

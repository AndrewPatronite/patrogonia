import React from 'react';
import { Box, BoxProps } from '@chakra-ui/react';
import { Rock as RockImage } from './terrain';

const Rock = ({ children, ...baseProps }: BoxProps) => (
  <Box {...baseProps} backgroundImage={RockImage}>
    {children}
  </Box>
);

export default Rock;

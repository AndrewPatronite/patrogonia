import React from 'react';
import { Box, BoxProps } from '@chakra-ui/react';
import { Dirt as DirtImage } from './terrain';

const Dirt = ({ children, ...baseProps }: BoxProps) => (
  <Box {...baseProps} backgroundImage={DirtImage}>
    {children}
  </Box>
);

export default Dirt;

import React from 'react';
import { Box, BoxProps } from '@chakra-ui/react';
import { LandColors, Mountain as MountainImage } from './terrain';

const Mountain = ({ children, ...baseProps }: BoxProps) => (
  <Box
    {...baseProps}
    backgroundColor={LandColors.Grass}
    backgroundImage={MountainImage}
  >
    {children}
  </Box>
);

export default Mountain;

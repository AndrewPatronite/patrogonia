import React from 'react';
import { BoxProps } from '@chakra-ui/react';
import { TileColors } from './terrain';
import TerrainTile from './TerrainTile';

const Mountain = ({ children, ...baseProps }: BoxProps) => (
  <TerrainTile
    {...baseProps}
    backgroundColor={TileColors.Grass}
    imageSrc="/images/terrain/mountain.svg"
  >
    {children}
  </TerrainTile>
);

export default Mountain;

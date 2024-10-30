import React from 'react';
import { BoxProps } from '@chakra-ui/react';
import { TileColors } from './terrain';
import TerrainTile from './TerrainTile';

const Cave = ({ children, ...baseProps }: BoxProps) => (
  <TerrainTile
    {...baseProps}
    backgroundColor={TileColors.Grass}
    imageSrc="/images/terrain/cave.gif"
  >
    {children}
  </TerrainTile>
);

export default Cave;

import React from 'react';
import { BoxProps } from '@chakra-ui/react';
import TerrainTile from './TerrainTile';
import { TileColors } from './terrain';

const Water = ({ children, ...baseProps }: BoxProps) => (
  <TerrainTile
    {...baseProps}
    backgroundColor={TileColors.Water}
    imageSrc="/images/terrain/water-small.gif"
  >
    {children}
  </TerrainTile>
);

export default Water;

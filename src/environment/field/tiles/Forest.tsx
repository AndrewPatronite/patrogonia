import React from 'react';
import { BoxProps } from '@chakra-ui/react';
import { TileColors } from './terrain';
import TerrainTile from './TerrainTile';

const Forest = ({ children, ...baseProps }: BoxProps) => (
  <TerrainTile
    {...baseProps}
    backgroundColor={TileColors.Grass}
    imageSrc="/images/terrain/forest.svg"
  >
    {children}
  </TerrainTile>
);

export default Forest;

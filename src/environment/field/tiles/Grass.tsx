import React from 'react';
import { BoxProps } from '@chakra-ui/react';
import { TileColors } from './terrain';
import TerrainTile from './TerrainTile';

const Grass = ({ children, ...baseProps }: BoxProps) => (
  <TerrainTile
    {...baseProps}
    backgroundColor={TileColors.Grass}
    imageSrc="/images/terrain/grass.svg"
  >
    {children}
  </TerrainTile>
);

export default Grass;

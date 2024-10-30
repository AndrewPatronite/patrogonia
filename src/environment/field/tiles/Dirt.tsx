import React from 'react';
import { BoxProps } from '@chakra-ui/react';
import TerrainTile from './TerrainTile';
import { TileColors } from './terrain';

const Dirt = ({ children, ...baseProps }: BoxProps) => (
  <TerrainTile
    {...baseProps}
    backgroundColor={TileColors.Dirt}
    imageSrc="/images/terrain/dirt.svg"
  >
    {children}
  </TerrainTile>
);

export default Dirt;

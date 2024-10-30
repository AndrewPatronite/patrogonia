import React from 'react';
import { BoxProps } from '@chakra-ui/react';
import { TileColors } from './terrain';
import TerrainTile from './TerrainTile';

const Town = ({ children, ...baseProps }: BoxProps) => (
  <TerrainTile
    {...baseProps}
    backgroundColor={TileColors.Grass}
    imageSrc="/images/terrain/town.svg"
    backgroundRepeat="no-repeat"
    backgroundSize="6rem"
  >
    {children}
  </TerrainTile>
);

export default Town;

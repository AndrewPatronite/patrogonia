import React from 'react';
import { BoxProps } from '@chakra-ui/react';
import TerrainTile from './TerrainTile';
import { TileColors } from './terrain';

const Lava = ({ children, ...baseProps }: BoxProps) => (
  <TerrainTile
    {...baseProps}
    backgroundColor={TileColors.Lava}
    imageSrc="/images/terrain/lava.gif"
  >
    {children}
  </TerrainTile>
);

export default Lava;

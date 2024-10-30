import React from 'react';
import { BoxProps } from '@chakra-ui/react';
import TerrainTile from './TerrainTile';
import { TileColors } from './terrain';

const Rock = ({ children, ...baseProps }: BoxProps) => (
  <TerrainTile
    {...baseProps}
    backgroundColor={TileColors.Rock}
    imageSrc="/images/terrain/rock.svg"
  >
    {children}
  </TerrainTile>
);

export default Rock;

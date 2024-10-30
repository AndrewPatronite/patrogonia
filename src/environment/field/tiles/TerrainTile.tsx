import React, { forwardRef } from 'react';
import { Box, BoxProps } from '@chakra-ui/react';

export interface TerrainTileProps extends BoxProps {
  imageSrc: string;
}

const TerrainTile = forwardRef(
  ({ children, imageSrc, ...baseProps }: TerrainTileProps, ref) => (
    <Box
      ref={ref}
      {...baseProps}
      backgroundImage={imageSrc}
      height="6.25rem"
      width="6.25rem"
      position="relative"
    >
      <Box position="absolute" top={0} left={0}>
        {children}
      </Box>
    </Box>
  )
);

TerrainTile.displayName = 'TerrainTile';

export default TerrainTile;

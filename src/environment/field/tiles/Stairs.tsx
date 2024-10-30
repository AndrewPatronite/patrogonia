import {
  Box,
  BoxProps,
  PlacementWithLogical,
  Popover,
  PopoverArrow,
  PopoverContent,
  PopoverTrigger,
  Text,
} from '@chakra-ui/react';
import React from 'react';
import { ContinentName } from '../../maps/types';
import TerrainTile from './TerrainTile';
import { TileColors } from './terrain';

interface StairsProps extends BoxProps {
  mapsymbol: string;
}

const Stairs = ({ children, mapsymbol, ...baseProps }: StairsProps) => {
  let stairsImage;
  let popoverPlacement: PlacementWithLogical;

  switch (mapsymbol) {
    case ContinentName.Grimes:
      stairsImage = '/images/terrain/stairs270.svg';
      popoverPlacement = 'right';
      break;
    case ContinentName.Atoris:
    default:
      stairsImage = '/images/terrain/stairs.svg';
      popoverPlacement = 'top-start';
  }

  return (
    <Popover isOpen={true} placement={popoverPlacement}>
      <PopoverTrigger>
        <TerrainTile
          {...baseProps}
          backgroundColor={TileColors.Rock}
          imageSrc={stairsImage}
          sx={{
            image: {
              transform: 'rotate(270deg)',
            },
          }}
        >
          {children}
        </TerrainTile>
      </PopoverTrigger>
      <Box zIndex={1}>
        <PopoverContent width="6.25rem">
          <PopoverArrow />
          <Text padding="0.5rem" textAlign="center">
            {mapsymbol}
          </Text>
        </PopoverContent>
      </Box>
    </Popover>
  );
};

export default Stairs;

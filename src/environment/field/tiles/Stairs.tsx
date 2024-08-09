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
import { Stairs as StairsImage, Stairs270 } from './terrain';
import React from 'react';
import { ContinentName } from '../../maps/types';

interface StairsProps extends BoxProps {
  mapsymbol: string;
}

const Stairs = ({ children, mapsymbol, ...baseProps }: StairsProps) => {
  let backgroundImage;
  let popoverPlacement: PlacementWithLogical;

  switch (mapsymbol) {
    case ContinentName.Grimes:
      backgroundImage = Stairs270;
      popoverPlacement = 'right';
      break;
    case ContinentName.Atoris:
    default:
      backgroundImage = StairsImage;
      popoverPlacement = 'top-start';
  }

  return (
    <Popover isOpen={true} placement={popoverPlacement}>
      <PopoverTrigger>
        <Box
          {...baseProps}
          backgroundImage={backgroundImage}
          sx={{
            image: {
              transform: 'rotate(270deg)',
            },
          }}
        >
          {children}
        </Box>
      </PopoverTrigger>
      <PopoverContent width="6.25rem">
        <PopoverArrow />
        <Text padding="0.5rem" textAlign="center">
          {mapsymbol}
        </Text>
      </PopoverContent>
    </Popover>
  );
};

export default Stairs;

import {
  Box,
  BoxProps,
  PlacementWithLogical,
  Popover,
  PopoverArrow,
  PopoverContent,
  PopoverTrigger,
  Text,
} from '@chakra-ui/react'
import { Stairs as StairsImage, Stairs270 } from './terrain'
import React from 'react'
import { CaveExit } from '../../maps/Maps'

interface StairsProps extends BoxProps {
  mapSymbol: string
}

const Stairs = ({ children, mapSymbol, ...baseProps }: StairsProps) => {
  let backgroundImage
  let popoverPlacement: PlacementWithLogical

  switch (mapSymbol) {
    case CaveExit.Grimes:
      backgroundImage = Stairs270
      popoverPlacement = 'right'
      break
    case CaveExit.Atoris:
    default:
      backgroundImage = StairsImage
      popoverPlacement = 'top-start'
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
          {mapSymbol}
        </Text>
      </PopoverContent>
    </Popover>
  )
}

export default Stairs

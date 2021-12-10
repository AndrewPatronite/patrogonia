import React from 'react'
import { isEqual } from 'lodash'
import { Box, Flex, Icon, Text } from '@chakra-ui/react'
import { FaCampground, FaDragon, FaInfoCircle } from 'react-icons/fa'
import { IconType } from 'react-icons/lib'
import { HeroDown, HeroLeft, HeroRight, HeroUp } from './hero'
import { PeerDown, PeerLeft, PeerRight, PeerUp } from './peer'
import { Direction } from '../navigation'

const CAMPING_DURATION_MILLIS = 10000

const getCharacterImage = (
  directionFacing: Direction,
  isCurrentPlayer?: boolean
) => {
  switch (directionFacing) {
    case Direction.Up:
      return isCurrentPlayer ? HeroUp : PeerUp
    case Direction.Left:
      return isCurrentPlayer ? HeroLeft : PeerLeft
    case Direction.Right:
      return isCurrentPlayer ? HeroRight : PeerRight
    case Direction.Down:
    default:
      return isCurrentPlayer ? HeroDown : PeerDown
  }
}

export interface CharacterProps {
  name: string
  directionFacing: Direction
  battleId?: string
  isCurrentPlayer?: boolean
  lastUpdate?: string
  inDialogRange?: boolean
}

const Character = ({
  name,
  directionFacing,
  battleId,
  isCurrentPlayer,
  lastUpdate,
  inDialogRange,
}: CharacterProps) => {
  const lastUpdateDate = lastUpdate && new Date(lastUpdate)
  const now = new Date()
  const camping =
    lastUpdateDate &&
    now.getTime() - lastUpdateDate.getTime() > CAMPING_DURATION_MILLIS
  const icon: IconType | undefined = (() => {
    if (battleId) {
      return FaDragon
    } else if (camping) {
      return FaCampground
    } else if (inDialogRange) {
      return FaInfoCircle
    } else {
      return undefined
    }
  })()

  return (
    <Box position="relative">
      <Flex
        backgroundImage={getCharacterImage(directionFacing, isCurrentPlayer)}
        height="6.25rem"
        justifyContent="center"
        width="6.25rem"
      >
        {isEqual(directionFacing, Direction.Up) && (
          <Text
            color="gold"
            fontSize="12px"
            marginLeft="0.3125rem"
            marginTop="1.5625rem"
          >
            {name}
          </Text>
        )}
        {isEqual(directionFacing, Direction.Down) && (
          <Text
            color="gold"
            fontSize="7px"
            marginLeft="0.625rem"
            marginTop="1.5625rem"
          >
            {name}
          </Text>
        )}
      </Flex>
      {icon && (
        <Icon
          as={icon}
          color="black"
          height="1.25rem"
          left="0.3125rem"
          position="absolute"
          top="0"
          width="1.25rem"
        />
      )}
    </Box>
  )
}

export default Character

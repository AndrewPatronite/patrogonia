import React from 'react'
import { filter, find, isEqual } from 'lodash'
import { Maps } from '../environment/maps/Maps'
import { Box, Flex } from '@chakra-ui/react'
import { Cave, Field } from './background'
import { Boar, Goblin, Knight, Mouse, Rat, Skeleton } from './enemy'

const bestiary = {
  Mouse: Mouse,
  Boar: Boar,
  Goblin: Goblin,
  Knight: Knight,
  Rat: Rat,
  Skeleton: Skeleton,
}

const EnemyDisplay = ({
  mapName,
  enemies,
  selectedEnemyId,
  deliveredLogEntries,
}) => {
  const enemyDefeatNotYetReported = (enemyId) =>
    !find(
      deliveredLogEntries,
      ({ content, targetId }) =>
        content.includes('defeated') && isEqual(enemyId, targetId)
    )
  const displayedEnemies = filter(
    enemies,
    ({ id: enemyId, stats: enemyStats }) => {
      return enemyStats.hp > 0 || enemyDefeatNotYetReported(enemyId)
    }
  )

  return (
    <Flex
      minHeight="35.5rem"
      height="35.5rem"
      maxHeight="35.5rem"
      justifyContent="space-evenly"
      backgroundSize="cover"
      backgroundColor="white"
      margin="1px"
      backgroundImage={Maps.isField(mapName) ? Field : Cave}
    >
      {displayedEnemies.map(({ id, name }) => (
        <Box
          key={id}
          backgroundImage={bestiary[name]}
          backgroundRepeat="no-repeat"
          border={id === selectedEnemyId ? '3px solid #3734ff' : undefined}
          borderRadius={id === selectedEnemyId ? '0.3125rem' : undefined}
          marginY="0.625rem"
          sx={{
            backgroundPositionX: 'center',
            backgroundPositionY: 'bottom',
          }}
          width="12.5rem"
        />
      ))}
    </Flex>
  )
}

export default EnemyDisplay

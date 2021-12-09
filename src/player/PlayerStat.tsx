import { Flex, Text } from '@chakra-ui/react'
import React from 'react'

const PlayerStat = ({ name, value }: { name: string; value: any }) => (
  <Flex justifyContent="space-between" data-testid="player-stat">
    <label>{name}</label>
    <Text>{value}</Text>
  </Flex>
)

export default PlayerStat

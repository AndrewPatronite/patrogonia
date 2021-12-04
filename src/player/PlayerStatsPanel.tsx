import React from 'react'
import ThemedPanel from '../components/theme/ThemedPanel'
import { Flex, Text } from '@chakra-ui/react'
import { Stats } from './types'

const PlayerStat = ({ name, value }: { name: string; value: any }) => (
  <Flex justifyContent="space-between">
    <label>{name}</label>
    <Text>{value}</Text>
  </Flex>
)

const PlayerStatsPanel = ({
  playerStats: {
    playerName,
    level,
    hp,
    hpTotal,
    mp,
    mpTotal,
    gold,
    xp,
    xpTillNextLevel,
    attack,
    defense,
    agility,
  },
  showHeading = true,
  includeBorder = true,
}: {
  playerStats: Stats
  showHeading?: boolean
  includeBorder?: boolean
}) => (
  <ThemedPanel
    className="player-stats-panel"
    width="14rem"
    minHeight="23rem"
    heading={showHeading ? 'Stats' : undefined}
    flexDirection="column"
    includeBorder={includeBorder}
  >
    <PlayerStat name="Player" value={playerName} />
    <PlayerStat name="Level" value={level} />
    <PlayerStat name="HP" value={`${hp}/${hpTotal}`} />
    <PlayerStat name="MP" value={`${mp}/${mpTotal}`} />
    <PlayerStat name="Gold" value={gold} />
    <PlayerStat name="XP" value={xp} />
    {xpTillNextLevel > 0 && (
      <PlayerStat name="XP till next level" value={xpTillNextLevel} />
    )}
    <PlayerStat name="Attack" value={attack} />
    <PlayerStat name="Defense" value={defense} />
    <PlayerStat name="Agility" value={agility} />
  </ThemedPanel>
)

export default PlayerStatsPanel

import React, {
  MouseEventHandler,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react'
import { isEmpty } from 'lodash'
import ThemedPanel from '../components/theme/ThemedPanel'
import { Box, Button, Stack, Text } from '@chakra-ui/react'
import { BattleStatusStyle, LogEntry } from './types'
import {
  EnemyAttackSound,
  HealingSound,
  IceSound,
  LevelUpSound,
  PartyDestroyedSound,
  pauseSound,
  PlayerAttackSound,
  playSound,
} from '../environment/sound'
import { isEnemyTarget } from './helper'

export interface LogProps {
  deliveredEntries: LogEntry[]
  onDismiss: MouseEventHandler
  showDismiss: boolean
  battleStatusStyle: BattleStatusStyle
  allMessagesDelivered: boolean
}

export interface DeliveredLogEntries {
  [lastDeliveredEntryIndex: number]: boolean
}

const Log = ({
  deliveredEntries,
  onDismiss,
  showDismiss,
  battleStatusStyle,
  allMessagesDelivered,
}: LogProps) => {
  const [logEntryMusicPlayed, setLogEntryMusicPlayed] = useState<
    DeliveredLogEntries
  >({})
  const scrollTo = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scrollTo?.current?.scrollIntoView()
  })

  useLayoutEffect(() => {
    const setEntryPlayed = (lastDeliveredEntryIndex: number) => {
      setLogEntryMusicPlayed((prevState) => ({
        ...prevState,
        [lastDeliveredEntryIndex]: true,
      }))
    }

    if (!isEmpty(deliveredEntries)) {
      const lastDeliveredEntryIndex = deliveredEntries.length - 1
      if (!logEntryMusicPlayed[lastDeliveredEntryIndex]) {
        const { content, targetId } = deliveredEntries[lastDeliveredEntryIndex]
        if (content.includes('attacks')) {
          if (targetId) {
            playSound(
              isEnemyTarget(targetId) ? 'player-attack' : 'enemy-attack'
            )
          }
          setEntryPlayed(lastDeliveredEntryIndex)
        } else if (content.includes('casts Heal')) {
          playSound('heal')
        } else if (content.includes('casts Ice')) {
          playSound('ice')
        } else if (content.includes('level')) {
          pauseSound('battle-music')
          playSound('level-up')
          setEntryPlayed(lastDeliveredEntryIndex)
        } else if (content.includes('destroyed')) {
          pauseSound('battle-music')
          playSound('party-destroyed')
          setEntryPlayed(lastDeliveredEntryIndex)
        }
      }
    }
  }, [deliveredEntries, logEntryMusicPlayed])

  return (
    <ThemedPanel
      flexDirection="column"
      flex="1 1 auto"
      margin="1px"
      overflow="scroll"
      overflowX="hidden"
      justifyContent="unset"
      padding="1rem"
      sx={battleStatusStyle}
    >
      <Stack spacing="0.5rem" data-testid="battle-log">
        {!isEmpty(deliveredEntries) &&
          deliveredEntries.map((entry, index) => (
            <Text key={index}>{entry.content}</Text>
          ))}
        {showDismiss && allMessagesDelivered && (
          <Button
            autoFocus={true}
            alignSelf="flex-start"
            colorScheme="blue"
            onClick={onDismiss}
          >
            {deliveredEntries[deliveredEntries.length - 1].content.includes(
              'destroyed'
            )
              ? 'Load save'
              : 'OK'}
          </Button>
        )}
      </Stack>
      <Box className="scroll-to" ref={scrollTo} />
      <audio className="player-attack" data-testid="player-attack">
        <source src={PlayerAttackSound} />
      </audio>
      <audio className="enemy-attack" data-testid="enemy-attack">
        <source src={EnemyAttackSound} />
      </audio>
      <audio className="level-up" data-testid="level-up">
        <source src={LevelUpSound} />
      </audio>
      <audio className="party-destroyed" data-testid="party-destroyed">
        <source src={PartyDestroyedSound} />
      </audio>
      <audio className="heal" data-testid="heal">
        <source src={HealingSound} />
      </audio>
      <audio className="ice" data-testid="ice">
        <source src={IceSound} />
      </audio>
    </ThemedPanel>
  )
}

export default Log

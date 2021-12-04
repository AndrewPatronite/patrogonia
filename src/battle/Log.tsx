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
import { LogEntry } from './types'
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
import { BattleStatusStyle } from './helper'

interface LogProps {
  deliveredEntries: LogEntry[]
  onDismiss: MouseEventHandler
  showDismiss: boolean
  battleStatusStyle: BattleStatusStyle
  allMessagesDelivered: boolean
}

const Log = ({
  deliveredEntries,
  onDismiss,
  showDismiss,
  battleStatusStyle,
  allMessagesDelivered,
}: LogProps) => {
  const [logEntryMusicPlayed, setLogEntryMusicPlayed] = useState<{
    [lastDeliveredEntryIndex: number]: boolean
  }>({})
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
          //TODO AP revisit:
          const integerMaxStringLength = 11
          if (targetId && targetId.length > integerMaxStringLength) {
            playSound('player-attack')
          } else {
            playSound('enemy-attack')
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
      <Stack spacing="0.5rem">
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
      <audio className="player-attack">
        <source src={PlayerAttackSound} />
      </audio>
      <audio className="enemy-attack">
        <source src={EnemyAttackSound} />
      </audio>
      <audio className="level-up">
        <source src={LevelUpSound} />
      </audio>
      <audio className="party-destroyed">
        <source src={PartyDestroyedSound} />
      </audio>
      <audio className="heal">
        <source src={HealingSound} />
      </audio>
      <audio className="ice">
        <source src={IceSound} />
      </audio>
    </ThemedPanel>
  )
}

export default Log

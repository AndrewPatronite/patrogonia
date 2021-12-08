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
import { Sound } from '../environment/sound'
import { isEnemyTarget } from './helper'
import { useSound } from '../hooks'

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
  const { playSound, pauseSound } = useSound()
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
              isEnemyTarget(targetId) ? Sound.PlayerAttack : Sound.EnemyAttack
            )
          }
          setEntryPlayed(lastDeliveredEntryIndex)
        } else if (content.includes('casts Heal')) {
          playSound(Sound.Heal)
        } else if (content.includes('casts Ice')) {
          playSound(Sound.Ice)
        } else if (content.includes('level')) {
          pauseSound(Sound.BattleMusic)
          playSound(Sound.LevelUp)
          setEntryPlayed(lastDeliveredEntryIndex)
        } else if (content.includes('destroyed')) {
          pauseSound(Sound.BattleMusic)
          playSound(Sound.PartyDestroyed)
          setEntryPlayed(lastDeliveredEntryIndex)
        }
      }
    }
  }, [deliveredEntries, logEntryMusicPlayed, playSound, pauseSound])

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
    </ThemedPanel>
  )
}

export default Log

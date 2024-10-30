import React, {
  MouseEventHandler,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import Typist from 'react-typist-component';
import ThemedPanel from '../components/theme/ThemedPanel';
import { Box, Button, Stack, Text } from '@chakra-ui/react';
import { BattleStatusStyle, LogEntry } from './types';
import { Sound } from '../environment/sound';
import { useSound } from '../hooks';

export interface LogProps {
  deliveredEntries: LogEntry[];
  onDismiss: MouseEventHandler;
  showDismiss: boolean;
  battleStatusStyle: BattleStatusStyle;
  allMessagesDelivered: boolean;
}

const Log = ({
  deliveredEntries,
  onDismiss,
  showDismiss,
  battleStatusStyle,
  allMessagesDelivered,
}: LogProps) => {
  const { playSound, pauseSound } = useSound();
  const [logEntryIndex, setLogEntryIndex] = useState(
    Math.max(0, deliveredEntries.length - 1)
  );
  const scrollTo = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollTo?.current?.scrollIntoView) {
      scrollTo?.current?.scrollIntoView();
    }
  });

  useLayoutEffect(() => {
    if (logEntryIndex < deliveredEntries.length) {
      const { content, targetId } = deliveredEntries[logEntryIndex];
      if (content.includes('attacks') && targetId) {
        const isEnemyTarget = targetId.includes('-');
        playSound(isEnemyTarget ? Sound.PlayerAttacks : Sound.EnemyAttacks);
      } else if (content.includes('casts Heal')) {
        playSound(Sound.Heal);
      } else if (content.includes('casts Ice')) {
        playSound(Sound.Ice);
      } else if (content.includes('level')) {
        pauseSound(Sound.BattleMusic);
        playSound(Sound.LevelUp);
      } else if (content.includes('destroyed')) {
        pauseSound(Sound.BattleMusic);
        playSound(Sound.PartyDestroyed);
      }
      setLogEntryIndex(logEntryIndex + 1);
    }
  }, [logEntryIndex, deliveredEntries, pauseSound, playSound]);

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
        {deliveredEntries.map((entry, index) =>
          index === deliveredEntries.length - 1 ? (
            <Typist key={index} typingDelay={10} cursor="">
              {entry.content}
            </Typist>
          ) : (
            <Text key={index}>{entry.content}</Text>
          )
        )}
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
  );
};

export default Log;

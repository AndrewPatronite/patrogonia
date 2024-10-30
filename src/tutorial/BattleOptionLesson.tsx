import { ListOption } from '../control/List';
import React from 'react';
import {
  HStack,
  Icon,
  Kbd,
  List,
  ListItem,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import { FaArrowDown, FaArrowUp } from 'react-icons/fa';

interface BattleOptionLessonProps {
  options: ListOption[];
  subject: string;
}

const BattleOptionLesson = ({ options, subject }: BattleOptionLessonProps) => (
  <Stack spacing="1rem" minWidth="24rem">
    <Text>1. Choose a {subject}:</Text>
    <Stack direction="row" spacing="2rem" paddingX="1.5rem">
      <Stack spacing="1rem" justifyContent="center">
        <HStack>
          <Text as="li">with the arrow keys</Text>
          <VStack>
            <Kbd>
              <Icon as={FaArrowUp} />
            </Kbd>
            <Kbd>
              <Icon as={FaArrowDown} />
            </Kbd>
          </VStack>
        </HStack>
        <Text as="li">or click an entry</Text>
        <Stack>
          <Text as="li">or press the number key</Text>
          <Text paddingLeft="1.5rem">matching the entry</Text>
        </Stack>
      </Stack>
      <List borderWidth={1} size="sm">
        {options.map(({ value, display }, index) => (
          <ListItem key={`${value}-${display}`} padding="0.5rem">
            <Kbd key={value} marginRight="1rem">
              {index + 1}
            </Kbd>
            {display}
          </ListItem>
        ))}
      </List>
    </Stack>
    <Text>
      2. Press <Kbd>Enter</Kbd> to confirm the {subject}.
    </Text>
  </Stack>
);

export default BattleOptionLesson;

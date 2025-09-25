import { Stack, Text } from '@chakra-ui/react';
import React from 'react';

interface MessagesProps {
  messages: string[];
}

const Messages = ({ messages }: MessagesProps) => (
  <Stack marginBottom="1rem" alignItems="center" data-testid="menu-messages">
    {messages.map((message, index) => (
      <Text key={index} marginBottom="0.5rem">
        {message}
      </Text>
    ))}
  </Stack>
);

export default Messages;

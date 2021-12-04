import { Stack, Text } from '@chakra-ui/react'
import React from 'react'
import { Player } from '../../player'

interface WelcomeProps {
  currentPlayer?: Player
}

const Welcome = ({ currentPlayer }: WelcomeProps) => (
  <Stack>
    <Text>
      Welcome intrepid adventurer
      {currentPlayer?.name ? `, ${currentPlayer.name}` : ''}!
    </Text>
    <Text>It is I, Redwan Paettinor,</Text>
    <Text>your guide on this journey.</Text>
  </Stack>
)

export default Welcome

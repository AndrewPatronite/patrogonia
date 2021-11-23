import React, { useState } from 'react'
import { Button, Stack, Text } from '@chakra-ui/react'
import Player from '../player/Player'
import words from 'an-array-of-english-words'
import { random } from 'lodash'
import { characterNames, encrypt } from './helper'
import { startingLocation } from './startingLocation'
import { CredentialedPlayer } from './CredentialedPlayer'

interface QuickStartFormProps {
  createAccount: (player: Player) => void
}

const getRandomEntry = (list: string[]) => list[random(list.length - 1)]

const generateCharacter = () => {
  const randomName = getRandomEntry(characterNames)
  return {
    name: randomName,
    username: `${randomName}${random(1, 9999)}`,
    password: getRandomEntry(words),
    location: startingLocation,
  }
}

const QuickStartForm = ({ createAccount }: QuickStartFormProps) => {
  const [character, setCharacter] = useState(generateCharacter)

  const create = () => {
    //@ts-ignore additional fields
    const newPlayer: CredentialedPlayer = {
      ...character,
      password: encrypt(character.password),
    }
    createAccount(newPlayer)
  }

  return (
    <Stack spacing="1rem">
      <Stack spacing="0.25rem">
        <Text fontWeight="semibold">Character name</Text>
        <Text>{character.name}</Text>
      </Stack>
      <Stack spacing="0.25rem">
        <Text fontWeight="semibold">Username</Text>
        <Text>{character.username}</Text>
      </Stack>
      <Stack spacing="0.25rem">
        <Text fontWeight="semibold">Password</Text>
        <Text>{character.password}</Text>
      </Stack>
      <Button
        alignSelf="flex-end"
        variant="link"
        onClick={() => setCharacter(generateCharacter())}
      >
        Regenerate character
      </Button>
      <Button alignSelf="flex-end" colorScheme="blue" onClick={create}>
        Start
      </Button>
    </Stack>
  )
}

export default QuickStartForm

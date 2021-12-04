import { Npc, NpcType } from './Npc'
import React from 'react'
import { Text } from '@chakra-ui/react'
import { Direction } from '../navigation'

export enum NpcName {
  Alastair = 'Alastair',
  Barnaby = 'Barnaby',
  Finlay = 'Finlay',
  Nigel = 'Nigel',
  Tristan = 'Tristan',
}

export const Alastair: Npc = {
  name: NpcName.Alastair,
  type: NpcType.Knight,
  currentRowIndex: 17,
  currentColumnIndex: 6,
  movementRange: 10,
  startingRowIndex: 17,
  startingColumnIndex: 6,
  directionFacing: Direction.Right,
  isTalking: false,
}

export const Barnaby: Npc = {
  name: NpcName.Barnaby,
  type: NpcType.Knight,
  currentRowIndex: 21,
  currentColumnIndex: 12,
  movementRange: 10,
  startingRowIndex: 21,
  startingColumnIndex: 12,
  directionFacing: Direction.Up,
  isTalking: false,
}

export const Finlay: Npc = {
  name: NpcName.Finlay,
  type: NpcType.Knight,
  currentRowIndex: 9,
  currentColumnIndex: 11,
  movementRange: 10,
  startingRowIndex: 9,
  startingColumnIndex: 11,
  directionFacing: Direction.Down,
  isTalking: false,
}

export const Nigel: Npc = {
  name: NpcName.Nigel,
  type: NpcType.Knight,
  currentRowIndex: 7,
  currentColumnIndex: 17,
  movementRange: 10,
  startingRowIndex: 7,
  startingColumnIndex: 17,
  directionFacing: Direction.Down,
  isTalking: false,
}

export const Tristan: Npc = {
  name: NpcName.Tristan,
  type: NpcType.Knight,
  currentRowIndex: 19,
  currentColumnIndex: 7,
  movementRange: 10,
  startingRowIndex: 19,
  startingColumnIndex: 7,
  directionFacing: Direction.Down,
  isTalking: false,
}

const NPC_DIALOG: { [index in NpcName]: string | JSX.Element } = {
  [NpcName.Alastair]: (
    <Text>
      The marketplace and hostel are vacant and the villagers seem to have
      vanished.
      <br />
      <br />
      We just returned from Grimes to the east though the Lava Grotto.
      <br />
      <br />
      Beware, fierce monsters lurk there.
    </Text>
  ),
  [NpcName.Barnaby]: (
    <Text>
      You should visit towns often to restore your health and save your game.
      <br />
      <br />
      You can access your field menu by pressing Enter.
      <br />
      <br />
      View stats, cast spells, change settings, or log out.
    </Text>
  ),
  [NpcName.Finlay]: (
    <Text>
      Where is everyone?
      <br />
      <br />I stopped here on my way to Easthaven and nary a soul to be found.
    </Text>
  ),
  [NpcName.Nigel]: 'Morning guv!',
  [NpcName.Tristan]: 'Hallo hallo!',
}

export const getDialog = (npc: NpcName): string | JSX.Element =>
  NPC_DIALOG[npc] || ''

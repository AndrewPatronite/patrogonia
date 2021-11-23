import React, { useState } from 'react'
import { upperFirst } from 'lodash'
import Player from './Player'
import Spell from './Spell'
import ThemedPanel, { ThemedPanelProps } from '../components/theme/ThemedPanel'
import { Button, Flex, Stack, Text } from '@chakra-ui/react'
import { playSound } from '../environment/sound/sound'
import List from '../control/List'

const healingSound = require('../environment/sound/zapsplat/zapsplat_fantasy_magic_mystery_glissando_bell_43990.mp3')
const warpSound = require('../environment/sound/zapsplat/magic_spell_ascending_metallic_pad.mp3')

const spellSounds: { [index: string]: string } = {
  HEAL: 'heal',
  OUTSIDE: 'warp',
  RETURN: 'warp',
}

interface PlayerSpellsProps extends ThemedPanelProps {
  currentPlayer: Player
  availableSpells: Spell[]
  castSpell: (spellName: string, targetId: string) => void
  onSpellCast: () => void
}

const PlayerSpells = ({
  currentPlayer: {
    id: currentPlayerId,
    location: { entranceName },
    visited,
    name: playerName,
    stats: { mp: playerMp },
  },
  availableSpells,
  castSpell,
  onSpellCast,
}: PlayerSpellsProps) => {
  const [spell, setSpell] = useState<Spell>()
  const [town, setTown] = useState(visited[0])
  const [castSpellMessage, setSpellCastMessage] = useState('')

  const cast = () => {
    if (spell) {
      setSpellCastMessage(
        `${playerName} cast ${upperFirst(spell.spellName.toLowerCase())}`
      )
      playSound(spellSounds[spell.spellName])
      setTimeout(() => {
        const spellTarget =
          {
            OUTSIDE: entranceName,
            RETURN: town,
          }[spell.spellName] || currentPlayerId.toString()
        castSpell(spell.spellName, spellTarget)
        setSpell(availableSpells[0])
        setTown(visited[0])
        setSpellCastMessage('')
        onSpellCast()
      }, 4000)
    }
  }

  return (
    <ThemedPanel
      className="player-spells"
      flexDirection="column"
      includeBorder={false}
    >
      {castSpellMessage ? (
        <Text>{castSpellMessage}</Text>
      ) : (
        <Stack spacing="1rem" minWidth="15rem">
          <Flex alignItems="center">
            <List
              onChange={setSpell}
              options={availableSpells.map((availableSpell) => ({
                value: availableSpell,
                display: upperFirst(availableSpell.spellName.toLowerCase()),
              }))}
              value={spell}
            />
            {spell?.spellName === 'RETURN' && (
              <>
                <Text marginX="0.5rem">to</Text>
                <List
                  width="8rem"
                  onChange={setTown}
                  options={visited.map((townName) => ({
                    value: townName,
                    display: upperFirst(townName.toLowerCase()),
                  }))}
                  value={town}
                />
              </>
            )}
          </Flex>
          <Flex alignItems="center" justifyContent="space-between">
            <Stack>
              {spell && (
                <>
                  <Text>{upperFirst(spell.spellName.toLowerCase())}</Text>
                  {spell.spellName === 'RETURN' && (
                    <Text>{`to ${upperFirst(town.toLowerCase())}`}</Text>
                  )}
                  <Text>{`MP ${spell.mpCost}/${playerMp}`}</Text>
                </>
              )}
            </Stack>
            <Button
              marginLeft="2rem"
              colorScheme="blue"
              onClick={cast}
              isDisabled={!spell}
            >
              Cast
            </Button>
          </Flex>
        </Stack>
      )}
      <audio className="heal">
        <source src={healingSound} />
      </audio>
      <audio className="warp">
        <source src={warpSound} />
      </audio>
    </ThemedPanel>
  )
}

export default PlayerSpells

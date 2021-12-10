import React from 'react'
import { shallow, ShallowWrapper } from 'enzyme'
import EnemyDisplay, { EnemyDisplayProps } from './EnemyDisplay'
import { Cave, Continent } from '../environment/maps/Maps'
import { Box } from '@chakra-ui/react'
import { EnemyName } from './types'

describe('EnemyDisplay', () => {
  let props: EnemyDisplayProps
  let subject: ShallowWrapper

  beforeEach(() => {
    props = {
      mapName: Cave.LavaGrotto,
      enemies: [
        { id: 'ffff123', name: EnemyName.Rat, stats: { hp: 0 } },
        { id: 'eeee123', name: EnemyName.Rat, stats: { hp: 0 } },
        { id: 'abcd123', name: EnemyName.Goblin, stats: { hp: 10 } },
      ],
      selectedEnemyId: 'abcd123',
      deliveredLogEntries: [
        {
          content: 'Rat is defeated.',
          targetId: 'ffff123',
          round: 1,
          delivered: true,
        },
      ],
    }
    subject = shallow(<EnemyDisplay {...props} />)
  })

  it('has the cave image based on the map', () => {
    expect(subject.prop('backgroundImage')).toEqual('cave.svg')
  })

  it('has the field image based on the map', () => {
    props.mapName = Continent.Grimes
    subject = shallow(<EnemyDisplay {...props} />)
    expect(subject.prop('backgroundImage')).toEqual('field.svg')
  })

  it("has a Box to house each enemy that hasn't been reported as defeated", () => {
    const enemies = subject.find(Box)
    expect(enemies.length).toEqual(2)
    expect(enemies.at(0).props()).toEqual({
      backgroundImage: 'rat.svg',
      backgroundRepeat: 'no-repeat',
      border: undefined,
      borderRadius: undefined,
      marginY: expect.anything(),
      sx: {
        backgroundPositionX: 'center',
        backgroundPositionY: 'bottom',
      },
      width: expect.anything(),
    })
    expect(enemies.at(1).props()).toEqual({
      backgroundImage: 'goblin.svg',
      backgroundRepeat: 'no-repeat',
      border: '3px solid #3734ff',
      borderRadius: '0.3125rem',
      marginY: expect.anything(),
      sx: {
        backgroundPositionX: 'center',
        backgroundPositionY: 'bottom',
      },
      width: expect.anything(),
    })
  })
})

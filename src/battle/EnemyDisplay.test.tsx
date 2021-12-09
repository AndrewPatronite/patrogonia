import React from 'react'
import { shallow, ShallowWrapper } from 'enzyme'
import EnemyDisplay from './EnemyDisplay'
import { Cave } from '../environment/maps/Maps'

describe('EnemyDisplay', () => {
  let props
  let subject: ShallowWrapper

  beforeEach(() => {
    props = {
      mapName: Cave.LavaGrotto,
      enemies: [
        { id: 'ffff123', name: 'Rat', stats: { hp: 0 } },
        { id: 'eeee123', name: 'Rat', stats: { hp: 0 } },
        { id: 'abcd123', name: 'Goblin', stats: { hp: 10 } },
      ],
      selectedEnemyId: 'abcd123',
      deliveredLogEntries: [
        { content: 'Rat is defeated.', targetId: 'ffff123' },
      ],
    }
    subject = shallow(<EnemyDisplay {...props} />)
  })

  it('is a div with the className corresponding to the map name', () => {
    expect(subject.type()).toEqual('div')
    expect(subject.prop('className')).toEqual('enemies cave')
  })

  it("has a div to house each enemy that hasn't been reported as defeated", () => {
    const enemies = subject.find('.enemy')
    expect(enemies.length).toEqual(2)
    expect(enemies.at(0).type()).toEqual('div')
    expect(enemies.at(0).props()).toEqual({ className: 'enemy rat' })
    expect(enemies.at(1).type()).toEqual('div')
    expect(enemies.at(1).props()).toEqual({
      className: 'enemy goblin selected',
    })
  })
})

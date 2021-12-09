import React from 'react'
import { shallow } from 'enzyme'
import Character, { CharacterProps } from './Character'
import { Icon } from '@chakra-ui/react'
import { Direction } from '../navigation'

describe('Character', () => {
  let props: CharacterProps

  const getCharacter = (
    directionFacing: Direction = Direction.Up,
    battleId?: string,
    lastUpdate: string = new Date().toString(),
    isCurrentPlayer: boolean = false,
    isSaveLocation: boolean = false
  ) => {
    props = {
      name: 'Redwan',
      directionFacing,
      isCurrentPlayer,
      isSaveLocation,
    }
    return shallow(<Character {...props} />)
  }

  it('is a div with a class name', () => {
    const subject = getCharacter()
    expect(subject.type()).toEqual('div')
    expect(subject.prop('className')).toEqual('player')
  })

  it("shows a hero's name on back when facing up", () => {
    const subject = getCharacter(Direction.Up, undefined, undefined, true)
    expect(subject.find('.hero').find('.player-name-back').text()).toEqual(
      'Redwan'
    )
  })

  it("shows a hero's name on chest when facing down", () => {
    const subject = getCharacter(Direction.Down, undefined, undefined, true)
    expect(subject.find('.hero').find('.player-name-front').text()).toEqual(
      'Redwan'
    )
  })

  it("shows a peer's name on back when facing up", () => {
    const subject = getCharacter(Direction.Up)
    expect(subject.find('.peer').find('.player-name-back').text()).toEqual(
      'Redwan'
    )
  })

  it("shows a peer's name on chest when facing down", () => {
    const subject = getCharacter(Direction.Down)
    expect(subject.find('.peer').find('.player-name-front').text()).toEqual(
      'Redwan'
    )
  })

  it('shows a heal-n-save notification when current user is at a save location', () => {
    const subject = getCharacter(
      Direction.Right,
      undefined,
      undefined,
      true,
      true
    )
    const saved = subject.find('.fade')
    const notifications = saved.find('p')
    expect(notifications.length).toEqual(2)
    expect(notifications.at(0).text()).toEqual('HP/MP restored')
    expect(notifications.at(1).text()).toEqual('Game saved')
  })

  it('shows a dragon icon if player is in battle', () => {
    const subject = getCharacter(Direction.Down, 'ff12ff34eeee')
    const icon = subject.find(Icon)
    // @ts-ignore
    expect(icon.prop('icon').iconName).toEqual('dragon')
  })

  it('shows a camping icon if player is not in battle and idle', () => {
    const now = new Date()
    const lastUpdate = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      now.getHours(),
      now.getMinutes() - 2
    )
    const subject = getCharacter(
      Direction.Down,
      undefined,
      lastUpdate.toString()
    )
    const icon = subject.find(Icon)
    // @ts-ignore
    expect(icon.prop('icon').iconName).toEqual('campground')
  })

  it('shows no icons if player is not in battle and not idle', () => {
    const now = new Date()
    const lastUpdate = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      now.getHours(),
      now.getMinutes(),
      now.getSeconds()
    )
    const subject = getCharacter(
      Direction.Down,
      undefined,
      lastUpdate.toString()
    )
    const icon = subject.find(Icon)
    expect(icon.exists()).toEqual(false)
  })
})

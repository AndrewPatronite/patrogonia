import React, * as ReactAlias from 'react'
import { shallow, ShallowWrapper } from 'enzyme'
import World from './World'
import { Legend } from '../maps/Legend'
import TileRow from './TileRow'
import * as DisplayRangeHelper from './helper/getMapDisplayRange'
import * as MapStateAlias from '../../state/MapState'
import * as LocationToPlayerHelper from './helper/getLocationToPlayerMap'
import * as Subscriptions from '../../subscription/subscribe'
import * as Sounds from '../sound/sound'
import PlayerStatsModal from '../../player/PlayerStatsModal'
import Player from '../../player/Player'

import { ModalEnum } from '../../context/ModalStateContext'
import { useModalState } from '../../hooks'

jest.mock('../../hooks', () => ({
  useCharacterPositions: jest.fn().mockReturnValue({
    canMoveToPosition: jest.fn(),
    setCharacterTalking: jest.fn(),
    updateCharacterPosition: jest.fn(),
  }),
  useModalState: jest.fn(),
  useNpcs: jest.fn(),
}))

describe('World', () => {
  const { WATER: W, GRASS: G } = Legend.symbols
  const map = {
    layout: [
      [W, W, W, W, W],
      [W, W, G, W, W],
      [W, G, 'Dewhurst', G, W],
      [W, W, G, W, W],
      [W, W, W, W, W],
    ],
  }
  const currentPlayer: Player = {
    id: 1,
    location: { mapName: 'Lava Grotto', rowIndex: 1, columnIndex: 2 },
    stats: { hp: 9 },
  }
  const anotherPlayer: Player = {
    id: 2,
    location: { mapName: 'Atoris', rowIndex: 3, columnIndex: 4 },
    stats: { hp: 10 },
  }
  const mapPlayers = {
    ['Atoris']: [anotherPlayer],
    ['Lava Grotto']: [currentPlayer],
  }
  const locationToPlayersMap = {
    '1-2': [currentPlayer],
  }

  let props: {
    currentPlayer: Player
    castSpell: (spellName: string, targetId: string) => void
    updatePlayer: (player: Player, updateToServer: boolean) => void
  }
  let subject: ShallowWrapper
  let playerLocationSubscription: { close: any }
  let modalState: {
    closeModal: (modalEnum: ModalEnum) => void
    isModalOpen: (modalEnum: ModalEnum) => boolean
    openModal: (
      modalEnum: ModalEnum,
      content?: any,
      onClose?: () => void
    ) => void
  }

  beforeEach(() => {
    modalState = {
      closeModal: jest.fn(),
      isModalOpen: jest.fn().mockReturnValue(false),
      openModal: jest.fn(),
    }
    ;(useModalState as jest.Mock).mockReturnValue(modalState)

    jest.spyOn(ReactAlias, 'useEffect').mockImplementation((effect) => effect())
    spyOn(Sounds, 'playSound')
    spyOn(Sounds, 'pauseSound')
    playerLocationSubscription = {
      close: jasmine.createSpy('close'),
    }
    spyOn(Subscriptions, 'subscribe').and.returnValue(
      playerLocationSubscription
    )
    spyOn(MapStateAlias, 'MapState').and.returnValue([map, mapPlayers])
    spyOn(LocationToPlayerHelper, 'getLocationToPlayerMap').and.returnValue(
      locationToPlayersMap
    )
    spyOn(DisplayRangeHelper, 'getMapDisplayRange').and.returnValue({
      rowStartIndex: 1,
      rowEndIndex: 3,
      columnStartIndex: 1,
      columnEndIndex: 3,
    })
    jest.useFakeTimers()
    props = {
      // @ts-ignore omitted props
      currentPlayer,
      playerUrl: 'wss://localhost:8443/players',
    }
    subject = shallow(<World {...props} />)
  })

  it('is a div with the expected className', () => {
    expect(subject.type()).toEqual('div')
    expect(subject.prop('className')).toEqual('world')
  })

  it('has TileRows for a subset of the map based on the display range', () => {
    const tileRows = subject.find(TileRow)
    expect(tileRows.length).toEqual(3)
    expect(tileRows.at(0).props()).toEqual({
      rowSymbols: map.layout[1],
      rowIndex: 1,
      locationToPlayersMap,
      displayIndexRange: {
        rowStartIndex: 1,
        rowEndIndex: 3,
        columnStartIndex: 1,
        columnEndIndex: 3,
      },
      mapLayout: map.layout,
      currentPlayer,
    })
    expect(tileRows.at(1).props()).toEqual({
      rowSymbols: map.layout[2],
      rowIndex: 2,
      locationToPlayersMap,
      displayIndexRange: {
        rowStartIndex: 1,
        rowEndIndex: 3,
        columnStartIndex: 1,
        columnEndIndex: 3,
      },
      mapLayout: map.layout,
      currentPlayer,
    })
    expect(tileRows.at(2).props()).toEqual({
      rowSymbols: map.layout[3],
      rowIndex: 3,
      locationToPlayersMap,
      displayIndexRange: {
        rowStartIndex: 1,
        rowEndIndex: 3,
        columnStartIndex: 1,
        columnEndIndex: 3,
      },
      mapLayout: map.layout,
      currentPlayer,
    })
  })

  it('has music for field maps', () => {
    const fieldMusic = subject.find('audio').at(0)
    expect(fieldMusic.props()).toEqual({
      className: 'field-music',
      autoPlay: true,
      loop: true,
      children: jasmine.anything(),
    })
    expect(fieldMusic.childAt(0).prop('src')).toEqual('BattleHighlands.mp3')
  })

  it('has music for cave maps', () => {
    const caveMusic = subject.find('audio').at(1)
    expect(caveMusic.props()).toEqual({
      className: 'cave-music',
      autoPlay: true,
      loop: true,
      children: jasmine.anything(),
    })
    expect(caveMusic.childAt(0).prop('src')).toEqual('AcrosstheSandWIP2.mp3')
  })

  describe('PlayerStatsModal', () => {
    it('has the expected props', () => {
      const playerStatsModal = subject.find(PlayerStatsModal)
      expect(playerStatsModal.props()).toEqual({
        showPlayerStats: false,
        onClose: jasmine.any(Function),
        stats: currentPlayer.stats,
      })
    })

    it('toggles the modal to be invisible onClose', () => {
      const playerStatsModal = subject.find(PlayerStatsModal)
      playerStatsModal.simulate('close')
      expect(modalState.closeModal).toHaveBeenCalledWith(ModalEnum.PlayerStats)
    })
  })

  it('plays field music for field maps', () => {
    props.currentPlayer = anotherPlayer
    subject = shallow(<World {...props} />)

    expect(Sounds.pauseSound).toHaveBeenCalledWith('cave-music')
    expect(Sounds.playSound).toHaveBeenCalledWith('field-music')
  })

  it('plays cave music for cave maps', () => {
    expect(Sounds.pauseSound).toHaveBeenCalledWith('field-music')
    expect(Sounds.playSound).toHaveBeenCalledWith('cave-music')
  })

  it('subscribes to player location notifications and closes the connection during unmounting', () => {
    expect(Subscriptions.subscribe).toHaveBeenCalledWith(
      props.playerUrl,
      jasmine.any(Function)
    )
    ReactAlias.useEffect.mock.calls[1][0]()()
    expect(playerLocationSubscription.close).toHaveBeenCalled()
  })

  it('sets show player stats modal via 5 second timer that it clears ', () => {
    expect(modalState.closeModal).toHaveBeenCalledWith(ModalEnum.PlayerStats)

    jest.runAllTimers()
    expect(setTimeout).toHaveBeenCalledWith(jasmine.any(Function), 5000)
    expect(modalState.openModal).toHaveBeenCalledWith(ModalEnum.PlayerStats)

    ReactAlias.useEffect.mock.calls[2][0]()()
    expect(clearTimeout).toHaveBeenCalled()
  })
})

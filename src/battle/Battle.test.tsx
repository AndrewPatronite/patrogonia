import React, * as ReactAlias from 'react'
import { shallow, ShallowWrapper } from 'enzyme'
import Battle from './Battle'
import { Battle as BattleType, Command, EnemyName } from './types'
import * as BattleClassHelper from './helper/getBattleStatusStyle'
import EnemyDisplay from './EnemyDisplay'
import Log from './Log'
import PlayerPanel from './PlayerPanel'
import ThemedPanel from '../components/theme/ThemedPanel'
import { Sound } from '../environment/sound'
import { useBattle, usePlayer, useSound } from '../hooks'
import { render } from '@testing-library/react'
import { BattleStatus } from './types/BattleStatus'
import { Cave } from '../environment/maps/Maps'

jest.mock('../hooks', () => ({
  useSound: jest.fn(),
  useBattle: jest.fn(),
  usePlayer: jest.fn(),
}))

describe('Battle', () => {
  const originalScrollIntoView = window.HTMLElement.prototype.scrollIntoView
  const currentPlayerId = 1
  const anotherPlayerId = 2
  const currentPlayer = {
    location: {
      mapName: Cave.LavaGrotto,
    },
  }
  let battle: BattleType
  const direBattleStatusStyle = {
    border: '2px solid #e31e2d',
  }
  let subject: ShallowWrapper
  let takeTurn: jest.Mock
  let dismissBattle: jest.Mock
  let playSound: jest.Mock
  let pauseSound: jest.Mock
  let updatePlayer: jest.Mock
  let loadSave: jest.Mock

  beforeEach(() => {
    battle = {
      enemies: [
        {
          id: '677d615c-32fe-4e8d-9992-3e110f26a185',
          name: EnemyName.Skeleton,
          stats: {
            hp: 20,
          },
        },
      ],
      log: [
        { content: 'Enemies approach.', delivered: true, round: 0 },
        {
          content: 'Redwan attacks Skeleton dealing 10 damage.',
          delivered: false,
          round: 1,
        },
      ],
      playerStats: {
        //@ts-ignore
        [currentPlayerId]: { playerId: currentPlayerId },
        //@ts-ignore
        [anotherPlayerId]: { playerId: anotherPlayerId },
      },
      roundPlayerActions: {
        //@ts-ignore
        [currentPlayerId]: Command.Attack,
        //@ts-ignore
        [anotherPlayerId]: Command.Parry,
      },
      status: BattleStatus.InProgress,
    }
    window.HTMLElement.prototype.scrollIntoView = jest.fn()
    playSound = jest.fn()
    pauseSound = jest.fn()
    ;(useSound as jest.Mock).mockReturnValue({
      playSound,
      pauseSound,
    })
    loadSave = jest.fn()
    updatePlayer = jest.fn()
    ;(usePlayer as jest.Mock).mockReturnValue({
      currentPlayer,
      loadSave,
      updatePlayer,
    })
    takeTurn = jest.fn()
    dismissBattle = jest.fn()
    ;(useBattle as jest.Mock).mockReturnValue({
      battle,
      takeTurn,
      dismissBattle,
    })

    jest
      .spyOn(BattleClassHelper, 'getBattleStatusStyle')
      .mockReturnValue(direBattleStatusStyle)
    jest.spyOn(ReactAlias, 'useEffect').mockImplementation((effect) => effect())
    subject = shallow(<Battle />)
  })

  afterEach(() => {
    window.HTMLElement.prototype.scrollIntoView = originalScrollIntoView
  })

  it('is a ThemedPanel', () => {
    expect(subject.type()).toEqual(ThemedPanel)
  })

  it('has an EnemyDisplay with the expected props', () => {
    const enemyDisplay = subject.find(EnemyDisplay)
    expect(enemyDisplay.props()).toEqual({
      mapName: Cave.LavaGrotto,
      enemies: battle.enemies,
      selectedEnemyId: undefined,
      deliveredLogEntries: [
        { content: 'Enemies approach.', delivered: true, round: 0 },
      ],
    })
  })

  describe('Log', () => {
    it('has the expected props', () => {
      const log = subject.find(Log)
      expect(log.props()).toEqual({
        deliveredEntries: [
          { content: 'Enemies approach.', delivered: true, round: 0 },
        ],
        onDismiss: expect.any(Function),
        showDismiss: false,
        battleStatusStyle: direBattleStatusStyle,
        allMessagesDelivered: false,
      })
    })

    it('calls dismissBattle supplied by BattleState', () => {
      const log = subject.find(Log)
      log.simulate('dismiss', battle)
      expect(dismissBattle).toHaveBeenCalledWith(battle)
    })
  })

  describe('PlayerPanel', () => {
    let playerPanel: any

    beforeEach(() => {
      playerPanel = subject.find(PlayerPanel).at(0)
    })

    it('has a PlayerPanel with the expected props for each player', () => {
      const playerPanels = subject.find(PlayerPanel)
      expect(playerPanels.length).toEqual(2)
      expect(playerPanels.at(0).props()).toEqual({
        currentPlayer: currentPlayer,
        playerStats: { playerId: currentPlayerId },
        players: [{ playerId: currentPlayerId }, { playerId: anotherPlayerId }],
        battleStatusStyle: direBattleStatusStyle,
        enemies: battle.enemies,
        selectEnemy: expect.any(Function),
        takeTurn: expect.any(Function),
        roundPlayerActions: battle.roundPlayerActions,
        selectedEnemyId: undefined,
        playerTurnEnabled: true,
        loadSave,
        updatePlayer,
      })
      expect(playerPanels.at(1).props()).toEqual({
        currentPlayer: currentPlayer,
        playerStats: { playerId: anotherPlayerId },
        players: [{ playerId: currentPlayerId }, { playerId: anotherPlayerId }],
        battleStatusStyle: direBattleStatusStyle,
        enemies: battle.enemies,
        selectEnemy: expect.any(Function),
        takeTurn: expect.any(Function),
        roundPlayerActions: battle.roundPlayerActions,
        selectedEnemyId: undefined,
        playerTurnEnabled: true,
        loadSave,
        updatePlayer,
      })
    })

    it('updates the selected enemy', () => {
      expect(
        subject.find(EnemyDisplay).prop('selectedEnemyId')
      ).not.toBeDefined()
      expect(playerPanel.prop('selectedEnemyId')).not.toBeDefined()

      playerPanel.prop('selectEnemy')('677d615c-32fe-4e8d-9992-3e110f26a185')

      expect(subject.find(EnemyDisplay).prop('selectedEnemyId')).toEqual(
        '677d615c-32fe-4e8d-9992-3e110f26a185'
      )
      expect(subject.find(PlayerPanel).at(0).prop('selectedEnemyId')).toEqual(
        '677d615c-32fe-4e8d-9992-3e110f26a185'
      )
    })

    it('via takeTurn, it submits turn, hides the players panels until the next turn, and clears selected enemy', () => {
      expect(subject.find(PlayerPanel).exists()).toEqual(true)
      playerPanel.prop('selectEnemy')('677d615c-32fe-4e8d-9992-3e110f26a185')
      expect(subject.find(EnemyDisplay).prop('selectedEnemyId')).toEqual(
        '677d615c-32fe-4e8d-9992-3e110f26a185'
      )
      const selectedEnemyId = '677d615c-32fe-4e8d-9992-3e110f26a185'

      playerPanel.prop('takeTurn')('attack', selectedEnemyId)

      expect(takeTurn).toHaveBeenCalledWith('attack', selectedEnemyId)
      expect(subject.find(PlayerPanel).exists()).toEqual(false)
      expect(
        subject.find(EnemyDisplay).prop('selectedEnemyId')
      ).not.toBeDefined()
    })

    it('calls the loadSave provided by props', () => {
      playerPanel.prop('loadSave')()

      expect(loadSave).toHaveBeenCalled()
    })
  })

  it('plays battle music via useEffect', () => {
    render(<Battle />)
    expect(playSound).toHaveBeenCalledWith(Sound.BattleMusic, [
      Sound.FieldMusic,
      Sound.CaveMusic,
    ])
  })

  it('enables next player turn after all log messages have been delivered, via useEffect', () => {
    battle.log[1].delivered = true
    render(<Battle />)
    expect(pauseSound).not.toHaveBeenCalled()
  })

  it('pauses battle music and hides the players panel when the battle is over and all log messages have been delivered, via useEffect', () => {
    battle.status = BattleStatus.Victory
    battle.log[1].delivered = true
    render(<Battle />)

    expect(pauseSound).toHaveBeenCalledWith(Sound.BattleMusic)
  })
})

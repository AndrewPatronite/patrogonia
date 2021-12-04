import React, * as ReactAlias from 'react'
import { shallow, ShallowWrapper } from 'enzyme'
import FieldMenu from './FieldMenu'
import Spell from './Spell'
import OptionPanel from '../battle/OptionPanel'
import PlayerStatsPanel from './PlayerStatsPanel'
import PlayerSpells from './PlayerSpells'
import ThemedPanel from '../components/theme/ThemedPanel'
import { Drawer } from '@chakra-ui/react'

describe('FieldMenu', () => {
  const availableSpells: Spell[] = [
    { spellName: 'HEAL', mpCost: 5, offensive: false, battleSpell: true },
    {
      spellName: 'RETURN',
      mpCost: 7,
      offensive: false,
      battleSpell: false,
    },
    {
      spellName: 'OUTSIDE',
      mpCost: 7,
      offensive: false,
      battleSpell: false,
    },
  ]
  let props: any
  let closeFieldMenu: jasmine.Spy
  let castSpell: jasmine.Spy
  let setMenuChoice: jasmine.Spy
  let subject: ShallowWrapper

  beforeEach(() => {
    closeFieldMenu = jasmine.createSpy('closeFieldMenu')
    castSpell = jasmine.createSpy('castSpell')
    setMenuChoice = jasmine.createSpy('setMenuChoice')
    jest
      .spyOn(ReactAlias, 'useState')
      .mockImplementation(() => ['playerStats', setMenuChoice])
    props = {
      showFieldMenu: true,
      closeFieldMenu,
      currentPlayer: {
        id: 1,
        name: 'Redwan',
        loggedIn: true,
        battleId: undefined,
        spells: availableSpells,
        stats: {
          playerName: 'Redwan',
          level: 5,
          hp: 40,
          hpTotal: 54,
          mp: 20,
          mpTotal: 27,
          gold: 10000,
          xp: 160,
          xpTillNextLevel: 80,
          attack: 20,
          defense: 10,
          agility: 12,
        },
        location: {
          mapName: 'Atoris',
          rowIndex: 5,
          columnIndex: 7,
          facing: 'down',
          entranceName: 'Lava Grotto',
        },
        lastUpdate: '',
        showFieldMenu: true,
        visited: ['Dewhurst'],
      },
      castSpell,
    }
    subject = shallow(<FieldMenu {...props} />)
  })

  it('is a Drawer with the expected props exposing a field menu', () => {
    expect(subject.type()).toEqual(Drawer)
    expect(subject.prop('className')).toEqual('field-menu-modal')
    expect(subject.prop('isOpen')).toEqual(true)
    expect(subject.prop('onRequestClose')).toEqual(closeFieldMenu)
    expect(subject.prop('style')).toEqual({
      content: {
        top: '30%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        maxWidth: '339px',
        transform: 'translate(5%, 5%)',
      },
    })
    expect(subject.find('.field-menu').type()).toEqual(ThemedPanel)
  })

  it('calls closeFieldMenu when requested', () => {
    // @ts-ignore
    subject.prop('onRequestClose')()
    expect(closeFieldMenu).toHaveBeenCalled()
  })

  it('has an OptionPanel with the expected options', () => {
    const optionPanel = subject.find(OptionPanel)
    expect(optionPanel.props()).toEqual({
      options: [
        { value: 'playerStats', display: 'Stats' },
        {
          value: 'spells',
          display: 'Spells',
          disabled: false,
        },
        {
          display: 'Options',
          value: 'playerOptions',
        },
      ],
      onBack: jasmine.any(Function),
      onNext: jasmine.any(Function),
      onChange: setMenuChoice,
      isBackEnabled: false,
      showNextButton: false,
      initialValue: 'playerStats',
    })
  })

  it("has an OptionPanel with the spells disabled if the player doesn't have any available", () => {
    props.currentPlayer.stats.mp = 2
    subject = shallow(<FieldMenu {...props} />)
    const optionPanel = subject.find(OptionPanel)
    expect(optionPanel.props()).toEqual({
      options: [
        { value: 'playerStats', display: 'Stats' },
        {
          value: 'spells',
          display: 'Spells',
          disabled: true,
        },
        {
          display: 'Options',
          value: 'playerOptions',
        },
      ],
      onBack: jasmine.any(Function),
      onNext: jasmine.any(Function),
      onChange: setMenuChoice,
      isBackEnabled: false,
      showNextButton: false,
      initialValue: 'playerStats',
    })
  })

  it('displays a PlayerStatsPanel initially with the expected props', () => {
    const playerStatsPanel = subject.find(PlayerStatsPanel)
    expect(playerStatsPanel.props()).toEqual({
      playerStats: props.currentPlayer.stats,
    })
  })

  it('sets the menu choice via the OptionPanel', () => {
    const optionPanel = subject.find(OptionPanel)
    // @ts-ignore
    optionPanel.prop('onChange')('spells')
    expect(setMenuChoice).toHaveBeenCalledWith('spells')
  })

  describe('PlayerSpells', () => {
    beforeEach(() => {
      jest
        .spyOn(ReactAlias, 'useState')
        .mockImplementation(() => ['spells', setMenuChoice])
    })

    it('displays PlayerSpells when chosen with the expected outdoor spells', () => {
      subject = shallow(<FieldMenu {...props} />)
      const playerSpells = subject.find(PlayerSpells)
      expect(playerSpells.props()).toEqual({
        currentPlayer: props.currentPlayer,
        availableSpells: [
          {
            battleSpell: true,
            mpCost: 5,
            offensive: false,
            spellName: 'HEAL',
          },
          {
            battleSpell: false,
            mpCost: 7,
            offensive: false,
            spellName: 'RETURN',
          },
        ],
        onBack: jasmine.any(Function),
        castSpell,
      })
    })

    it('displays PlayerSpells when chosen with the expected cave spells', () => {
      props.currentPlayer.location.mapName = 'Lava Grotto'
      subject = shallow(<FieldMenu {...props} />)
      const playerSpells = subject.find(PlayerSpells)
      expect(playerSpells.props()).toEqual({
        currentPlayer: props.currentPlayer,
        availableSpells: [
          {
            battleSpell: true,
            mpCost: 5,
            offensive: false,
            spellName: 'HEAL',
          },
          {
            battleSpell: false,
            mpCost: 7,
            offensive: false,
            spellName: 'OUTSIDE',
          },
        ],
        onBack: jasmine.any(Function),
        castSpell,
      })
    })

    it('displays PlayerSpells without HEAL when player is at full health', () => {
      props.currentPlayer.stats.hp = props.currentPlayer.stats.hpTotal
      subject = shallow(<FieldMenu {...props} />)
      const playerSpells = subject.find(PlayerSpells)
      expect(playerSpells.props()).toEqual({
        currentPlayer: props.currentPlayer,
        availableSpells: [
          {
            battleSpell: false,
            mpCost: 7,
            offensive: false,
            spellName: 'RETURN',
          },
        ],
        onBack: jasmine.any(Function),
        castSpell,
      })
    })

    it('sets the menu choice to player stats on back', () => {
      const optionPanelRef = {
        current: {
          focus: jasmine.createSpy('focus'),
        },
      }
      jest.spyOn(ReactAlias, 'useRef').mockImplementation(() => optionPanelRef)
      subject = shallow(<FieldMenu {...props} />)
      const playerSpells = subject.find(PlayerSpells)
      playerSpells.prop('onBack')()
      expect(optionPanelRef.current.focus).toHaveBeenCalled()
    })
  })
})

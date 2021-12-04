import React from 'react'
import { shallow } from 'enzyme'
import PlayerTurnWizard from './PlayerTurnWizard'
import CommandPanel from './CommandPanel'
import EnemySelectionPanel from './EnemySelectionPanel'
import PlayerSelectionPanel from './PlayerSelectionPanel'

describe('PlayerTurnWizard', () => {
  const currentPlayer = {
    id: 1,
    name: 'Redwan',
  }
  const anotherPlayer = {
    id: 2,
    name: 'Andy',
  }
  const anotherEnemyId = 'cccc123'
  let props
  let subject

  beforeEach(() => {
    props = {
      currentPlayer,
      players: [currentPlayer, anotherPlayer],
      enemies: [
        { id: 'abcdef123123', name: 'Skeleton', stats: { hp: 20 } },
        { id: anotherEnemyId, name: 'Knight', stats: { hp: 25 } },
      ],
      selectEnemy: jasmine.createSpy('selectEnemy'),
      takeTurn: jasmine.createSpy('takeTurn'),
      selectedEnemyId: 'abcdef123123',
      playerTurnEnabled: true,
    }
    subject = shallow(<PlayerTurnWizard {...props} />)
  })

  describe('command', () => {
    it('is a CommandPanel with the expected props', () => {
      const commandPanel = subject.find(CommandPanel)
      expect(commandPanel.props()).toEqual({
        currentPlayer,
        handleCommand: jasmine.any(Function),
      })
    })

    it('submits turn if command is "parry"', () => {
      const commandPanel = subject.find(CommandPanel)
      commandPanel.prop('handleCommand')('parry')
      expect(props.takeTurn).toHaveBeenCalledWith('parry')
    })

    it('submits turn if command is "run"', () => {
      const commandPanel = subject.find(CommandPanel)
      commandPanel.prop('handleCommand')('run')
      expect(props.takeTurn).toHaveBeenCalledWith('run')
    })

    it('advances to EnemySelectionPanel if command is "attack"', () => {
      const commandPanel = subject.find(CommandPanel)
      commandPanel.prop('handleCommand')('attack')
      expect(props.takeTurn).not.toHaveBeenCalled()
      expect(subject.find(EnemySelectionPanel).exists()).toEqual(true)
    })

    it('advances to EnemySelectionPanel if command is an offensive spell', () => {
      const commandPanel = subject.find(CommandPanel)
      const iceSpell = JSON.stringify({
        spellName: 'ICE',
        offensive: true,
      })
      commandPanel.prop('handleCommand')(iceSpell)
      expect(props.takeTurn).not.toHaveBeenCalled()
      expect(subject.find(EnemySelectionPanel).exists()).toEqual(true)
    })

    it('advances to PlayerSelectionPanel if command is a defensive spell', () => {
      const commandPanel = subject.find(CommandPanel)
      const healSpell = JSON.stringify({ spellName: 'HEAL' })
      commandPanel.prop('handleCommand')(healSpell)
      expect(props.takeTurn).not.toHaveBeenCalled()
      expect(subject.find(PlayerSelectionPanel).exists()).toEqual(true)
    })
  })

  describe('attack - EnemySelectionPanel', () => {
    let enemySelectionPanel

    beforeEach(() => {
      const commandPanel = subject.find(CommandPanel)
      commandPanel.prop('handleCommand')('attack')
      enemySelectionPanel = subject.find(EnemySelectionPanel)
    })

    it('is a EnemySelectionPanel with the expected props', () => {
      expect(enemySelectionPanel.props()).toEqual({
        enemies: props.enemies,
        action: 'attack',
        handleBack: jasmine.any(Function),
        handleNext: jasmine.any(Function),
        selectEnemy: props.selectEnemy,
        selectedEnemyId: props.selectedEnemyId,
        playerTurnEnabled: props.playerTurnEnabled,
      })
    })

    it('returns to the CommandPanel onBack', () => {
      expect(subject.find(CommandPanel).exists()).toEqual(false)

      enemySelectionPanel.prop('handleBack')()

      expect(subject.find(CommandPanel).exists()).toEqual(true)
    })

    it('submits the turn onNext', () => {
      enemySelectionPanel.prop('handleNext')(props.selectedEnemyId)

      expect(props.takeTurn).toHaveBeenCalledWith(
        'attack',
        props.selectedEnemyId
      )
    })

    it('calls selectEnemy provided via props', () => {
      enemySelectionPanel.prop('selectEnemy')(anotherEnemyId)

      expect(props.selectEnemy).toHaveBeenCalledWith(anotherEnemyId)
    })
  })

  describe('offensive spell - EnemySelectionPanel', () => {
    const iceSpell = JSON.stringify({ spellName: 'ICE', offensive: true })
    let enemySelectionPanel

    beforeEach(() => {
      const commandPanel = subject.find(CommandPanel)
      commandPanel.prop('handleCommand')(iceSpell)
      enemySelectionPanel = subject.find(EnemySelectionPanel)
    })

    it('is a EnemySelectionPanel with the expected props', () => {
      expect(enemySelectionPanel.props()).toEqual({
        enemies: props.enemies,
        action: 'Ice',
        handleBack: jasmine.any(Function),
        handleNext: jasmine.any(Function),
        selectEnemy: props.selectEnemy,
        selectedEnemyId: props.selectedEnemyId,
        playerTurnEnabled: props.playerTurnEnabled,
      })
    })

    it('returns to the CommandPanel onBack', () => {
      expect(subject.find(CommandPanel).exists()).toEqual(false)

      enemySelectionPanel.prop('handleBack')()

      expect(subject.find(CommandPanel).exists()).toEqual(true)
    })

    it('submits the turn onNext', () => {
      enemySelectionPanel.prop('handleNext')(props.selectedEnemyId)

      expect(props.takeTurn).toHaveBeenCalledWith('Ice', props.selectedEnemyId)
    })

    it('calls selectEnemy provided via props', () => {
      enemySelectionPanel.prop('selectEnemy')(anotherEnemyId)

      expect(props.selectEnemy).toHaveBeenCalledWith(anotherEnemyId)
    })
  })

  describe('defensive spell - PlayerSelectionPanel', () => {
    const healSpell = JSON.stringify({ spellName: 'HEAL' })
    let playerSelectionPanel

    beforeEach(() => {
      const commandPanel = subject.find(CommandPanel)
      commandPanel.prop('handleCommand')(healSpell)
      playerSelectionPanel = subject.find(PlayerSelectionPanel)
    })

    it('is a PlayerSelectionPanel with the expected props', () => {
      expect(playerSelectionPanel.props()).toEqual({
        players: props.players,
        action: 'Heal',
        handleBack: jasmine.any(Function),
        handleNext: jasmine.any(Function),
        isBackEnabled: true,
      })
    })

    it('returns to the CommandPanel onBack', () => {
      expect(subject.find(CommandPanel).exists()).toEqual(false)

      playerSelectionPanel.prop('handleBack')()

      expect(subject.find(CommandPanel).exists()).toEqual(true)
    })

    it('submits the turn onNext', () => {
      playerSelectionPanel.prop('handleNext')(anotherPlayer.id)

      expect(props.takeTurn).toHaveBeenCalledWith('Heal', anotherPlayer.id)
    })

    it('heals the current player if there are no others to choose', () => {
      props.players.pop()
      subject = shallow(<PlayerTurnWizard {...props} />)
      const commandPanel = subject.find(CommandPanel)
      commandPanel.prop('handleCommand')(healSpell)
      playerSelectionPanel = subject.find(PlayerSelectionPanel)
      expect(playerSelectionPanel.exists()).toEqual(false)

      expect(props.takeTurn).toHaveBeenCalledWith('Heal', currentPlayer.id)
    })
  })
})

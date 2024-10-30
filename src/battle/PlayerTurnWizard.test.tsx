import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import PlayerTurnWizard, { PlayerTurnWizardProps } from './PlayerTurnWizard';
import CommandPanel from './CommandPanel';
import EnemySelectionPanel from './EnemySelectionPanel';
import PlayerSelectionPanel from './PlayerSelectionPanel';
import { Player, Spell } from '../player';
import { Command, EnemyName } from './types';

describe('PlayerTurnWizard', () => {
  //@ts-expect-error missing Player fields
  const currentPlayer: Player = {
    id: 1,
    name: 'Redwan',
    tutorialLessons: [],
  };
  //@ts-expect-error missing Player fields
  const anotherPlayer: Player = {
    id: 2,
    name: 'Andy',
  };
  const iceSpell: Spell = {
    spellName: 'ICE',
    battleSpell: true,
    offensive: true,
    mpCost: 5,
  };
  const healSpell: Spell = {
    spellName: 'HEAL',
    battleSpell: true,
    offensive: false,
    mpCost: 5,
  };
  const anotherEnemyId = 'cccc123';
  let props: PlayerTurnWizardProps;
  let subject: ShallowWrapper;

  beforeEach(() => {
    props = {
      currentPlayer,
      //@ts-expect-error missing Player fields
      players: [currentPlayer, anotherPlayer],
      enemies: [
        { id: 'abcdef123123', name: EnemyName.Skeleton, stats: { hp: 20 } },
        { id: anotherEnemyId, name: EnemyName.Knight, stats: { hp: 25 } },
      ],
      selectEnemy: jest.fn(),
      takeTurn: jest.fn(),
      selectedEnemyId: 'abcdef123123',
      playerTurnEnabled: true,
      mp: 5,
      updatePlayer: jest.fn(),
    };
    subject = shallow(<PlayerTurnWizard {...props} />);
  });

  describe('command', () => {
    it('is a CommandPanel with the expected props', () => {
      const commandPanel = subject.find(CommandPanel);
      expect(commandPanel.props()).toEqual({
        currentPlayer,
        handleCommand: expect.any(Function),
        mp: props.mp,
      });
    });

    it('submits turn if command is "parry"', () => {
      const commandPanel = subject.find(CommandPanel);
      commandPanel.prop('handleCommand')(Command.Parry);
      expect(props.takeTurn).toHaveBeenCalledWith(Command.Parry);
    });

    it('submits turn if command is "run"', () => {
      const commandPanel = subject.find(CommandPanel);
      commandPanel.prop('handleCommand')(Command.Run);
      expect(props.takeTurn).toHaveBeenCalledWith(Command.Run);
    });

    it('advances to EnemySelectionPanel if command is "attack"', () => {
      const commandPanel = subject.find(CommandPanel);
      commandPanel.prop('handleCommand')(Command.Attack);
      expect(props.takeTurn).not.toHaveBeenCalled();
      expect(subject.find(EnemySelectionPanel).exists()).toEqual(true);
    });

    it('advances to EnemySelectionPanel if command is an offensive spell', () => {
      const commandPanel = subject.find(CommandPanel);
      commandPanel.prop('handleCommand')(iceSpell);
      expect(props.takeTurn).not.toHaveBeenCalled();
      expect(subject.find(EnemySelectionPanel).exists()).toEqual(true);
    });

    it('advances to PlayerSelectionPanel if command is a defensive spell', () => {
      const commandPanel = subject.find(CommandPanel);
      commandPanel.prop('handleCommand')(healSpell);
      expect(props.takeTurn).not.toHaveBeenCalled();
      expect(subject.find(PlayerSelectionPanel).exists()).toEqual(true);
    });
  });

  describe('attack - EnemySelectionPanel', () => {
    let enemySelectionPanel: ShallowWrapper<any>;

    beforeEach(() => {
      const commandPanel = subject.find(CommandPanel);
      commandPanel.prop('handleCommand')(Command.Attack);
      enemySelectionPanel = subject.find(EnemySelectionPanel);
    });

    it('is a EnemySelectionPanel with the expected props', () => {
      expect(enemySelectionPanel.props()).toEqual({
        currentPlayer,
        enemies: props.enemies,
        action: Command.Attack,
        handleBack: expect.any(Function),
        handleNext: expect.any(Function),
        selectEnemy: props.selectEnemy,
        selectedEnemyId: props.selectedEnemyId,
        playerTurnEnabled: props.playerTurnEnabled,
      });
    });

    it('returns to the CommandPanel onBack', () => {
      expect(subject.find(CommandPanel).exists()).toEqual(false);

      enemySelectionPanel.prop('handleBack')();

      expect(subject.find(CommandPanel).exists()).toEqual(true);
    });

    it('submits the turn onNext', () => {
      enemySelectionPanel.prop('handleNext')(props.selectedEnemyId);

      expect(props.updatePlayer).toHaveBeenCalledWith({
        ...currentPlayer,
        tutorialLessons: [
          ...currentPlayer.tutorialLessons,
          'BattleCommandLesson',
        ],
      });
      expect(props.takeTurn).toHaveBeenCalledWith(
        Command.Attack,
        props.selectedEnemyId
      );
    });

    it('calls selectEnemy provided via props', () => {
      enemySelectionPanel.prop('selectEnemy')(anotherEnemyId);

      expect(props.selectEnemy).toHaveBeenCalledWith(anotherEnemyId);
    });
  });

  describe('offensive spell - EnemySelectionPanel', () => {
    let enemySelectionPanel: ShallowWrapper<any>;

    beforeEach(() => {
      const commandPanel = subject.find(CommandPanel);
      commandPanel.prop('handleCommand')(iceSpell);
      enemySelectionPanel = subject.find(EnemySelectionPanel);
    });

    it('is a EnemySelectionPanel with the expected props', () => {
      expect(enemySelectionPanel.props()).toEqual({
        currentPlayer,
        enemies: props.enemies,
        action: 'Ice',
        handleBack: expect.any(Function),
        handleNext: expect.any(Function),
        selectEnemy: props.selectEnemy,
        selectedEnemyId: props.selectedEnemyId,
        playerTurnEnabled: props.playerTurnEnabled,
      });
    });

    it('returns to the CommandPanel onBack', () => {
      expect(subject.find(CommandPanel).exists()).toEqual(false);

      enemySelectionPanel.prop('handleBack')();

      expect(subject.find(CommandPanel).exists()).toEqual(true);
    });

    it('submits the turn onNext', () => {
      enemySelectionPanel.prop('handleNext')(props.selectedEnemyId);

      expect(props.updatePlayer).toHaveBeenCalledWith({
        ...currentPlayer,
        tutorialLessons: [
          ...currentPlayer.tutorialLessons,
          'BattleTargetLesson',
        ],
      });
      expect(props.takeTurn).toHaveBeenCalledWith('Ice', props.selectedEnemyId);
    });

    it('calls selectEnemy provided via props', () => {
      enemySelectionPanel.prop('selectEnemy')(anotherEnemyId);

      expect(props.selectEnemy).toHaveBeenCalledWith(anotherEnemyId);
    });
  });

  describe('defensive spell - PlayerSelectionPanel', () => {
    let playerSelectionPanel: ShallowWrapper<any>;

    beforeEach(() => {
      const commandPanel = subject.find(CommandPanel);
      commandPanel.prop('handleCommand')(healSpell);
      playerSelectionPanel = subject.find(PlayerSelectionPanel);
    });

    it('is a PlayerSelectionPanel with the expected props', () => {
      expect(playerSelectionPanel.props()).toEqual({
        players: props.players,
        action: 'Heal',
        handleBack: expect.any(Function),
        handleNext: expect.any(Function),
        isBackEnabled: true,
      });
    });

    it('returns to the CommandPanel onBack', () => {
      expect(subject.find(CommandPanel).exists()).toEqual(false);

      playerSelectionPanel.prop('handleBack')();

      expect(subject.find(CommandPanel).exists()).toEqual(true);
    });

    it('submits the turn onNext', () => {
      playerSelectionPanel.prop('handleNext')(anotherPlayer.id);

      expect(props.takeTurn).toHaveBeenCalledWith('Heal', anotherPlayer.id);
    });

    it('heals the current player if there are no others to choose', () => {
      props.players.pop();
      subject = shallow(<PlayerTurnWizard {...props} />);
      const commandPanel = subject.find(CommandPanel);
      commandPanel.prop('handleCommand')(healSpell);
      playerSelectionPanel = subject.find(PlayerSelectionPanel);
      expect(playerSelectionPanel.exists()).toEqual(false);

      expect(props.takeTurn).toHaveBeenCalledWith('Heal', currentPlayer.id);
    });
  });
});

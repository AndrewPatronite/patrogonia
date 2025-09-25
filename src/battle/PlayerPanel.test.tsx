import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import PlayerPanel, { PlayerPanelProps } from './PlayerPanel';
import PlayerTurnWizard from './PlayerTurnWizard';
import ThemedPanel from '../components/theme/ThemedPanel';
import { Command, EnemyName } from './types';
import { Player, Stats } from '../player';
import { Button, Stack } from '@chakra-ui/react';

describe('PlayerPanel', () => {
  const direBorder = '2px solid #e31e2d';
  const currentPlayerId = 1;
  const getLoadSaveButton = (subject: ShallowWrapper) =>
    subject.findWhere(
      (element) => element.type() === Button && element.text() === 'Load save'
    );
  let props: PlayerPanelProps;
  let subject: ShallowWrapper<any>;

  beforeEach(() => {
    const playerStats: Stats = {
      agility: 12,
      attack: 20,
      defense: 10,
      gold: 0,
      xp: 0,
      xpTillNextLevel: 0,
      playerId: currentPlayerId,
      playerName: 'Redwan',
      level: 5,
      hp: 50,
      hpTotal: 54,
      mp: 17,
      mpTotal: 27,
    };
    //@ts-expect-error missing Player fields
    const currentPlayer: Player = { id: currentPlayerId };

    props = {
      currentPlayer,
      playerStats,
      players: [playerStats, { ...playerStats, playerId: 2 }],
      battleStatusStyle: { border: direBorder },
      enemies: [{ id: 'ccc123eee', name: EnemyName.Knight, stats: { hp: 25 } }],
      selectEnemy: jest.fn(),
      takeTurn: jest.fn(),
      roundPlayerActions: {},
      selectedEnemyId: 'ccc123eee',
      playerTurnEnabled: true,
      loadSave: jest.fn(),
      updatePlayer: jest.fn(),
    };
    subject = shallow(<PlayerPanel {...props} />);
  });

  it('is a ThemedPanel with the expected battle status style', () => {
    expect(subject.type()).toEqual(ThemedPanel);
    expect(subject.prop('sx')).toEqual({
      border: direBorder,
    });
  });

  it('has a Stack containing player stats', () => {
    const playerStats = subject.find(Stack);
    const statsLabels = playerStats.find('label');
    expect(statsLabels.length).toEqual(4);
    expect(statsLabels.at(0).text()).toEqual('Player: Redwan');
    expect(statsLabels.at(1).text()).toEqual('Level: 5');
    expect(statsLabels.at(2).text()).toEqual('HP: 50/54');
    expect(statsLabels.at(3).text()).toEqual('MP: 17/27');
  });

  it("has no controls when it's not the current player's turn", () => {
    props.roundPlayerActions[currentPlayerId] = {
      action: Command.Attack,
      targetId: props.enemies[0].id,
    };
    subject = shallow(<PlayerPanel {...props} />);
    expect(subject.find(PlayerTurnWizard).exists()).toEqual(false);
    expect(getLoadSaveButton(subject).exists()).toEqual(false);
  });

  it("has a PlayerTurnWizard when it's the current player's turn", () => {
    expect(subject.find(PlayerTurnWizard).exists()).toEqual(true);
    expect(getLoadSaveButton(subject).exists()).toEqual(false);
  });

  it("has a load save button when it's the current player's turn but player is dead", () => {
    props.playerStats.hp = 0;
    subject = shallow(<PlayerPanel {...props} />);
    expect(subject.find(PlayerTurnWizard).exists()).toEqual(false);
    expect(getLoadSaveButton(subject).exists()).toEqual(true);
  });

  describe('PlayerTurnWizard', () => {
    let playerTurnWizard: ShallowWrapper<any>;

    beforeEach(() => {
      playerTurnWizard = subject.find(PlayerTurnWizard);
    });

    it('has the expected props', () => {
      expect(playerTurnWizard.props()).toEqual({
        currentPlayer: props.currentPlayer,
        players: props.players,
        enemies: [
          { id: 'ccc123eee', name: EnemyName.Knight, stats: { hp: 25 } },
        ],
        selectEnemy: props.selectEnemy,
        takeTurn: props.takeTurn,
        selectedEnemyId: 'ccc123eee',
        playerTurnEnabled: true,
        mp: props.playerStats.mp,
        updatePlayer: props.updatePlayer,
      });
    });

    it('calls selectEnemy supplied via props', () => {
      playerTurnWizard.prop('selectEnemy')('ccc123eee');
      expect(props.selectEnemy).toHaveBeenCalledWith('ccc123eee');
    });

    it('calls takeTurn supplied via props', () => {
      playerTurnWizard.prop('takeTurn')();
      expect(props.takeTurn).toHaveBeenCalled();
    });
  });

  describe('Load save button', () => {
    let loadSaveButton: ShallowWrapper<any>;

    beforeEach(() => {
      props.playerStats.hp = 0;
      subject = shallow(<PlayerPanel {...props} />);
      loadSaveButton = getLoadSaveButton(subject);
    });

    it('has the expected text', () => {
      expect(loadSaveButton.text()).toEqual('Load save');
    });

    it('calls loadSave supplied via props onClick', () => {
      loadSaveButton.simulate('click');
      expect(props.loadSave).toHaveBeenCalled();
    });
  });
});

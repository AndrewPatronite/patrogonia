import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import FieldMenu from './FieldMenu';
import PlayerStatsPanel from './PlayerStatsPanel';
import PlayerSpells from './PlayerSpells';
import { Drawer, Tab, TabList } from '@chakra-ui/react';
import { Player, Spell } from './types';
import { Direction } from '../navigation';
import { CaveName, ContinentName, TownName } from '../environment/maps/types';

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
  ];
  let currentPlayer: Player;
  let closeFieldMenu: jest.Mock;
  let castSpell: jest.Mock;
  let subject: ShallowWrapper;

  beforeEach(() => {
    closeFieldMenu = jest.fn();
    castSpell = jest.fn();
    currentPlayer = {
      id: 1,
      name: 'Redwan',
      loggedIn: true,
      battleId: undefined,
      spells: availableSpells,
      stats: {
        playerId: 1,
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
        mapName: ContinentName.Atoris,
        rowIndex: 5,
        columnIndex: 7,
        facing: Direction.Down,
        entranceName: CaveName.LavaGrotto,
      },
      lastUpdate: '',
      visited: [TownName.Dewhurst],
      tutorialLessons: [],
    };
    subject = shallow(
      <FieldMenu
        showFieldMenu={true}
        closeFieldMenu={closeFieldMenu}
        currentPlayer={currentPlayer}
        castSpell={castSpell}
      />
    );
  });

  it('is a Drawer with the expected props exposing a field menu', () => {
    expect(subject.type()).toEqual(Drawer);
    expect(subject.prop('size')).toEqual('sm');
    expect(subject.prop('placement')).toEqual('left');
    expect(subject.prop('onClose')).toEqual(closeFieldMenu);
    expect(subject.prop('isOpen')).toEqual(true);
  });

  it('has a TabList with the expected options', () => {
    subject = shallow(
      <FieldMenu
        showFieldMenu={true}
        closeFieldMenu={closeFieldMenu}
        currentPlayer={currentPlayer}
        castSpell={castSpell}
      />
    );
    const tabList = subject.find(TabList).find(Tab);
    expect(tabList.length).toEqual(3);
    expect(tabList.at(0).text()).toEqual('Stats');
    expect(tabList.at(1).text()).toEqual('Spells');
    expect(tabList.at(1).prop('isDisabled')).toEqual(false);
    expect(tabList.at(2).text()).toEqual('Options');
  });

  it("has a TabList with the spells disabled if the player doesn't have any available", () => {
    currentPlayer.stats.mp = 2;
    subject = shallow(
      <FieldMenu
        showFieldMenu={true}
        closeFieldMenu={closeFieldMenu}
        currentPlayer={currentPlayer}
        castSpell={castSpell}
      />
    );
    const tabList = subject.find(TabList).find(Tab);
    expect(tabList.length).toEqual(3);
    expect(tabList.at(0).text()).toEqual('Stats');
    expect(tabList.at(1).text()).toEqual('Spells');
    expect(tabList.at(1).prop('isDisabled')).toEqual(true);
    expect(tabList.at(2).text()).toEqual('Options');
  });

  it('displays a PlayerStatsPanel initially with the expected props', () => {
    const playerStatsPanel = subject.find(PlayerStatsPanel);
    expect(playerStatsPanel.props()).toEqual({
      playerStats: currentPlayer.stats,
      showHeading: false,
      includeBorder: false,
    });
  });

  describe('PlayerSpells', () => {
    it('displays PlayerSpells when chosen with the expected outdoor spells', () => {
      subject = shallow(
        <FieldMenu
          showFieldMenu={true}
          closeFieldMenu={closeFieldMenu}
          currentPlayer={currentPlayer}
          castSpell={castSpell}
        />
      );
      const playerSpells = subject.find(PlayerSpells);
      expect(playerSpells.props()).toEqual({
        currentPlayer: currentPlayer,
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
        onSpellCast: expect.any(Function),
        castSpell,
      });
    });

    it('displays PlayerSpells when chosen with the expected cave spells', () => {
      currentPlayer.location.mapName = CaveName.LavaGrotto;
      subject = shallow(
        <FieldMenu
          showFieldMenu={true}
          closeFieldMenu={closeFieldMenu}
          currentPlayer={currentPlayer}
          castSpell={castSpell}
        />
      );
      const playerSpells = subject.find(PlayerSpells);
      expect(playerSpells.props()).toEqual({
        currentPlayer,
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
        onSpellCast: expect.any(Function),
        castSpell,
      });
    });

    it('displays PlayerSpells without HEAL when player is at full health', () => {
      currentPlayer.stats.hp = currentPlayer.stats.hpTotal;
      subject = shallow(
        <FieldMenu
          showFieldMenu={true}
          closeFieldMenu={closeFieldMenu}
          currentPlayer={currentPlayer}
          castSpell={castSpell}
        />
      );
      const playerSpells = subject.find(PlayerSpells);
      expect(playerSpells.props()).toEqual({
        currentPlayer,
        availableSpells: [
          {
            battleSpell: false,
            mpCost: 7,
            offensive: false,
            spellName: 'RETURN',
          },
        ],
        onSpellCast: expect.any(Function),
        castSpell,
      });
    });

    it('sets the menu choice to player stats on spell cast and closes the modal', async () => {
      subject = shallow(
        <FieldMenu
          showFieldMenu={true}
          closeFieldMenu={closeFieldMenu}
          currentPlayer={currentPlayer}
          castSpell={castSpell}
        />
      );
      const playerSpells = subject.find(PlayerSpells);
      playerSpells.prop('onSpellCast')();
      expect(closeFieldMenu).toHaveBeenCalled();
    });
  });
});

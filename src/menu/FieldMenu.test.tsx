import React from 'react';
import FieldMenu from './FieldMenu';
import { Player, Spell, SpellName } from '../player/types';
import { Direction } from '../navigation';
import { CaveName, ContinentName, TownName } from '../environment/maps/types';
import { screen } from '@testing-library/react';
import { renderChakra } from '../../test/utils';

describe('FieldMenu', () => {
  const availableSpells: Spell[] = [
    {
      spellName: SpellName.Heal,
      mpCost: 5,
      offensive: false,
      battleSpell: true,
    },
    {
      spellName: SpellName.Return,
      mpCost: 7,
      offensive: false,
      battleSpell: false,
    },
    {
      spellName: SpellName.Outside,
      mpCost: 7,
      offensive: false,
      battleSpell: false,
    },
  ];
  let currentPlayer: Player;
  let closeFieldMenu: jest.Mock;
  let castSpell: jest.Mock;

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
      inventory: [],
    };
    renderChakra(
      <FieldMenu
        showFieldMenu={true}
        closeFieldMenu={closeFieldMenu}
        currentPlayer={currentPlayer}
        castSpell={castSpell}
      />
    );
  });

  it('has a menu with the expected options', () => {
    const menuOptions = screen.getAllByRole('button') as HTMLElement[];
    expect(menuOptions.length).toEqual(5);
    expect(menuOptions[0].textContent).toEqual('Stats');
    expect(menuOptions[1].textContent).toEqual('Spells');
    expect(menuOptions[2].textContent).toEqual('Items');
    expect(menuOptions[3].textContent).toEqual('Options');
    expect(menuOptions[4].textContent).toEqual('<< Back');
  });

  it("disables spells option if the player doesn't have any", () => {
    currentPlayer.spells = [];
    const menuOptions = screen.getAllByRole('button') as HTMLElement[];
    expect(menuOptions[1].textContent).toEqual('Spells');
    expect(menuOptions[1]).not.toBeDisabled();
  });

  it('displays the selected sub menu', () => {
    screen.getByRole('heading');
  });
});

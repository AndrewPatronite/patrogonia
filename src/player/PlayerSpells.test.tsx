import React from 'react';
import PlayerSpells, { PlayerSpellsProps } from './PlayerSpells';
import { Direction } from '../navigation';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import upperFirst from 'lodash/upperFirst';
import { useSound } from '../hooks';
import { Sound } from '../environment/sound';
import { CaveName, ContinentName, TownName } from '../environment/maps/types';
import { renderChakra } from '../../test/utils';

jest.mock('../hooks', () => ({
  useSound: jest.fn(),
}));

describe('PlayerSpells', () => {
  let props: PlayerSpellsProps;
  let playSound: jest.Mock;

  beforeEach(() => {
    playSound = jest.fn();
    (useSound as jest.Mock).mockReturnValue({
      playSound,
    });
    props = {
      currentPlayer: {
        id: 1,
        name: 'Redwan',
        loggedIn: true,
        battleId: undefined,
        spells: [
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
        ],
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
        visited: [TownName.Dewhurst, TownName.Fernsworth, TownName.Easthaven],
        tutorialLessons: [],
      },
      availableSpells: [
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
      ],
      castSpell: jest.fn(),
      onSpellCast: jest.fn(),
    };
    renderChakra(<PlayerSpells {...props} />);
  });

  it('has a List of spells', () => {
    const spellList = screen.getByRole('listbox');
    expect(spellList.children.length).toEqual(props.availableSpells.length);
    props.availableSpells.forEach(({ spellName }, index) => {
      expect(spellList.children[index].textContent).toEqual(
        upperFirst(spellName.toLowerCase())
      );
    });
  });

  it('displays the magic cost of each spell', () => {
    const spellList = screen.getByRole('listbox');
    props.availableSpells.forEach(({ spellName, mpCost }, index) => {
      fireEvent.click(spellList.children[index]);
      const formattedSpellName = upperFirst(spellName.toLowerCase());
      const selectedSpellDescription = screen.getAllByText(
        formattedSpellName
      )[1];
      if (formattedSpellName === 'Return') {
        expect(selectedSpellDescription?.parentElement?.textContent).toEqual(
          `${formattedSpellName}to ${props.currentPlayer.visited[0]}MP ${mpCost}/${props.currentPlayer.stats.mp}`
        );
      } else {
        expect(selectedSpellDescription?.parentElement?.textContent).toEqual(
          `${formattedSpellName}MP ${mpCost}/${props.currentPlayer.stats.mp}`
        );
      }
    });
  });

  it('displays the visited towns for Return spell and includes the town name in the spell description', () => {
    const returnSpell = screen.getByRole('button', { name: 'Return' });
    fireEvent.click(returnSpell);
    const townList = screen.getAllByRole('listbox')[1];
    expect(townList.children.length).toEqual(
      props.currentPlayer.visited.length
    );
    props.currentPlayer.visited.forEach((townName, index) => {
      expect(townList.children[index].textContent).toEqual(townName);
      fireEvent.click(screen.getByRole('button', { name: townName }));
      const returnSpellDescription = screen.getAllByText('Return')[1];
      expect(returnSpellDescription?.nextSibling?.textContent).toEqual(
        `to ${townName}`
      );
    });
  });

  it('displays a spell cast message, plays the spell sound, then a few seconds later casts the chosen spell and calls onSpellCast', () => {
    fireEvent.click(screen.getByRole('button', { name: 'Return' }));
    fireEvent.click(screen.getByRole('button', { name: 'Easthaven' }));
    expect(
      screen.getAllByText('Return')[1]?.parentElement?.textContent
    ).toEqual('Returnto EasthavenMP 7/20');
    jest.useFakeTimers();
    fireEvent.click(screen.getByRole('button', { name: 'Cast' }));
    waitFor(() => {
      screen.getByText(`${props.currentPlayer.name} cast Return.`);
    });
    expect(playSound).toHaveBeenCalledWith(Sound.Warp);
    jest.runAllTimers();
    expect(props.castSpell).toHaveBeenCalledWith('RETURN', 'Easthaven');
    expect(props.onSpellCast).toHaveBeenCalled();
  });
});

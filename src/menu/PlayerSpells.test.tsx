import React from 'react';
import PlayerSpells, { PlayerSpellsProps } from './PlayerSpells';
import { Direction } from '../navigation';
import {
  act,
  fireEvent,
  RenderResult,
  screen,
  waitFor,
} from '@testing-library/react';
import upperFirst from 'lodash/upperFirst';
import { useSound } from '../hooks';
import { Sound } from '../environment/sound';
import { CaveName, ContinentName, TownName } from '../environment/maps/types';
import { renderChakra } from '../../test/utils';
import { SpellName } from '../player/types';
import { dispatchAndStorePlayerUpdate } from '../actions/utils';
import { useDispatch } from 'react-redux';
import { Player } from '../player';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn().mockReturnValue(jest.fn()),
}));

jest.mock('../actions/utils', () => ({
  dispatchAndStorePlayerUpdate: jest.fn(),
}));

jest.mock('../hooks', () => ({
  useSound: jest.fn(),
}));

describe('PlayerSpells', () => {
  let props: PlayerSpellsProps;
  let pauseSound: jest.Mock;
  let playSound: jest.Mock;
  let renderResult: RenderResult;
  let updatedPlayer: Player;

  beforeEach(() => {
    pauseSound = jest.fn();
    playSound = jest.fn();
    (useSound as jest.Mock).mockReturnValue({
      pauseSound,
      playSound,
    });
    props = {
      currentPlayer: {
        id: 1,
        name: 'Redwan',
        loggedIn: true,
        battleId: undefined,
        spells: [
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
        ],
        stats: {
          playerId: 1,
          playerName: 'Redwan',
          level: 5,
          hp: 30,
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
        inventory: [],
      },
      onBack: jest.fn(),
      castSpell: jest.fn((spellName) => {
        switch (spellName) {
          case SpellName.Heal:
            updatedPlayer = {
              ...{
                id: 1,
                name: 'Redwan',
                loggedIn: true,
                battleId: undefined,
                spells: [
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
                ],
                stats: {
                  playerId: 1,
                  playerName: 'Redwan',
                  level: 5,
                  hp: 30,
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
                visited: [
                  TownName.Dewhurst,
                  TownName.Fernsworth,
                  TownName.Easthaven,
                ],
                tutorialLessons: [],
                inventory: [],
              },
              stats: {
                ...{
                  id: 1,
                  name: 'Redwan',
                  loggedIn: true,
                  battleId: undefined,
                  spells: [
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
                  ],
                  stats: {
                    playerId: 1,
                    playerName: 'Redwan',
                    level: 5,
                    hp: 30,
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
                  visited: [
                    TownName.Dewhurst,
                    TownName.Fernsworth,
                    TownName.Easthaven,
                  ],
                  tutorialLessons: [],
                  inventory: [],
                }.stats,
                hp:
                  {
                    id: 1,
                    name: 'Redwan',
                    loggedIn: true,
                    battleId: undefined,
                    spells: [
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
                    ],
                    stats: {
                      playerId: 1,
                      playerName: 'Redwan',
                      level: 5,
                      hp: 30,
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
                    visited: [
                      TownName.Dewhurst,
                      TownName.Fernsworth,
                      TownName.Easthaven,
                    ],
                    tutorialLessons: [],
                    inventory: [],
                  }.stats.hp + 20,
                mp:
                  {
                    id: 1,
                    name: 'Redwan',
                    loggedIn: true,
                    battleId: undefined,
                    spells: [
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
                    ],
                    stats: {
                      playerId: 1,
                      playerName: 'Redwan',
                      level: 5,
                      hp: 30,
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
                    visited: [
                      TownName.Dewhurst,
                      TownName.Fernsworth,
                      TownName.Easthaven,
                    ],
                    tutorialLessons: [],
                    inventory: [],
                  }.stats.mp - 5,
              },
            };
            break;
          case SpellName.Return:
            updatedPlayer = {
              ...{
                id: 1,
                name: 'Redwan',
                loggedIn: true,
                battleId: undefined,
                spells: [
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
                ],
                stats: {
                  playerId: 1,
                  playerName: 'Redwan',
                  level: 5,
                  hp: 30,
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
                visited: [
                  TownName.Dewhurst,
                  TownName.Fernsworth,
                  TownName.Easthaven,
                ],
                tutorialLessons: [],
                inventory: [],
              },
              stats: {
                ...{
                  id: 1,
                  name: 'Redwan',
                  loggedIn: true,
                  battleId: undefined,
                  spells: [
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
                  ],
                  stats: {
                    playerId: 1,
                    playerName: 'Redwan',
                    level: 5,
                    hp: 30,
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
                  visited: [
                    TownName.Dewhurst,
                    TownName.Fernsworth,
                    TownName.Easthaven,
                  ],
                  tutorialLessons: [],
                  inventory: [],
                }.stats,
                mp:
                  {
                    id: 1,
                    name: 'Redwan',
                    loggedIn: true,
                    battleId: undefined,
                    spells: [
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
                    ],
                    stats: {
                      playerId: 1,
                      playerName: 'Redwan',
                      level: 5,
                      hp: 30,
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
                    visited: [
                      TownName.Dewhurst,
                      TownName.Fernsworth,
                      TownName.Easthaven,
                    ],
                    tutorialLessons: [],
                    inventory: [],
                  }.stats.mp - 7,
              },
            };
            break;
        }
        return Promise.resolve(updatedPlayer);
      }),
      closeMenu: jest.fn(),
    };
    renderResult = renderChakra(<PlayerSpells {...props} />);
  });

  it('has a List of spells', () => {
    const spellList = screen.getByRole('listbox');
    expect(spellList.children.length).toEqual(
      props.currentPlayer.spells.length
    );
    props.currentPlayer.spells.forEach(({ spellName }, index) => {
      expect(spellList.children[index].textContent).toEqual(
        upperFirst(spellName.toLowerCase())
      );
    });
  });

  it('displays the magic cost of each spell', () => {
    props.currentPlayer.spells.forEach(({ spellName, mpCost }, index) => {
      if (index > 0) {
        fireEvent.click(
          screen.getByRole('button', {
            name: upperFirst(spellName.toLowerCase()),
          })
        );
      }
      const spellCaptions = screen.getAllByTestId('labeled-value');
      expect(spellCaptions[0]).toHaveTextContent(
        `MP${mpCost}/${props.currentPlayer.stats.mp}`
      );
      if (spellName === SpellName.Heal) {
        expect(spellCaptions[1]).toHaveTextContent(
          `HP${props.currentPlayer.stats.hp}/${props.currentPlayer.stats.hpTotal}`
        );
      }
    });
  });

  it('displays the visited towns as options for Return spell', async () => {
    const returnOption = screen.getByRole('button', { name: 'Return' });
    fireEvent.click(returnOption);
    fireEvent.click(returnOption);
    expect(renderResult.container.textContent).toContain('Return to');
    const townList = screen.getAllByRole('button');
    expect(townList.length).toEqual(props.currentPlayer.visited.length + 1);
    props.currentPlayer.visited.forEach((townName, index) => {
      expect(townList[index].textContent).toEqual(townName);
    });
    expect(townList[townList.length - 1].textContent).toEqual('<< Back');
  });

  it('casts return and displays an update', async () => {
    const dispatch = useDispatch();
    const returnOption = screen.getByRole('button', { name: 'Return' });
    fireEvent.click(returnOption);
    fireEvent.click(returnOption);
    expect(renderResult.container.textContent).toEqual(
      [
        'Return to',
        TownName.Dewhurst,
        TownName.Fernsworth,
        TownName.Easthaven,
        'MP7/20',
        '<< Back',
      ].join('')
    );
    jest.useFakeTimers();

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: TownName.Dewhurst }));
    });

    await expect(
      props.castSpell(SpellName.Return, TownName.Dewhurst)
    ).resolves.toBe(updatedPlayer);
    expect(pauseSound).toHaveBeenCalledWith(Sound.Warp);
    expect(playSound).toHaveBeenCalledWith(Sound.Warp);
    await waitFor(() => {
      expect(screen.getByTestId('menu-messages')).toHaveTextContent(
        `${props.currentPlayer.name} cast Return.`
      );
    });
    await act(async () => {
      jest.runAllTimers();
    });
    expect(dispatchAndStorePlayerUpdate).toHaveBeenCalledWith(
      dispatch,
      updatedPlayer
    );
    expect(props.closeMenu).toHaveBeenCalled();
  });

  it('casts heal and displays an update', async () => {
    const dispatch = useDispatch();
    jest.useFakeTimers();
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: 'Heal' }));
    });

    await expect(
      props.castSpell(SpellName.Heal, `${props.currentPlayer.id}`)
    ).resolves.toBe(updatedPlayer);
    expect(pauseSound).toHaveBeenCalledWith(Sound.Heal);
    expect(playSound).toHaveBeenCalledWith(Sound.Heal);
    await waitFor(() => {
      expect(screen.getByTestId('menu-messages')).toHaveTextContent(
        [
          `${props.currentPlayer.name} cast Heal.`,
          `HP ${updatedPlayer.stats.hp}/${updatedPlayer.stats.hpTotal}`,
        ].join('')
      );
    });
    await act(async () => {
      jest.runAllTimers();
    });
    expect(dispatchAndStorePlayerUpdate).toHaveBeenCalledWith(
      dispatch,
      updatedPlayer
    );
    expect(props.closeMenu).toHaveBeenCalled();
  });
});

import React from 'react';
import Tile from './Tile';
import { Legend } from '../maps/Legend';
import { Npc, Tristan } from '../../npcs';
import { LocationToPlayerMap } from './types';
import { Player } from '../../player';
import { Direction } from '../../navigation';
import { render, screen } from '@testing-library/react';
import { CaveName, TownName } from '../maps/types';

export const verifyClass = (subject: Element, expectedClasses: string) =>
  expect(
    (subject.getAttribute('class') || '').includes(expectedClasses)
  ).toEqual(true);

describe('Tile', () => {
  const { GRASS: G, WATER: W } = Legend.symbols;
  const map = {
    layout: [
      [W, W, W, W, W, W, W, W, W, W],
      [W, W, W, W, W, W, W, W, W, W],
      [W, W, W, W, W, W, W, W, W, W],
      [W, W, W, W, W, W, W, W, W, W],
      [W, W, W, W, W, W, W, W, W, W],
      [W, W, W, W, W, G, TownName.Dewhurst, W, W, W],
      [W, W, W, W, CaveName.LavaGrotto, G, G, W, W, W],
      [W, W, W, W, G, G, G, W, W, W],
      [W, W, W, W, W, W, W, W, W, W],
      [W, W, W, W, W, W, W, W, W, W],
    ],
  };
  //@ts-ignore missing player fields
  const currentPlayer: Player = {
    id: 1,
    name: 'Andy',
    //@ts-ignore missing location fields
    location: {
      facing: Direction.Down,
    },
  };
  //@ts-ignore missing player fields
  const currentPlayerCompanion: Player = {
    id: 2,
    name: 'Redwan',
    //@ts-ignore missing location fields
    location: {
      facing: Direction.Down,
    },
  };
  //@ts-ignore missing player fields
  const stranger: Player = {
    id: 3,
    name: 'Galnor',
    //@ts-ignore missing location fields
    location: {
      facing: Direction.Down,
    },
  };
  //@ts-ignore missing player fields
  const saved: Player = {
    id: 4,
    name: 'Christian',
    //@ts-ignore missing location fields
    location: {
      facing: Direction.Down,
    },
  };
  //@ts-ignore missing player fields
  const townie: Player = {
    id: 5,
    name: 'Nester',
    //@ts-ignore missing location fields
    location: {
      facing: Direction.Down,
    },
  };

  const getSubject = (
    rowIndex: number,
    columnIndex: number,
    npcs: Npc[] = []
  ) => {
    const mapSymbol = map.layout[rowIndex][columnIndex];
    const locationToPlayerMap: LocationToPlayerMap = {
      '5-5': [currentPlayer, currentPlayerCompanion],
      '5-6': [saved, townie, currentPlayer],
      '7-4': [stranger],
    };
    const mapLayout = map.layout;

    render(
      <Tile
        mapSymbol={mapSymbol}
        rowIndex={rowIndex}
        columnIndex={columnIndex}
        locationToPlayerMap={locationToPlayerMap}
        mapLayout={mapLayout}
        currentPlayer={currentPlayer}
        npcs={npcs}
      />
    );
    return screen.getByTestId('tile');
  };

  it('has the expected classNames and shows the entrance name as mapsymbol', () => {
    const subject = getSubject(6, 4);
    verifyClass(subject, 'tile rc6-4');
    expect(subject.getAttribute('mapsymbol')).toEqual(CaveName.LavaGrotto);
  });

  it('has the expected classNames and shows current player if more than one on the tile', () => {
    const subject = getSubject(5, 5);
    verifyClass(subject, 'tile rc5-5');
    expect(subject.textContent).toEqual(currentPlayer.name);
  });

  it('has the expected classNames and a player', () => {
    const subject = getSubject(7, 4);
    verifyClass(subject, 'tile rc7-4');
    expect(subject.textContent).toEqual(stranger.name);
  });

  it('has the expected classNames and a player at a town, if the player is currentPlayer', () => {
    const subject = getSubject(5, 6);
    verifyClass(subject, 'tile rc5-6');
    expect(subject.textContent).toEqual(currentPlayer.name);
  });

  it('has the expected classNames and an npc', () => {
    const npc = { ...Tristan, currentRowIndex: 6, currentColumnIndex: 5 };
    const subject = getSubject(6, 5, [npc]);
    verifyClass(subject, 'tile rc6-5');
    expect(subject.textContent).toEqual(npc.name);
  });
});

import React from 'react';
import TileRow from './TileRow';
import { Legend } from '../maps/Legend';
import { LocationToPlayerMap, MapDisplayRange } from './types';
import { Player } from '../../player';
import { Npc, Tristan } from '../../npcs';
import { render, screen } from '@testing-library/react';
import { Direction } from '../../navigation';
import { verifyClass } from './Tile.test';
import { TownName } from '../maps/types';

describe('TileRow', () => {
  const { WATER: W, GRASS: G } = Legend.symbols;
  const mapLayout = [
    [W, W, W, W, W],
    [W, W, G, W, W],
    [W, G, TownName.Dewhurst, G, W],
    [W, W, G, W, W],
    [W, W, W, W, W],
  ];
  const rowIndex = 2;
  //@ts-ignore missing player fields
  const currentPlayer: Player = {
    id: 1,
    name: 'Andy',
    //@ts-ignore missing location fields
    location: { facing: Direction.Down },
  };
  const locationToPlayerMap: LocationToPlayerMap = {
    ['2-3']: [currentPlayer],
  };
  const mapDisplayRange: MapDisplayRange = {
    columnStartIndex: 1,
    columnEndIndex: 3,
    rowStartIndex: 1,
    rowEndIndex: 3,
  };
  const rowSymbols = mapLayout[rowIndex];
  const npc: Npc = {
    ...Tristan,
    currentRowIndex: 2,
    currentColumnIndex: 1,
  };
  let subject: HTMLElement;

  beforeEach(() => {
    render(
      <TileRow
        rowSymbols={rowSymbols}
        rowIndex={rowIndex}
        locationToPlayerMap={locationToPlayerMap}
        mapDisplayRange={mapDisplayRange}
        mapLayout={mapLayout}
        currentPlayer={currentPlayer}
        npcs={[npc]}
      />
    );
    subject = screen.getByTestId('tile-row');
  });

  it("has Tiles for the subset of the row's symbols based on the display range", () => {
    expect(subject.children.length).toEqual(3);
    verifyClass(subject.children[0], `tile rc${rowIndex}-1`);
    expect(subject.children[0].getAttribute('mapsymbol')).toEqual(G);
    expect(subject.children[0].textContent).toEqual(npc.name);
    verifyClass(subject.children[1], `tile rc${rowIndex}-2`);
    expect(subject.children[1].getAttribute('mapsymbol')).toEqual(
      TownName.Dewhurst
    );
    verifyClass(subject.children[2], `tile rc${rowIndex}-3`);
    expect(subject.children[2].getAttribute('mapsymbol')).toEqual(G);
    expect(subject.children[2].textContent).toEqual(currentPlayer.name);
  });
});

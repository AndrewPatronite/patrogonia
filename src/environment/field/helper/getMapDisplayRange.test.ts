import { getMapDisplayRange } from './getMapDisplayRange';
import { Legend } from '../../maps/Legend';
import { Map } from '../../maps';
import { Player } from '../../../player';
import { ContinentName } from '../../maps/types';

describe('getMapDisplayRange', () => {
  const { WATER: W, GRASS: G } = Legend.symbols;
  const getPlayer = (rowIndex: number, columnIndex: number): Player => ({
    // @ts-expect-error missing fields
    location: { rowIndex, columnIndex },
  });

  it('returns the range of indices for a small map', () => {
    const map: Map = {
      entrance: {
        entranceName: ContinentName.Atoris,
        rowIndex: 0,
        columnIndex: 0,
      },
      name: ContinentName.Atoris,
      npcs: [],
      layout: [
        [W, W, W, W, W, W, W, W, W, W],
        [W, W, W, W, W, W, W, W, W, W],
        [W, W, W, W, W, W, W, W, W, W],
        [W, W, W, W, W, W, W, W, W, W],
        [W, W, W, W, W, W, W, W, W, W],
        [W, W, W, W, W, G, G, W, W, W],
        [W, W, W, W, G, G, G, W, W, W],
        [W, W, W, W, G, G, G, W, W, W],
        [W, W, W, W, W, W, W, W, W, W],
        [W, W, W, W, W, W, W, W, W, W],
      ],
    };
    expect(getMapDisplayRange(getPlayer(7, 6), map)).toEqual({
      rowStartIndex: 0,
      rowEndIndex: 9,
      columnStartIndex: 0,
      columnEndIndex: 9,
    });
  });

  it('returns the range of indices for a larger map, centering around the player', () => {
    const map: Map = {
      entrance: {
        entranceName: ContinentName.Atoris,
        rowIndex: 0,
        columnIndex: 0,
      },
      name: ContinentName.Atoris,
      npcs: [],
      layout: [
        [W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W],
        [W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W],
        [W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W],
        [W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W],
        [W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W],
        [W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W],
        [W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W],
        [W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W],
        [W, W, W, W, W, W, W, W, G, G, G, W, W, W, W, W, W, W, W, W],
        [W, W, W, W, W, W, W, W, G, G, G, W, W, W, W, W, W, W, W, W],
        [W, W, W, W, W, W, W, W, G, G, G, W, W, W, W, W, W, W, W, W],
        [W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W],
        [W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W],
        [W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W],
        [W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W],
        [W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W],
        [W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, G, W, W],
        [W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, G, G, G, W],
        [W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, G, G, G, W],
        [W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W],
      ],
    };
    expect(getMapDisplayRange(getPlayer(9, 9), map)).toEqual({
      rowStartIndex: 6,
      rowEndIndex: 15,
      columnStartIndex: 6,
      columnEndIndex: 15,
    });
    expect(getMapDisplayRange(getPlayer(17, 17), map)).toEqual({
      rowStartIndex: 10,
      rowEndIndex: 19,
      columnStartIndex: 10,
      columnEndIndex: 19,
    });
  });
});

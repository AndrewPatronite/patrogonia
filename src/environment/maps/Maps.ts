import values from 'lodash/values';
import { Legend } from './Legend';
import {
  CaveName,
  ContinentName,
  Entrance,
  Map,
  MapName,
  TownName,
} from './types';
import { Alastair, Barnaby, Digby, Finlay, Nigel, Tristan } from '../../npcs';
import { Direction } from '../../navigation';

const {
  WATER: W,
  GRASS: G,
  MOUNTAIN: M,
  DIRT: D,
  ROCK: R,
  LAVA: L,
  FOREST: F,
} = Legend.symbols;

const enumToString = <T>(sourceEnum: T) => `${sourceEnum}`;

const allMapNames = values(CaveName)
  .map(enumToString)
  .concat(values(ContinentName))
  .concat(values(TownName));

export const Maps: { [key in MapName]: (entranceName?: MapName) => Map } = {
  Atoris(entranceName: MapName = TownName.Dewhurst): Map {
    return {
      name: ContinentName.Atoris,
      layout: [
        [W, W, W, W, W, W, W, W, W, W, W, W, W],
        [W, W, W, W, W, W, W, W, W, W, W, W, W],
        [W, W, W, W, W, G, G, W, W, W, W, W, W],
        [W, W, W, W, G, G, G, G, G, G, W, W, W],
        [W, W, W, G, G, G, W, W, G, G, G, W, W],
        [W, W, W, M, F, G, W, W, G, G, G, W, W],
        [W, W, M, M, M, G, W, TownName.Dewhurst, G, G, W, W, W],
        [W, W, M, M, CaveName.LavaGrotto, G, W, W, W, G, G, W, W],
        [W, W, F, M, M, F, G, G, G, G, W, W, W],
        [W, W, W, F, F, W, W, W, W, W, W, W, W],
        [W, W, W, W, W, W, W, W, W, W, W, W, W],
      ],
      entrance:
        entranceName === CaveName.LavaGrotto
          ? {
              entranceName: CaveName.LavaGrotto,
              rowIndex: 7,
              columnIndex: 4,
            }
          : {
              entranceName: TownName.Dewhurst,
              rowIndex: 6,
              columnIndex: 7,
            },
      npcs: [],
    };
  },

  Dewhurst(): Map {
    return {
      name: TownName.Dewhurst,
      // prettier-ignore
      layout: [
            [W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W],
            [W, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F],
            [W, F, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, F],
            [W, F, R, G, G, G, G, G, G, G, G, G, G, G, F, G, G, F, G, G, G, G, G, R, F],
            [W, F, R, G, R, R, R, R, R, R, R, G, G, G, G, F, G, G, F, G, G, G, G, R, F],
            [W, F, R, G, R, D, R, R, R, D, R, G, G, G, F, G, F, G, G, G, G, G, G, R, F],
            [W, F, R, G, R, D, D, D, D, D, R, G, G, G, G, G, G, F, G, G, G, G, G, R, F],
            [W, F, R, G, R, R, R, D, R, R, R, G, G, G, G, G, G, F, G, G, G, G, G, R, F],
            [W, F, R, G, R, D, D, D, D, D, R, G, G, G, G, G, G, G, D, D, D, D, D, D, D],
            [W, F, R, G, R, R, R, D, R, R, R, G, G, G, G, G, G, G, D, G, G, G, G, R, F],
            [W, F, R, G, G, G, G, D, G, G, G, G, G, G, G, G, D, D, D, G, F, F, G, R, F],
            [W, F, R, G, G, G, G, D, D, D, G, G, G, G, G, G, D, G, G, G, F, G, G, R, F],
            [W, F, R, G, G, G, G, G, G, D, G, G, G, G, D, D, D, G, F, F, G, F, G, R, F],
            [W, F, R, G, G, G, G, G, G, D, G, G, G, G, D, G, G, G, F, G, F, F, G, R, F],
            [W, F, R, G, G, G, G, D, D, D, D, D, D, D, D, D, D, G, G, F, G, F, G, R, F],
            [W, F, R, G, G, G, G, D, G, G, G, G, G, G, G, G, D, D, G, G, G, G, F, R, F],
            [W, F, R, G, G, G, G, D, G, G, G, G, G, G, G, G, G, D, D, G, G, F, G, R, F],
            [W, F, R, G, G, D, D, D, G, G, G, G, G, G, G, G, G, G, D, G, G, G, G, R, F],
            [W, F, R, G, G, D, G, G, G, G, G, G, G, G, G, G, G, G, D, G, G, G, G, R, F],
            [W, F, R, G, G, D, G, G, G, G, G, G, G, G, G, R, R, R, D, R, R, R, G, R, F],
            [W, F, R, G, F, D, G, G, F, G, G, G, G, G, G, R, D, D, D, D, D, R, G, R, F],
            [W, F, R, F, F, D, F, F, G, G, G, G, G, G, G, R, D, D, D, D, D, R, G, R, F],
            [W, F, R, F, F, W, F, F, G, G, G, G, G, G, G, R, R, D, D, D, R, R, G, R, F],
            [W, F, R, F, W, W, W, F, F, G, F, G, G, G, G, R, D, D, R, D, D, R, G, R, F],
            [W, W, W, W, W, W, W, W, F, G, G, G, G, G, G, R, D, D, R, D, D, R, G, R, F],
            [W, F, R, F, W, W, W, F, F, F, G, G, G, G, G, R, D, D, R, D, D, R, G, R, F],
            [W, F, R, F, F, W, F, F, F, G, G, G, G, G, G, R, R, R, R, R, R, R, G, R, F],
            [W, F, R, F, F, F, F, F, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, R, F],
            [W, F, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, F],
            [W, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F],
            [W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W]
        ],
      entrance: {
        entranceName: ContinentName.Atoris,
        rowIndex: 8,
        columnIndex: 24,
      },
      exit: {
        mapName: ContinentName.Atoris,
        rowIndex: 6,
        columnIndex: 7,
        facing: Direction.Down,
        entranceName: TownName.Dewhurst,
      },
      npcs: [Alastair, Barnaby, Digby],
    };
  },

  Fernsworth(): Map {
    return {
      name: TownName.Fernsworth,
      // prettier-ignore
      layout: [
            [M, M, M, M, M, M, M, M, M, M, M, M, M, M, M, M, M, M, M, M, M, M, M],
            [F, F, G, F, F, G, F, F, F, F, G, F, F, F, G, F, F, F, G, F, F, F, M],
            [G, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, F, M],
            [F, R, G, G, G, G, G, G, F, G, G, G, F, G, G, G, F, F, F, G, R, G, M],
            [F, R, G, F, G, F, G, G, G, G, F, G, F, G, G, G, G, F, F, G, R, F, M],
            [F, R, G, G, G, G, G, G, F, G, G, G, F, G, G, G, F, G, F, F, R, G, M],
            [G, R, G, R, R, R, R, R, G, F, G, G, G, G, F, G, G, F, G, G, R, F, M],
            [F, R, G, R, D, D, D, R, G, G, G, G, G, F, G, G, G, G, F, G, R, F, M],
            [F, R, G, R, D, D, D, R, F, G, G, G, G, G, R, R, R, R, R, G, R, G, M],
            [F, R, G, R, D, D, D, R, G, G, G, G, G, G, R, D, D, D, R, G, R, F, M],
            [F, R, G, R, R, D, R, R, G, G, G, G, G, G, R, R, D, R, R, G, R, F, M],
            [F, R, G, G, G, D, G, G, G, G, G, G, G, G, R, D, D, D, R, G, R, F, M],
            [F, R, G, G, G, D, G, G, G, G, G, G, G, G, R, R, D, R, R, G, R, G, M],
            [D, D, D, D, D, D, D, D, D, D, D, D, D, D, D, D, D, G, G, G, R, F, M],
            [F, R, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, R, G, M],
            [G, R, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, R, F, M],
            [F, R, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, R, F, M],
            [F, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, F, M],
            [F, F, G, G, F, F, G, F, G, F, F, F, G, F, F, G, F, F, F, G, G, F, M],
            [M, M, M, M, M, M, M, M, M, M, M, M, M, M, M, M, M, M, M, M, M, M, M]
        ],
      entrance: {
        entranceName: ContinentName.Grimes,
        rowIndex: 13,
        columnIndex: 0,
      },
      exit: {
        mapName: ContinentName.Grimes,
        rowIndex: 8,
        columnIndex: 16,
        facing: Direction.Down,
        entranceName: TownName.Fernsworth,
      },
      npcs: [Finlay],
    };
  },

  Easthaven(): Map {
    return {
      name: TownName.Easthaven,
      // prettier-ignore
      layout: [
            [F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F],
            [F, W, W, W, W, W, W, W, W, W, W, W, D, W, W, W, W, W, W, W, W, W, W, W, F],
            [F, W, R, R, R, R, R, R, R, R, R, R, D, R, R, R, R, R, R, R, R, R, R, W, F],
            [F, W, R, G, G, G, G, G, G, G, G, G, D, G, G, G, G, G, G, G, G, G, R, W, F],
            [F, W, R, G, R, R, R, R, R, G, G, G, D, G, G, G, G, G, G, G, G, G, R, W, F],
            [F, W, R, G, R, D, D, D, R, G, G, G, D, G, G, G, G, G, G, G, G, G, R, W, F],
            [F, W, R, G, R, D, D, D, R, G, G, G, D, G, G, G, G, G, G, G, G, G, R, W, F],
            [F, W, R, G, R, D, D, D, R, G, G, G, D, G, G, G, G, G, G, G, G, G, R, W, F],
            [F, W, R, G, R, R, D, R, R, G, G, G, D, G, G, G, G, G, G, G, G, G, R, W, F],
            [F, W, R, G, G, G, D, G, G, G, G, G, D, G, G, G, G, G, G, G, G, G, R, W, F],
            [F, W, R, G, G, G, D, D, G, G, G, G, D, G, G, G, G, G, G, G, G, G, R, W, F],
            [F, W, R, G, G, G, G, D, G, G, G, D, D, D, G, G, G, G, G, G, G, G, R, W, F],
            [F, W, R, G, G, G, G, D, G, G, D, D, W, D, D, G, G, G, G, G, G, G, R, W, F],
            [F, D, D, D, D, D, D, D, D, D, D, W, W, W, D, D, D, D, D, D, D, D, D, D, F],
            [F, W, R, G, G, G, G, G, G, G, D, D, W, D, D, G, G, D, G, G, G, G, R, W, F],
            [F, W, R, G, G, G, G, G, G, G, G, D, D, D, G, G, G, D, G, G, G, G, R, W, F],
            [F, W, R, G, G, G, G, G, G, G, G, G, D, G, G, G, G, D, D, G, G, G, R, W, F],
            [F, W, R, G, G, G, G, G, G, G, G, G, D, G, G, G, G, G, D, G, G, G, R, W, F],
            [F, W, R, G, G, G, G, G, G, G, G, G, D, G, G, G, R, R, D, R, R, G, R, W, F],
            [F, W, R, G, G, G, G, G, G, G, G, G, D, G, G, G, R, D, D, D, R, G, R, W, F],
            [F, W, R, G, G, G, G, G, G, G, G, G, D, G, G, G, R, D, D, D, R, G, R, W, F],
            [F, W, R, G, G, G, G, G, G, G, G, G, D, G, G, G, R, D, D, D, R, G, R, W, F],
            [F, W, R, G, G, G, G, G, G, G, G, G, D, G, G, G, R, R, R, R, R, G, R, W, F],
            [F, W, R, G, G, G, G, G, G, G, G, G, D, G, G, G, G, G, G, G, G, G, R, W, F],
            [F, W, R, R, R, R, R, R, R, R, R, R, D, R, R, R, R, R, R, R, R, R, R, W, F],
            [F, W, W, W, W, W, W, W, W, W, W, W, D, W, W, W, W, W, W, W, W, W, W, W, F],
            [F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F],
        ],
      entrance: {
        entranceName: ContinentName.Grimes,
        rowIndex: 13,
        columnIndex: 0,
      },
      exit: {
        mapName: ContinentName.Grimes,
        rowIndex: 12,
        columnIndex: 42,
        facing: Direction.Down,
        entranceName: TownName.Easthaven,
      },
      npcs: [Nigel, Tristan],
    };
  },

  'Lava Grotto'(entranceName: MapName = ContinentName.Atoris): Map {
    return {
      name: CaveName.LavaGrotto,
      // prettier-ignore
      layout: [
            [L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L],
            [L, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, L, L, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, L],
            [L, R, ContinentName.Atoris, R, D, D, D, D, D, D, D, D, D, D, D, D, R, L, L, R, D, D, D, D, D, D, D, D, D, D, D, D, D, D, D, D, D, D, R, L],
            [L, R, D, R, R, D, R, R, R, R, R, R, R, R, R, D, R, L, L, R, D, R, R, R, R, R, R, R, R, R, D, R, R, D, R, R, R, D, R, L],
            [L, R, D, R, R, D, R, R, R, R, R, R, D, R, R, D, R, L, L, R, D, R, R, R, R, R, R, R, R, R, D, R, R, D, R, R, R, D, R, L],
            [L, R, D, R, R, D, R, R, R, R, R, R, D, R, R, D, R, L, L, R, D, R, R, R, R, R, R, R, R, R, D, R, R, D, R, R, R, D, R, L],
            [L, R, D, R, R, D, R, R, R, R, R, R, D, R, R, D, R, L, L, R, D, R, R, R, R, R, R, R, R, R, D, R, R, D, R, R, R, D, R, L],
            [L, R, D, R, R, D, R, R, R, R, R, R, D, R, R, D, R, L, L, R, D, R, R, R, R, R, R, R, R, R, D, R, R, D, R, R, R, D, R, L],
            [L, R, D, R, R, D, R, R, R, R, R, R, D, D, R, D, R, L, L, R, D, R, R, R, R, R, R, R, R, R, R, R, R, D, R, R, R, D, R, L],
            [L, R, D, R, R, D, R, R, R, R, R, R, R, D, R, D, R, L, L, R, D, R, R, R, R, R, R, D, D, D, D, R, R, D, R, R, R, D, R, L],
            [L, R, D, R, R, D, R, R, R, R, R, R, R, D, R, D, R, L, L, R, D, R, R, R, R, R, R, D, R, R, D, R, R, D, R, R, R, D, R, L],
            [L, R, D, R, R, D, R, R, R, R, R, R, D, D, R, D, R, L, L, R, D, R, R, R, R, R, R, D, R, R, D, R, R, D, R, R, R, D, R, L],
            [L, R, D, R, R, D, D, R, R, R, R, R, D, R, R, D, R, R, R, R, D, R, R, R, R, R, R, D, R, R, D, R, R, D, D, R, R, D, R, L],
            [L, R, D, D, D, R, D, D, D, D, D, D, D, D, R, D, D, D, D, D, D, R, R, D, D, D, D, D, R, R, D, D, D, R, R, D, D, D, R, L],
            [L, R, D, R, D, D, D, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, D, D, R, R, R, R, R, R, D, R, D, D, D, R, R, D, R, L],
            [L, R, D, R, R, R, D, R, R, R, R, R, R, R, R, D, D, D, D, D, D, R, D, R, R, R, R, R, R, R, D, R, R, R, D, R, R, D, R, L],
            [L, R, D, D, D, D, D, D, D, D, D, D, D, D, R, D, R, R, R, R, D, D, D, R, D, D, D, D, D, D, D, D, D, D, D, D, D, D, R, L],
            [L, R, R, R, R, R, R, R, R, R, R, R, R, R, R, D, R, L, L, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, L],
            [L, L, L, L, L, L, L, L, L, L, L, L, L, L, R, D, R, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L],
            [L, L, L, L, L, L, L, L, L, L, L, L, L, L, R, D, R, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L],
            [L, R, R, R, R, R, R, R, R, R, R, R, R, R, R, D, R, L, L, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, L],
            [L, R, D, R, D, D, D, D, D, D, D, D, D, D, D, D, R, L, L, R, D, D, D, D, D, D, D, D, D, D, D, D, D, D, D, D, D, D, R, L],
            [L, R, D, R, R, D, R, R, R, R, R, R, R, R, R, R, R, R, R, R, D, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, D, R, L],
            [L, R, D, R, R, D, R, R, D, D, D, D, D, R, R, D, D, D, D, D, D, D, D, D, D, D, D, D, R, R, D, D, D, D, R, R, R, D, R, L],
            [L, R, D, R, R, D, R, D, R, R, R, R, D, R, R, D, R, R, R, R, R, R, R, R, R, R, R, D, R, R, D, R, R, D, R, R, R, D, R, L],
            [L, R, D, R, R, D, R, D, R, L, L, R, D, R, R, D, R, L, L, L, L, L, L, L, R, R, R, D, R, R, D, R, R, D, R, R, R, D, R, L],
            [L, R, D, R, R, D, R, D, R, L, L, R, D, R, R, D, R, L, R, R, R, R, R, L, R, R, R, D, R, R, D, R, R, D, R, R, R, D, R, L],
            [L, R, D, R, R, D, R, D, R, L, L, R, D, R, R, D, R, L, R, D, D, D, R, L, L, L, R, D, R, R, D, R, R, D, R, R, R, D, R, L],
            [L, R, D, R, R, D, R, D, R, L, L, R, D, R, R, D, R, L, R, D, R, D, R, L, R, L, R, D, R, R, D, R, R, D, R, R, R, D, R, L],
            [L, R, D, R, R, D, R, D, R, R, R, R, D, R, R, D, R, L, R, D, R, D, R, R, R, L, R, D, R, R, D, R, R, D, R, R, R, D, R, L],
            [L, R, D, R, R, D, R, D, D, D, D, D, D, R, R, D, R, L, R, D, R, D, D, D, R, L, R, D, R, R, D, R, R, D, R, R, R, D, R, L],
            [L, R, D, R, R, D, D, R, R, R, R, R, D, R, R, D, R, L, R, D, D, R, R, D, R, L, R, D, R, R, D, R, D, D, R, R, R, D, R, L],
            [L, R, D, D, D, R, D, D, D, D, D, D, D, R, R, D, R, L, R, R, D, R, R, D, R, R, R, R, R, R, D, R, D, R, D, D, D, D, R, L],
            [L, R, D, R, D, D, D, R, R, R, R, R, R, R, R, D, R, L, L, R, D, R, R, D, D, D, D, D, D, D, D, R, D, D, D, R, R, D, R, L],
            [L, R, D, R, R, R, R, R, R, R, R, R, R, R, D, D, R, L, L, R, D, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, L],
            [L, R, D, D, D, D, D, D, D, D, D, D, D, D, D, R, R, L, L, R, D, D, D, D, D, D, D, D, D, D, D, D, D, D, D, D, D, ContinentName.Grimes, R, L],
            [L, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, L, L, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, L],
            [L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L],
        ],
      entrance:
        entranceName === ContinentName.Grimes
          ? {
              entranceName: ContinentName.Grimes,
              rowIndex: 35,
              columnIndex: 37,
            }
          : {
              entranceName: ContinentName.Atoris,
              rowIndex: 2,
              columnIndex: 2,
            },
      npcs: [],
    };
  },

  Grimes(entranceName: MapName = CaveName.LavaGrotto): Map {
    return {
      name: ContinentName.Grimes,
      // prettier-ignore
      layout: [
            [W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W],
            [W, W, W, W, W, W, W, W, W, W, W, W, W, W, G, G, G, G, W, G, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, D, D, W],
            [W, W, W, W, W, W, W, W, W, W, W, W, G, G, G, M, M, G, G, G, G, G, G, G, G, G, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, D, W, W],
            [W, W, W, W, W, W, W, W, W, W, W, G, G, M, M, M, M, M, M, M, M, M, M, M, G, G, G, G, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, D, D, W, W],
            [W, W, W, W, W, W, W, W, W, W, G, G, M, M, G, G, G, G, M, F, F, F, M, M, M, G, G, G, G, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, D, D, D, W, W, W],
            [W, W, W, W, W, W, W, W, W, F, F, M, M, G, G, M, G, G, G, G, G, G, G, G, M, F, F, F, F, F, F, W, W, W, W, W, W, W, W, W, W, W, W, W, D, W, W, W, W, W],
            [W, W, W, W, W, W, W, W, W, F, F, F, G, G, M, M, M, M, F, F, F, F, F, F, M, M, M, M, F, F, F, F, D, D, W, W, W, W, W, W, W, W, W, W, D, D, W, W, W, W],
            [W, W, W, W, W, W, W, F, F, F, F, F, F, M, M, M, M, M, M, F, M, M, F, M, M, M, M, M, M, F, G, G, W, D, G, W, W, W, W, W, W, W, W, W, W, D, W, W, W, W],
            [W, W, W, W, W, W, F, F, F, F, F, F, F, F, F, D, TownName.Fernsworth, M, M, M, M, M, M, M, F, M, M, M, M, F, F, W, W, G, G, G, W, W, W, W, W, W, W, W, W, D, D, W, W, W],
            [W, W, W, W, W, G, G, G, G, G, G, G, F, F, D, D, M, M, F, F, F, F, F, F, G, F, M, M, F, G, G, W, G, G, G, G, G, G, G, G, G, G, W, W, W, W, D, G, W, W],
            [W, W, W, W, W, G, G, G, G, G, G, F, F, F, D, M, M, F, G, G, G, G, G, G, G, F, M, M, G, G, G, W, G, G, G, G, G, G, G, G, G, G, G, W, W, W, D, G, W, W],
            [W, W, W, W, W, W, G, G, G, G, G, G, F, F, D, M, F, F, G, G, G, G, G, G, G, G, M, M, G, G, G, W, G, G, G, G, G, F, G, G, G, F, F, F, W, D, G, G, W, W],
            [W, W, W, W, W, W, W, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, M, M, F, G, G, G, W, W, W, W, G, G, F, F, G, F, F, TownName.Easthaven, G, W, D, G, G, W, W],
            [W, W, W, W, W, W, G, G, G, G, G, G, G, G, G, G, G, G, F, F, F, G, G, G, G, F, M, F, F, F, G, G, G, G, W, W, G, G, G, F, F, F, G, G, W, D, G, W, W, W],
            [W, W, W, W, W, W, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, F, M, M, F, G, G, G, G, G, G, W, W, W, G, G, F, G, G, W, W, D, W, W, W, W],
            [W, W, W, W, W, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, F, M, M, M, F, W, G, G, G, G, G, G, W, G, G, G, G, W, W, D, D, W, W, W, W],
            [W, W, W, W, W, G, G, G, G, G, M, G, G, G, G, G, G, G, G, G, W, W, W, W, W, W, M, M, M, W, W, W, W, W, G, G, D, W, W, W, W, W, W, D, D, W, W, W, W, W],
            [W, W, W, W, W, G, G, G, G, M, M, M, G, G, G, G, G, G, G, G, W, W, W, W, W, W, W, M, M, W, W, W, W, W, W, W, D, D, D, D, D, D, D, D, W, W, W, W, W, W],
            [W, W, W, W, G, G, G, G, M, M, F, F, G, G, G, G, G, G, G, G, W, W, W, W, W, W, W, M, M, M, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W],
            [W, W, W, G, G, G, M, M, M, F, F, G, G, G, G, G, G, G, G, W, W, W, W, W, W, W, W, W, M, M, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W],
            [W, W, W, W, F, M, M, F, F, F, F, G, G, G, G, G, G, G, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W],
            [W, W, W, W, G, F, F, CaveName.LavaGrotto, F, G, G, G, G, G, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W],
            [W, W, W, W, W, G, F, F, F, F, F, G, G, G, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W],
            [W, W, W, W, W, W, G, G, F, F, G, G, G, G, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W],
            [W, W, W, W, W, W, W, G, G, G, G, G, G, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W],
            [W, W, W, W, W, W, W, W, G, G, G, G, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W],
            [W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W],
            [W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W],
            [W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W],

        ],
      entrance: ((): Entrance => {
        const lavaGrotto = {
          entranceName: CaveName.LavaGrotto,
          rowIndex: 21,
          columnIndex: 7,
        };
        const entrances: { [key in MapName]?: Entrance | undefined } = {
          [CaveName.LavaGrotto]: lavaGrotto,
          Fernsworth: {
            entranceName: TownName.Fernsworth,
            rowIndex: 8,
            columnIndex: 16,
          },
          Easthaven: {
            entranceName: TownName.Easthaven,
            rowIndex: 12,
            columnIndex: 42,
          },
        };
        return entrances[entranceName] ?? lavaGrotto;
      })(),
      npcs: [],
    };
  },
};

export const canTraverse = (nextPosition: string): boolean =>
  [G, D, F].includes(nextPosition) || isTown(nextPosition);

export const isSaveLocation = (position: string): boolean => isTown(position);

export const isTravelDestination = (name: string): boolean =>
  allMapNames.includes(name);

export const isTown = (name: string): boolean =>
  values(TownName).map(enumToString).includes(name);

export const isCave = (name: string): boolean =>
  values(CaveName).map(enumToString).includes(name);

export const isField = (mapName: string): boolean =>
  values(ContinentName).map(enumToString).includes(mapName);

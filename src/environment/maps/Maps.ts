// noinspection JSUnusedLocalSymbols

import { Legend } from './Legend'
import { Entrance, Map } from './types'
import { Alastair, Barnaby, Nigel, Tristan } from '../../npcs'
import { Finlay } from '../../npcs/Npcs'
import { Direction } from '../../navigation'

const {
  WATER: W,
  GRASS: G,
  MOUNTAIN: M,
  DIRT: D,
  ROCK: R,
  LAVA: L,
  FOREST: F,
} = Legend.symbols

export enum Cave {
  LavaGrotto = 'Lava Grotto',
}

export enum CaveExit {
  Atoris = 'Atoris',
  Grimes = 'Grimes',
}

export enum Continent {
  Atoris = 'Atoris',
  Grimes = 'Grimes',
}

export enum Town {
  Dewhurst = 'Dewhurst',
  Fernsworth = 'Fernsworth',
  Easthaven = 'Easthaven',
}

export const Maps = {
  canTraverse(nextPosition?: string): boolean {
    return (
      !!nextPosition &&
      ([G, D, F].includes(nextPosition) || this.isTown(nextPosition))
    )
  },

  isSaveLocation(position: string): boolean {
    return Maps.isTown(position)
  },

  isTravelDestination(name: string): boolean {
    return [
      Town.Dewhurst,
      Continent.Atoris,
      Cave.LavaGrotto,
      Continent.Grimes,
      Town.Fernsworth,
      Town.Easthaven,
    ]
      .map((destination) => `${destination}`)
      .includes(name)
  },

  isTown(name?: string): boolean {
    return (
      !!name &&
      [Town.Dewhurst, Town.Fernsworth, Town.Easthaven]
        .map((town) => `${town}`)
        .includes(name)
    )
  },

  isCave(name: string): boolean {
    return [Cave.LavaGrotto].map((cave) => `${cave}`).includes(name)
  },

  isField(name: string): boolean {
    return [Continent.Atoris, Continent.Grimes]
      .map((continent) => `${continent}`)
      .includes(name)
  },

  Atoris(entranceName: string = Town.Dewhurst): Map {
    return {
      name: Continent.Atoris,
      layout: [
        [W, W, W, W, W, W, W, W, W, W, W, W, W],
        [W, W, W, W, W, W, W, W, W, W, W, W, W],
        [W, W, W, W, W, G, G, W, W, W, W, W, W],
        [W, W, W, W, G, G, G, G, G, G, W, W, W],
        [W, W, W, G, G, G, W, W, G, G, G, W, W],
        [W, W, W, M, F, G, W, W, G, G, G, W, W],
        [W, W, M, M, M, G, W, Town.Dewhurst, G, G, W, W, W],
        [W, W, M, M, Cave.LavaGrotto, G, W, W, W, G, G, W, W],
        [W, W, F, M, M, F, G, G, G, G, W, W, W],
        [W, W, W, F, F, W, W, W, W, W, W, W, W],
        [W, W, W, W, W, W, W, W, W, W, W, W, W],
      ],
      entrance: ((): Entrance => {
        const entrances: Record<string, Entrance> = {
          Dewhurst: {
            rowIndex: 6,
            columnIndex: 7,
          },
          [Cave.LavaGrotto]: {
            rowIndex: 7,
            columnIndex: 4,
          },
        }
        return entrances[entranceName]
      })(),
      npcs: [],
    }
  },

  Dewhurst(entranceName: string = Continent.Atoris): Map {
    return {
      name: Town.Dewhurst,
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
        rowIndex: 8,
        columnIndex: 24,
      },
      exit: {
        mapName: Continent.Atoris,
        rowIndex: 6,
        columnIndex: 7,
        facing: Direction.Down,
        entranceName: Town.Dewhurst,
      },
      npcs: [Alastair, Barnaby],
    }
  },

  Fernsworth(entranceName = Continent.Grimes): Map {
    return {
      name: Town.Fernsworth,
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
        rowIndex: 13,
        columnIndex: 0,
      },
      exit: {
        mapName: Continent.Grimes,
        rowIndex: 8,
        columnIndex: 16,
        facing: Direction.Down,
        entranceName: Town.Fernsworth,
      },
      npcs: [Finlay],
    }
  },

  Easthaven(entranceName = Continent.Grimes): Map {
    return {
      name: Town.Easthaven,
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
        rowIndex: 13,
        columnIndex: 0,
      },
      exit: {
        mapName: Continent.Grimes,
        rowIndex: 12,
        columnIndex: 42,
        facing: Direction.Down,
        entranceName: Town.Easthaven,
      },
      npcs: [Nigel, Tristan],
    }
  },

  'Lava Grotto'(entranceName = Continent.Atoris): Map {
    return {
      name: Cave.LavaGrotto,
      // prettier-ignore
      layout: [
            [L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L],
            [L, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, L, L, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, L],
            [L, R, Continent.Atoris, R, D, D, D, D, D, D, D, D, D, D, D, D, R, L, L, R, D, D, D, D, D, D, D, D, D, D, D, D, D, D, D, D, D, D, R, L],
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
            [L, R, D, D, D, D, D, D, D, D, D, D, D, D, D, R, R, L, L, R, D, D, D, D, D, D, D, D, D, D, D, D, D, D, D, D, D, Continent.Grimes, R, L],
            [L, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, L, L, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, L],
            [L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L],
        ],
      entrance: ((): Entrance => {
        const entrances: Record<string, Entrance> = {
          Atoris: {
            rowIndex: 2,
            columnIndex: 2,
          },
          Grimes: {
            rowIndex: 35,
            columnIndex: 37,
          },
        }
        return entrances[entranceName]
      })(),
      npcs: [],
    }
  },

  Grimes(entranceName = Cave.LavaGrotto): Map {
    return {
      name: Continent.Grimes,
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
            [W, W, W, W, W, W, F, F, F, F, F, F, F, F, F, D, Town.Fernsworth, M, M, M, M, M, M, M, F, M, M, M, M, F, F, W, W, G, G, G, W, W, W, W, W, W, W, W, W, D, D, W, W, W],
            [W, W, W, W, W, G, G, G, G, G, G, G, F, F, D, D, M, M, F, F, F, F, F, F, G, F, M, M, F, G, G, W, G, G, G, G, G, G, G, G, G, G, W, W, W, W, D, G, W, W],
            [W, W, W, W, W, G, G, G, G, G, G, F, F, F, D, M, M, F, G, G, G, G, G, G, G, F, M, M, G, G, G, W, G, G, G, G, G, G, G, G, G, G, G, W, W, W, D, G, W, W],
            [W, W, W, W, W, W, G, G, G, G, G, G, F, F, D, M, F, F, G, G, G, G, G, G, G, G, M, M, G, G, G, W, G, G, G, G, G, F, G, G, G, F, F, F, W, D, G, G, W, W],
            [W, W, W, W, W, W, W, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, M, M, F, G, G, G, W, W, W, W, G, G, F, F, G, F, F, Town.Easthaven, G, W, D, G, G, W, W],
            [W, W, W, W, W, W, G, G, G, G, G, G, G, G, G, G, G, G, F, F, F, G, G, G, G, F, M, F, F, F, G, G, G, G, W, W, G, G, G, F, F, F, G, G, W, D, G, W, W, W],
            [W, W, W, W, W, W, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, F, M, M, F, G, G, G, G, G, G, W, W, W, G, G, F, G, G, W, W, D, W, W, W, W],
            [W, W, W, W, W, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, F, M, M, M, F, W, G, G, G, G, G, G, W, G, G, G, G, W, W, D, D, W, W, W, W],
            [W, W, W, W, W, G, G, G, G, G, M, G, G, G, G, G, G, G, G, G, W, W, W, W, W, W, M, M, M, W, W, W, W, W, G, G, D, W, W, W, W, W, W, D, D, W, W, W, W, W],
            [W, W, W, W, W, G, G, G, G, M, M, M, G, G, G, G, G, G, G, G, W, W, W, W, W, W, W, M, M, W, W, W, W, W, W, W, D, D, D, D, D, D, D, D, W, W, W, W, W, W],
            [W, W, W, W, G, G, G, G, M, M, F, F, G, G, G, G, G, G, G, G, W, W, W, W, W, W, W, M, M, M, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W],
            [W, W, W, G, G, G, M, M, M, F, F, G, G, G, G, G, G, G, G, W, W, W, W, W, W, W, W, W, M, M, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W],
            [W, W, W, W, F, M, M, F, F, F, F, G, G, G, G, G, G, G, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W],
            [W, W, W, W, G, F, F, Cave.LavaGrotto, F, G, G, G, G, G, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W],
            [W, W, W, W, W, G, F, F, F, F, F, G, G, G, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W],
            [W, W, W, W, W, W, G, G, F, F, G, G, G, G, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W],
            [W, W, W, W, W, W, W, G, G, G, G, G, G, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W],
            [W, W, W, W, W, W, W, W, G, G, G, G, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W],
            [W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W],
            [W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W],
            [W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W],

        ],
      entrance: ((): Entrance => {
        const entrances: Record<string, Entrance> = {
          [Cave.LavaGrotto]: {
            rowIndex: 21,
            columnIndex: 7,
          },
          Fernsworth: {
            rowIndex: 8,
            columnIndex: 16,
          },
          Easthaven: {
            rowIndex: 12,
            columnIndex: 42,
          },
        }
        return entrances[entranceName]
      })(),
      npcs: [],
    }
  },
}

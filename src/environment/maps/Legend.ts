const WATER = 'W'
const GRASS = 'G'
const MOUNTAIN = 'M'
const DIRT = 'D'
const ROCK = 'R'
const LAVA = 'L'
const FOREST = 'F'

export const Legend = {
  [WATER]: 'water',
  [GRASS]: 'grass',
  [MOUNTAIN]: 'mountain',
  [DIRT]: 'dirt',
  [ROCK]: 'rock',
  [LAVA]: 'lava',
  [FOREST]: 'forest',
  symbols: {
    WATER,
    GRASS,
    MOUNTAIN,
    DIRT,
    ROCK,
    LAVA,
    FOREST,
  },
}

export enum MapSymbol {
  Dirt = 'D',
  Forest = 'F',
  Grass = 'G',
  Rock = 'R',
  Lava = 'L',
  Mountain = 'M',
  Water = 'W',
}

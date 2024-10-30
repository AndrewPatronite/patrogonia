import { MapSymbol } from '../../maps/Legend';
import {
  Cave,
  Dirt,
  Forest,
  Grass,
  Lava,
  Mountain,
  Rock,
  Stairs,
  Town,
  Water,
} from '.';
import values from 'lodash/values';
import { CaveName, ContinentName, TownName } from '../../maps/types';

export const Tiles: { [mapSymbol: string]: any } = {
  [MapSymbol.Dirt]: Dirt,
  [MapSymbol.Forest]: Forest,
  [MapSymbol.Grass]: Grass,
  [MapSymbol.Lava]: Lava,
  [MapSymbol.Mountain]: Mountain,
  [MapSymbol.Rock]: Rock,
  [MapSymbol.Water]: Water,
  ...values(CaveName).reduce(
    (accumulator: { [key in CaveName]?: any }, caveName) => {
      accumulator[caveName] = Cave;
      return accumulator;
    },
    {}
  ),
  ...values(TownName).reduce(
    (accumulator: { [key in TownName]?: any }, townName) => {
      accumulator[townName] = Town;
      return accumulator;
    },
    {}
  ),
  ...values(ContinentName).reduce(
    (accumulator: { [key in ContinentName]?: any }, continentName) => {
      accumulator[continentName] = Stairs;
      return accumulator;
    },
    {}
  ),
};

import { MapSymbol } from '../../maps/Legend';
import { isCave, isField, isTown } from '../../maps/Maps';
import {
  Cave,
  Dirt,
  Entrance,
  Forest,
  Grass,
  Lava,
  Mountain,
  Rock,
  Stairs,
  Town,
  Water,
} from '.';

export const getTile = (mapSymbol: string) => {
  switch (mapSymbol) {
    case MapSymbol.Dirt:
      return Dirt;
    case MapSymbol.Forest:
      return Forest;
    case MapSymbol.Grass:
      return Grass;
    case MapSymbol.Lava:
      return Lava;
    case MapSymbol.Mountain:
      return Mountain;
    case MapSymbol.Rock:
      return Rock;
    case MapSymbol.Water:
      return Water;
    default:
      if (isCave(mapSymbol)) {
        return Cave;
      }
      if (isField(mapSymbol)) {
        return Stairs;
      }
      if (isTown(mapSymbol)) {
        return Town;
      }
      return Entrance;
  }
};

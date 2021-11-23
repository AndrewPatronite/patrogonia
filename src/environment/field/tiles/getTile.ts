import { MapSymbol } from '../../maps/Legend'
import { Cave as CaveEnum, CaveExit, Town as TownEnum } from '../../maps/Maps'
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
} from './index'

export const getTile = (mapSymbol: string) => {
  switch (mapSymbol) {
    case MapSymbol.Dirt:
      return Dirt
    case MapSymbol.Forest:
      return Forest
    case MapSymbol.Grass:
      return Grass
    case MapSymbol.Lava:
      return Lava
    case MapSymbol.Mountain:
      return Mountain
    case MapSymbol.Rock:
      return Rock
    case MapSymbol.Water:
      return Water
    case TownEnum.Dewhurst:
    case TownEnum.Fernsworth:
    case TownEnum.Easthaven:
      return Town
    case CaveEnum.LavaGrotto:
      return Cave
    case CaveExit.Atoris:
    case CaveExit.Grimes:
      return Stairs
    default:
      return Entrance
  }
}

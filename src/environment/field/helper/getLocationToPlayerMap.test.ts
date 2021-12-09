import { getLocationToPlayerMap } from './getLocationToPlayerMap'
import { Cave, Continent } from '../../maps/Maps'

describe('getLocationToPlayerMap', () => {
  it('returns a map of players on the current map relative to the current player', () => {
    const getPlayer = (
      id: number,
      mapName: string,
      rowIndex: number,
      columnIndex: number
    ) => ({
      id,
      location: {
        mapName,
        rowIndex,
        columnIndex,
      },
    })
    const currentPlayer = getPlayer(1, Cave.LavaGrotto, 1, 2)
    const currentPlayerCompanion = getPlayer(2, Cave.LavaGrotto, 1, 2)
    const lavaGrottoDweller = getPlayer(3, Cave.LavaGrotto, 3, 4)
    const atorisPlayer = getPlayer(4, Continent.Atoris, 5, 6)
    const grimesPlayer = getPlayer(5, Continent.Grimes, 7, 8)
    const players = [
      atorisPlayer,
      currentPlayer,
      currentPlayerCompanion,
      lavaGrottoDweller,
      grimesPlayer,
    ]

    //@ts-ignore players missing required fields
    expect(getLocationToPlayerMap(players, currentPlayer)).toEqual({
      '1-2': [currentPlayerCompanion, currentPlayer],
      '3-4': [lavaGrottoDweller],
    })
    const currentPlayerInAtoris = {
      ...currentPlayer,
      location: { ...currentPlayer.location, mapName: Continent.Atoris },
    }
    //@ts-ignore players missing required fields
    expect(getLocationToPlayerMap(players, currentPlayerInAtoris)).toEqual({
      '1-2': [currentPlayerInAtoris],
      '5-6': [atorisPlayer],
    })
    const currentPlayerInGrimes = {
      ...currentPlayer,
      location: { ...currentPlayer.location, mapName: Continent.Grimes },
    }
    //@ts-ignore players missing required fields
    expect(getLocationToPlayerMap(players, currentPlayerInGrimes)).toEqual({
      '1-2': [currentPlayerInGrimes],
      '7-8': [grimesPlayer],
    })
  })
})

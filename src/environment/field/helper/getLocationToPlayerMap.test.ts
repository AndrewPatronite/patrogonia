import { getLocationToPlayerMap } from './getLocationToPlayerMap'

describe('getLocationToPlayerMap', () => {
  it('returns a map of players on the current map', () => {
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
    const currentPlayer = getPlayer(1, 'Lava Grotto', 1, 2)
    const currentPlayerCompanion = getPlayer(2, 'Lava Grotto', 1, 2)
    const caveDweller = getPlayer(3, 'Lava Grotto', 3, 4)
    const beginner = getPlayer(4, 'Atoris', 5, 6)
    const tough = getPlayer(5, 'Grimes', 7, 8)
    const playersOnMap = {
      ['Atoris']: [beginner],
      ['Lava Grotto']: [
        currentPlayer,
        currentPlayerCompanion,
        caveDweller,
        beginner,
      ],
      ['Grimes']: [tough],
    }
    expect(getLocationToPlayerMap(playersOnMap, currentPlayer)).toEqual({
      '1-2': [currentPlayerCompanion, currentPlayer],
      '3-4': [caveDweller],
    })
  })
})

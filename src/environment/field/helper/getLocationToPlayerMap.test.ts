import { getLocationToPlayerMap } from './getLocationToPlayerMap';
import { CaveName, ContinentName } from '../../maps/types';

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
    });
    const currentPlayer = getPlayer(1, CaveName.LavaGrotto, 1, 2);
    const currentPlayerCompanion = getPlayer(2, CaveName.LavaGrotto, 1, 2);
    const lavaGrottoDweller = getPlayer(3, CaveName.LavaGrotto, 3, 4);
    const atorisPlayer = getPlayer(4, ContinentName.Atoris, 5, 6);
    const grimesPlayer = getPlayer(5, ContinentName.Grimes, 7, 8);
    const players = [
      atorisPlayer,
      currentPlayer,
      currentPlayerCompanion,
      lavaGrottoDweller,
      grimesPlayer,
    ];

    //@ts-expect-error players missing required fields
    expect(getLocationToPlayerMap(players, currentPlayer)).toEqual({
      '1-2': [currentPlayerCompanion, currentPlayer],
      '3-4': [lavaGrottoDweller],
    });
    const currentPlayerInAtoris = {
      ...currentPlayer,
      location: { ...currentPlayer.location, mapName: ContinentName.Atoris },
    };
    //@ts-expect-error players missing required fields
    expect(getLocationToPlayerMap(players, currentPlayerInAtoris)).toEqual({
      '1-2': [currentPlayerInAtoris],
      '5-6': [atorisPlayer],
    });
    const currentPlayerInGrimes = {
      ...currentPlayer,
      location: { ...currentPlayer.location, mapName: ContinentName.Grimes },
    };
    //@ts-expect-error players missing required fields
    expect(getLocationToPlayerMap(players, currentPlayerInGrimes)).toEqual({
      '1-2': [currentPlayerInGrimes],
      '7-8': [grimesPlayer],
    });
  });
});

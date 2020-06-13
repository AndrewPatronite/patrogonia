import { getLocationToPlayerMap } from './getLocationToPlayerMap';

describe('getLocationToPlayerMap', () => {
    it('returns an empty object if arguments are empty', () => {
        expect(getLocationToPlayerMap()).toEqual({});
    });

    it('returns a map of players on the current map', () => {
        const getPlayer = (id, mapName, rowIndex, columnIndex) => ({
            id,
            location: {
                mapName,
                rowIndex,
                columnIndex,
            },
        });
        const currentPlayer = getPlayer(1,'cave1', 1, 2);
        const currentPlayerCompanion = getPlayer(2,'cave1', 1, 2);
        const caveDweller = getPlayer(3, 'cave1', 3, 4);
        const beginner = getPlayer(4,'field1', 5, 6);
        const tough = getPlayer(5,'field2', 7, 8);
        const playersOnMap = {
            field1: [beginner],
            cave1: [currentPlayer, currentPlayerCompanion, caveDweller, beginner],
            field2: [tough],
        };
        expect(getLocationToPlayerMap(playersOnMap, currentPlayer)).toEqual({
            "1-2": [currentPlayerCompanion, currentPlayer],
            "3-4": [caveDweller]
        });
    });
});

import { getMapDisplayRange } from './getMapDisplayRange';
import { Legend } from '../../maps/Legend';

describe('getMapDisplayRange', () => {
    const { WATER: W, GRASS: G } = Legend.symbols;
    const getPlayer = (rowIndex, columnIndex) => ({
        location: { rowIndex, columnIndex },
    });

    it('returns the range of indices for a small map', () => {
        const map = {
            layout: [
                [W, W, W, W, W, W, W, W, W, W],
                [W, W, W, W, W, W, W, W, W, W],
                [W, W, W, W, W, W, W, W, W, W],
                [W, W, W, W, W, W, W, W, W, W],
                [W, W, W, W, W, W, W, W, W, W],
                [W, W, W, W, W, G, G, W, W, W],
                [W, W, W, W, G, G, G, W, W, W],
                [W, W, W, W, G, G, G, W, W, W],
                [W, W, W, W, W, W, W, W, W, W],
                [W, W, W, W, W, W, W, W, W, W],
            ],
        };
        expect(getMapDisplayRange(getPlayer(7, 6), map)).toEqual({
            rowStartIndex: 0,
            rowEndIndex: 9,
            columnStartIndex: 0,
            columnEndIndex: 9,
        });
    });

    it('returns the range of indices for a larger map, centering around the player', () => {
        const map = {
            layout: [
                [W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W],
                [W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W],
                [W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W],
                [W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W],
                [W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W],
                [W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W],
                [W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W],
                [W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W],
                [W, W, W, W, W, W, W, W, G, G, G, W, W, W, W, W, W, W, W, W],
                [W, W, W, W, W, W, W, W, G, G, G, W, W, W, W, W, W, W, W, W],
                [W, W, W, W, W, W, W, W, G, G, G, W, W, W, W, W, W, W, W, W],
                [W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W],
                [W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W],
                [W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W],
                [W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W],
                [W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W],
                [W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, G, W, W],
                [W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, G, G, G, W],
                [W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, G, G, G, W],
                [W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W],
            ],
        };
        expect(getMapDisplayRange(getPlayer(9, 9), map)).toEqual({
            rowStartIndex: 6,
            rowEndIndex: 15,
            columnStartIndex: 6,
            columnEndIndex: 15,
        });
        expect(getMapDisplayRange(getPlayer(17, 17), map)).toEqual({
            rowStartIndex: 10,
            rowEndIndex: 19,
            columnStartIndex: 10,
            columnEndIndex: 19,
        });
    });
});

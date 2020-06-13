import { Legend } from '../../maps/Legend';
import { getBorderClasses } from './getBorderClasses';

describe('getBorderClasses', () => {
    const { WATER: W, GRASS: G } = Legend.symbols;

    const mapLayout = [
        [W, W, W, W, W],
        [W, W, G, W, W],
        [W, G, W, G, W],
        [W, G, G, G, G],
        [W, W, W, G, W],
    ];

    it('should have no border classes if water', () => {
        expect(getBorderClasses(W, mapLayout, 2, 2)).toEqual('');
    });

    it('should have no border classes for invalid coordinates', () => {
        expect(getBorderClasses(G, mapLayout, 9, 9)).toEqual('');
    });

    it('should have water classes on all sides if surrounded by water', () => {
        expect(getBorderClasses(G, mapLayout, 1, 2)).toEqual(
            ' water-above water-left water-right water-below'
        );
    });

    it("should have water classes on some sides if it's a peninsula", () => {
        expect(getBorderClasses(G, mapLayout, 2, 1)).toEqual(
            ' water-above water-left water-right'
        );
    });

    it("should have water classes on some sides if it's a corner", () => {
        expect(getBorderClasses(G, mapLayout, 3, 1)).toEqual(
            ' water-left water-below'
        );
    });
});

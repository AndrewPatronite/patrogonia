import { Legend } from '../../maps/Legend';
import { getLandBorderStyles, landBorderRadius } from './getLandBorderStyles';
import { LandColors } from '../tiles/terrain';

describe('getLandBorderStyles', () => {
  const { WATER: W, GRASS: G } = Legend.symbols;

  const mapLayout = [
    [W, W, W, W, W],
    [W, W, G, W, W],
    [W, G, W, G, W],
    [W, G, G, G, G],
    [W, W, W, G, W],
  ];

  it('should have no border classes if water', () => {
    expect(getLandBorderStyles(W, mapLayout, 2, 2)).toEqual({});
  });

  it('should have no border classes for invalid coordinates', () => {
    expect(getLandBorderStyles(G, mapLayout, 9, 9)).toEqual({});
  });

  it('should have water classes on all sides if surrounded by water', () => {
    expect(getLandBorderStyles(G, mapLayout, 1, 2)).toEqual({
      borderBottomColor: LandColors.WetSand,
      borderBottomLeftRadius: landBorderRadius,
      borderBottomRightRadius: landBorderRadius,
      borderBottomWidth: 2,
      borderLeftColor: LandColors.WetSand,
      borderLeftWidth: 2,
      borderRightColor: LandColors.WetSand,
      borderRightWidth: 2,
      borderTopColor: LandColors.WetSand,
      borderTopLeftRadius: landBorderRadius,
      borderTopRightRadius: landBorderRadius,
      borderTopWidth: 2,
    });
  });

  it("should have water classes on some sides if it's a peninsula", () => {
    expect(getLandBorderStyles(G, mapLayout, 2, 1)).toEqual({
      borderLeftColor: LandColors.WetSand,
      borderLeftWidth: 2,
      borderRightColor: LandColors.WetSand,
      borderRightWidth: 2,
      borderTopColor: LandColors.WetSand,
      borderTopLeftRadius: landBorderRadius,
      borderTopRightRadius: landBorderRadius,
      borderTopWidth: 2,
    });
  });

  it("should have water classes on some sides if it's a corner", () => {
    expect(getLandBorderStyles(G, mapLayout, 3, 1)).toEqual({
      borderBottomColor: LandColors.WetSand,
      borderBottomLeftRadius: landBorderRadius,
      borderBottomWidth: 2,
      borderLeftColor: LandColors.WetSand,
      borderLeftWidth: 2,
    });
  });
});

import { Legend } from '../../maps/Legend'
import { getLandBorderStyles } from './getLandBorderStyles'

describe('getLandBorderStyles', () => {
  const { WATER: W, GRASS: G } = Legend.symbols

  const mapLayout = [
    [W, W, W, W, W],
    [W, W, G, W, W],
    [W, G, W, G, W],
    [W, G, G, G, G],
    [W, W, W, G, W],
  ]

  it('should have no border classes if water', () => {
    expect(getLandBorderStyles(W, mapLayout, 2, 2)).toEqual('')
  })

  it('should have no border classes for invalid coordinates', () => {
    expect(getLandBorderStyles(G, mapLayout, 9, 9)).toEqual('')
  })

  it('should have water classes on all sides if surrounded by water', () => {
    expect(getLandBorderStyles(G, mapLayout, 1, 2)).toEqual(
      ' water-above water-left water-right water-below'
    )
  })

  it("should have water classes on some sides if it's a peninsula", () => {
    expect(getLandBorderStyles(G, mapLayout, 2, 1)).toEqual(
      ' water-above water-left water-right'
    )
  })

  it("should have water classes on some sides if it's a corner", () => {
    expect(getLandBorderStyles(G, mapLayout, 3, 1)).toEqual(
      ' water-left water-below'
    )
  })
})

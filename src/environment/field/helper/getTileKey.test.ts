import { getTileKey } from './getTileKey'

describe('getTileKey', () => {
  it('... formats coordinates into a string', () => {
    expect(getTileKey(0, 0)).toEqual('0-0')
    expect(getTileKey(1, 2)).toEqual('1-2')
    expect(getTileKey(3, 4)).toEqual('3-4')
  })
})

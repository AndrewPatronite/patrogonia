import { getBattleStatusStyle } from './getBattleStatusStyle'

describe('getBattleStatusBorder', () => {
  const okPlayer = {
    hp: 6,
    hpTotal: 10,
  }
  const deadPlayer = {
    hp: 0,
    hpTotal: 10,
  }
  const badShape = {
    hp: 2,
    hpTotal: 10,
  }

  it('returns empty object if players are OK', () => {
    const playerStats = [okPlayer]
    expect(getBattleStatusStyle(playerStats)).toEqual({})
  })

  it('returns death border if a player is dead', () => {
    const playerStats = [okPlayer, deadPlayer, badShape]
    expect(getBattleStatusStyle(playerStats)).toEqual({
      border: '2px solid black',
    })
  })

  it('returns dire border if a player is in bad shape', () => {
    const playerStats = [okPlayer, badShape]
    expect(getBattleStatusStyle(playerStats)).toEqual({
      border: '2px solid #e31e2d',
    })
  })
})

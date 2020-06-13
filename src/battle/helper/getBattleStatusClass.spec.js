import { getBattleStatusClass } from './getBattleStatusClass';

describe('getBattleStatusClass', () => {
    const okPlayer = {
        hp: 6,
        hpTotal: 10
    }
    const deadPlayer = {
        hp: 0,
        hpTotal: 10
    }
    const badShape = {
        hp: 2,
        hpTotal: 10
    }

    it('returns empty string if players are OK', () => {
        const playerStats = [okPlayer]
        expect(getBattleStatusClass(playerStats)).toEqual('')
    });

    it('returns death if a player is dead', () => {
        const playerStats = [okPlayer, deadPlayer, badShape]
        expect(getBattleStatusClass(playerStats)).toEqual('death')
    });

    it('returns dire if a player is in bad shape', () => {
        const playerStats = [okPlayer, badShape]
        expect(getBattleStatusClass(playerStats)).toEqual('dire')
    });
});

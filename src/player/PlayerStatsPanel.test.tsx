import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import PlayerStatsPanel from './PlayerStatsPanel';
import ThemedPanel from "../components/theme/ThemedPanel";

describe('PlayerStatsPanel', () => {
    let props;
    let subject: ShallowWrapper;

    beforeEach(() => {
        props = {
            playerStats: {
                playerName: 'Redwan',
                level: 1,
                hp: 9,
                hpTotal: 12,
                mp: 1,
                mpTotal: 1,
                gold: 6,
                xp: 8,
                xpTillNextLevel: 7,
                attack: 5,
                defense: 4,
                agility: 5,
            },
        };
        subject = shallow(<PlayerStatsPanel {...props} />);
    });

    it('is a ThemedPanel with the expected props', () => {
        expect(subject.type()).toEqual(ThemedPanel);
        expect(subject.prop('className')).toEqual('player-stats-panel');
        expect(subject.prop('width')).toEqual('175px');
        expect(subject.prop('heading')).toEqual('Stats');
        expect(subject.prop('flexDirection')).toEqual('column');
    });

    it('has player stats housing individual stats', () => {
        const verifyStat = (
            playerStat: ShallowWrapper,
            expectedLabel: string,
            expectedValue: string
        ) => {
            expect(playerStat.find('label').text()).toEqual(expectedLabel);
            expect(playerStat.find('span').text()).toEqual(expectedValue);
        };

        const playerStats = subject.find('.player-stat');
        expect(playerStats.length).toEqual(10);
        verifyStat(playerStats.at(0), 'Player', 'Redwan');
        verifyStat(playerStats.at(1), 'Level', '1');
        verifyStat(playerStats.at(2), 'HP', '9/12');
        verifyStat(playerStats.at(3), 'MP', '1/1');
        verifyStat(playerStats.at(4), 'Gold', '6');
        verifyStat(playerStats.at(5), 'XP', '8');
        verifyStat(playerStats.at(6), 'XP till next level', '7');
        verifyStat(playerStats.at(7), 'Attack', '5');
        verifyStat(playerStats.at(8), 'Defense', '4');
        verifyStat(playerStats.at(9), 'Agility', '5');
    });
});

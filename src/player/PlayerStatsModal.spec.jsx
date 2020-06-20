import React, * as ReactAlias from 'react';
import { shallow } from 'enzyme';
import Modal from 'react-modal';
import PlayerStatsModal from './PlayerStatsModal';

describe('PlayerStatsModal', () => {
    let props;
    let subject;

    beforeEach(() => {
        jest.spyOn(ReactAlias, 'useEffect').mockImplementation((effect) =>
            effect()
        );
        spyOn(Modal, 'setAppElement');
        props = {
            showPlayerStats: true,
            onClose: jasmine.createSpy('onClose'),
            stats: {
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
        subject = shallow(<PlayerStatsModal {...props} />);
    });

    it('is a Modal with the expected props', () => {
        expect(subject.type()).toEqual(Modal);
        expect(subject.prop('className')).toEqual('player-stats-modal');
        expect(subject.prop('isOpen')).toEqual(true);
        expect(subject.prop('onRequestClose')).toEqual(jasmine.any(Function));
        expect(subject.prop('style')).toEqual({
            content: {
                top: '30%',
                left: '50%',
                right: 'auto',
                bottom: 'auto',
                marginRight: '-50%',
                transform: 'translate(5%, 5%)',
            },
        });
        expect(subject.prop('shouldFocusAfterRender')).toEqual(false);
    });

    it('has player stats housing individual stats', () => {
        const verifyStat = (playerStat, expectedLabel, expectedValue) => {
            expect(playerStat.find('label').text()).toEqual(expectedLabel);
            expect(playerStat.find('span').text()).toEqual(expectedValue);
        };

        const playerStats = subject.find('.player-stats').find('.player-stat');
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

    it('calls Modal.setAppElement', () => {
        expect(Modal.setAppElement).toHaveBeenCalledWith('body');
    });
});

import React, * as ReactAlias from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import Modal from 'react-modal';
import PlayerStatsModal from './PlayerStatsModal';
import PlayerStatsPanel from './PlayerStatsPanel';

describe('PlayerStatsModal', () => {
    let props: any;
    let subject: ShallowWrapper;

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

    it('has a PlayerStatsPanel with the expected props', () => {
        const playerStats = subject.find(PlayerStatsPanel);
        expect(playerStats.props()).toEqual({
            playerStats: props.stats
        })
    });

    it('calls Modal.setAppElement', () => {
        expect(Modal.setAppElement).toHaveBeenCalledWith('body');
    });
});

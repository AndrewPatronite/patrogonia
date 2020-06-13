import React from 'react';
import { shallow } from 'enzyme';
import Player from './Player';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

describe('Player', () => {
    let props;

    const getPlayer = (
        facing,
        battleId,
        lastUpdate,
        isCurrentPlayer,
        isSaveLocation
    ) => {
        props = {
            player: {
                name: 'Redwan',
                location: { facing },
                battleId,
                lastUpdate,
            },
            isCurrentPlayer,
            isSaveLocation,
        };
        return shallow(<Player {...props} />);
    };

    it('is a div with a class name', () => {
        const subject = getPlayer();
        expect(subject.type()).toEqual('div');
        expect(subject.prop('className')).toEqual('player');
    });

    it("shows a hero's name on back when facing up", () => {
        const subject = getPlayer('up', null, null, true);
        expect(subject.find('.hero').find('.player-name-back').text()).toEqual(
            'Redwan'
        );
    });

    it("shows a hero's name on chest when facing down", () => {
        const subject = getPlayer('down', null, null, true);
        expect(subject.find('.hero').find('.player-name-front').text()).toEqual(
            'Redwan'
        );
    });

    it("shows a peer's name on back when facing up", () => {
        const subject = getPlayer('up');
        expect(subject.find('.peer').find('.player-name-back').text()).toEqual(
            'Redwan'
        );
    });

    it("shows a peer's name on chest when facing down", () => {
        const subject = getPlayer('down');
        expect(subject.find('.peer').find('.player-name-front').text()).toEqual(
            'Redwan'
        );
    });

    it('shows a heal-n-save notification when current user is at a save location', () => {
        const subject = getPlayer('right', null, null, true, true);
        const saved = subject.find('.saved');
        const notifications = saved.find('p');
        expect(notifications.length).toEqual(2);
        expect(notifications.at(0).text()).toEqual('HP/MP restored');
        expect(notifications.at(1).text()).toEqual('Game saved');
    });

    it('shows a dragon icon if player is in battle', () => {
        const subject = getPlayer('down', 'ff12ff34eeee');
        const icon = subject.find(FontAwesomeIcon);
        expect(icon.prop('icon').iconName).toEqual('dragon');
    });

    it('shows a camping icon if player is not in battle and idle', () => {
        const now = new Date();
        const lastUpdate = new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate(),
            now.getHours(),
            now.getMinutes() - 2
        );
        const subject = getPlayer('down', null, lastUpdate.toString());
        const icon = subject.find(FontAwesomeIcon);
        expect(icon.prop('icon').iconName).toEqual('campground');
    });

    it('shows no icons if player is not in battle and not idle', () => {
        const now = new Date();
        const lastUpdate = new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate(),
            now.getHours(),
            now.getMinutes(),
            now.getSeconds()
        );
        const subject = getPlayer('down', null, lastUpdate.toString());
        const icon = subject.find(FontAwesomeIcon);
        expect(icon.exists()).toEqual(false);
    });
});

import React from 'react';
import { shallow } from 'enzyme';
import Character from './Character';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Player from "./Player";

describe('Character', () => {
    interface Props {
        player: Player,
        isCurrentPlayer: boolean,
        isSaveLocation: boolean
    }
    let props: Props;

    const getCharacter = (
        facing: string = 'up',
        battleId?: string,
        lastUpdate: string = new Date().toString(),
        isCurrentPlayer: boolean = false,
        isSaveLocation: boolean = false
    ) => {
        props = {
            player: {
                name: 'Redwan',
                location: { facing, rowIndex: 1, columnIndex: 2, mapName: 'Lava Grotto' },
                battleId,
                lastUpdate,
                id: 1,
                loggedIn: true,
                skipInstructions: true,
                spells: [],
                stats: {
                    playerName: 'Redwan',
                    level: 1,
                    hp: 10,
                    hpTotal: 10,
                    mp: 1,
                    mpTotal: 1,
                    gold: 7,
                    xp: 5,
                    xpTillNextLevel: 8,
                    attack: 5,
                    defense: 5,
                    agility: 5,
                }
            },
            isCurrentPlayer,
            isSaveLocation,
        };
        return shallow(<Character {...props} />);
    };

    it('is a div with a class name', () => {
        const subject = getCharacter();
        expect(subject.type()).toEqual('div');
        expect(subject.prop('className')).toEqual('player');
    });

    it("shows a hero's name on back when facing up", () => {
        const subject = getCharacter('up', undefined, undefined, true);
        expect(subject.find('.hero').find('.player-name-back').text()).toEqual(
            'Redwan'
        );
    });

    it("shows a hero's name on chest when facing down", () => {
        const subject = getCharacter('down', undefined, undefined, true);
        expect(subject.find('.hero').find('.player-name-front').text()).toEqual(
            'Redwan'
        );
    });

    it("shows a peer's name on back when facing up", () => {
        const subject = getCharacter('up');
        expect(subject.find('.peer').find('.player-name-back').text()).toEqual(
            'Redwan'
        );
    });

    it("shows a peer's name on chest when facing down", () => {
        const subject = getCharacter('down');
        expect(subject.find('.peer').find('.player-name-front').text()).toEqual(
            'Redwan'
        );
    });

    it('shows a heal-n-save notification when current user is at a save location', () => {
        const subject = getCharacter('right', undefined, undefined, true, true);
        const saved = subject.find('.saved');
        const notifications = saved.find('p');
        expect(notifications.length).toEqual(2);
        expect(notifications.at(0).text()).toEqual('HP/MP restored');
        expect(notifications.at(1).text()).toEqual('Game saved');
    });

    it('shows a dragon icon if player is in battle', () => {
        const subject = getCharacter('down', 'ff12ff34eeee');
        const icon = subject.find(FontAwesomeIcon);
        // @ts-ignore
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
        const subject = getCharacter('down', undefined, lastUpdate.toString());
        const icon = subject.find(FontAwesomeIcon);
        // @ts-ignore
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
        const subject = getCharacter('down', undefined, lastUpdate.toString());
        const icon = subject.find(FontAwesomeIcon);
        expect(icon.exists()).toEqual(false);
    });
});

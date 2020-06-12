import React, * as ReactAlias from 'react';
import { shallow } from 'enzyme';
import Log from './Log';
import * as Player from '../environment/sound/sound';
import { pauseSound } from '../environment/sound/sound';

describe('Log', () => {
    let scrollToRef;
    let props;
    let subject;

    beforeEach(() => {
        scrollToRef = {
            current: {
                scrollIntoView: jasmine.createSpy('scrollIntoView'),
            },
        };

        jest.spyOn(ReactAlias, 'useRef').mockImplementation(() => scrollToRef);
        jest.spyOn(ReactAlias, 'useEffect').mockImplementation((effect) =>
            effect()
        );
        jest.spyOn(ReactAlias, 'useLayoutEffect').mockImplementation((effect) =>
            effect()
        );
        spyOn(Player, 'pauseSound');
        spyOn(Player, 'playSound');

        props = {
            deliveredEntries: [],
            onDismiss: jasmine.createSpy('onDismiss'),
            showDismiss: false,
            statusClass: 'dire',
            allMessagesDelivered: true,
        };
        subject = shallow(<Log {...props} />);
    });

    it('is a div with the expected className', () => {
        expect(subject.type()).toEqual('div');
        expect(subject.prop('className')).toEqual('log dire');
    });

    it('has no content if delivered entries is empty', () => {
        expect(subject.find('p').exists()).toEqual(false);
    });

    it('has content of each delivered entry', () => {
        props.deliveredEntries = [
            { content: 'Enemies approach.' },
            { content: 'Redwan attacks Skeleton dealing 10 damage.' },
        ];
        subject = shallow(<Log {...props} />);
        const content = subject.find('p');
        expect(content.length).toEqual(2);
        expect(content.at(0).text()).toEqual('Enemies approach.');
        expect(content.at(1).text()).toEqual(
            'Redwan attacks Skeleton dealing 10 damage.'
        );
    });

    it("has a dismiss button if all messages have been received and the party wasn't destroyed", () => {
        props.deliveredEntries = [
            { content: 'Enemies approach.' },
            { content: 'Redwan attacks Skeleton dealing 10 damage.' },
            { content: 'Skeleton is defeated.' },
            { content: 'The enemies are defeated!' },
        ];
        props.allMessagesDelivered = true;
        props.showDismiss = true;
        subject = shallow(<Log {...props} />);
        const dismissButton = subject.find('.dismiss-button');
        expect(dismissButton.props()).toEqual({
            autoFocus: true,
            className: 'dismiss-button',
            onClick: jasmine.any(Function),
            children: 'OK',
        });
    });

    it("has a load save button if all messages have been received and the party wasn't destroyed", () => {
        props.deliveredEntries = [
            { content: 'Enemies approach.' },
            { content: 'Skeleton attacks Redwan dealing 10 damage.' },
            { content: 'Redwan is dead.' },
            { content: 'The party was destroyed!' },
        ];
        props.allMessagesDelivered = true;
        props.showDismiss = true;
        subject = shallow(<Log {...props} />);
        const dismissButton = subject.find('.dismiss-button');
        expect(dismissButton.props()).toEqual({
            autoFocus: true,
            className: 'dismiss-button',
            onClick: jasmine.any(Function),
            children: 'Load save',
        });
    });

    it('has a scroll to div that gets scrolled into view', () => {
        const scrollTo = subject.find('.scroll-to');
        expect(scrollTo.exists()).toEqual(true);
        expect(scrollToRef.current.scrollIntoView).toHaveBeenCalled();
    });

    it('has a player attack sound', () => {
        const playerAttackAudio = subject.find('.player-attack');
        expect(playerAttackAudio.type()).toEqual('audio');
        const playerAttackSource = playerAttackAudio.find('source');
        expect(playerAttackSource.prop('src')).toEqual(
            'FXhome.com Fighting Swing Sound 02.mp3'
        );
    });

    it('has an enemy attack sound', () => {
        const enemyAttackAudio = subject.find('.enemy-attack');
        expect(enemyAttackAudio.type()).toEqual('audio');
        const enemyAttackSource = enemyAttackAudio.find('source');
        expect(enemyAttackSource.prop('src')).toEqual(
            'FXhome.com Fighting Swing Sound 27.mp3'
        );
    });

    it('has a level up sound', () => {
        const leveUpAudio = subject.find('.level-up');
        expect(leveUpAudio.type()).toEqual('audio');
        const levelUpSource = leveUpAudio.find('source');
        expect(levelUpSource.prop('src')).toEqual(
            'cartoon_success_fanfair.mp3'
        );
    });

    it('has a party destroyed sound', () => {
        const partyDestroyedSound = subject.find('.party-destroyed');
        expect(partyDestroyedSound.type()).toEqual('audio');
        const partyDestroyedSource = partyDestroyedSound.find('source');
        expect(partyDestroyedSource.prop('src')).toEqual(
            'cartoon_fail_strings_trumpet.mp3'
        );
    });

    describe('sound effects', () => {
        let logEntryMusicPlayed;
        let setLogEntryMusicPlayed;
        beforeEach(() => {
            logEntryMusicPlayed = {};
            setLogEntryMusicPlayed = jasmine.createSpy(
                'setLogEntryMusicPlayed'
            );
            jest.spyOn(ReactAlias, 'useState').mockImplementation(() => [
                logEntryMusicPlayed,
                setLogEntryMusicPlayed,
            ]);
        });

        it('plays appropriate sounds through a victorious, level gaining battle', () => {
            props.deliveredEntries = [
                { content: 'Enemies approach.' },
                {
                    content: 'Redwan attacks Skeleton dealing 10 damage.',
                    targetId: '677d615c-32fe-4e8d-9992-3e110f26a185',
                },
            ];

            subject = shallow(<Log {...props} />);
            expect(Player.playSound).toHaveBeenCalledWith('player-attack');
            expect(setLogEntryMusicPlayed.calls.argsFor(0)[0]()).toEqual({
                '1': true,
            });

            props.deliveredEntries.push(
                { content: 'Skeleton is defeated.' },
                { content: 'The enemies are defeated!' },
                { content: 'Redwan has reached level 10!' }
            );
            subject = shallow(<Log {...props} />);

            expect(Player.pauseSound).toHaveBeenCalledWith('battle-music');
            expect(Player.playSound).toHaveBeenCalledWith('level-up');
            expect(setLogEntryMusicPlayed.calls.argsFor(1)[0]({
                '1': true,
            })).toEqual({
                '1': true,
                '4': true,
            });
        });

        it('plays appropriate sounds through a party defeat', () => {
            props.deliveredEntries = [
                { content: 'Enemies approach.' },
                { content: 'Skeleton attacks Redwan dealing 10 damage.' },
            ];

            subject = shallow(<Log {...props} />);
            expect(Player.playSound).toHaveBeenCalledWith('enemy-attack');
            expect(setLogEntryMusicPlayed.calls.argsFor(0)[0]()).toEqual({
                '1': true,
            });

            props.deliveredEntries.push(
                { content: 'Redwan is dead.' },
                { content: 'The party was destroyed!' }
            );
            subject = shallow(<Log {...props} />);

            expect(Player.pauseSound).toHaveBeenCalledWith('battle-music');
            expect(Player.playSound).toHaveBeenCalledWith('party-destroyed');
            expect(setLogEntryMusicPlayed.calls.argsFor(1)[0]({
                '1': true,
            })).toEqual({
                '1': true,
                '3': true,
            });
        });
    });
});

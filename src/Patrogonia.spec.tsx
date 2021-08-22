import React from 'react';
import { mount, shallow } from 'enzyme';
import Patrogonia from './Patrogonia';
import Battle from './battle/Battle';
import World from './environment/field/World';
import Landing from './landing/Landing';
import HowToPlay from './instructions/HowToPlay';
import * as PlayerStateAlias from './state/PlayerState';
import Player from './player/Player';
import { MemoryRouter, Route, Switch } from 'react-router-dom';
import PermissionRoute from './PermissionRoute';

describe('Patrogonia', () => {
    let currentPlayer: Player;
    let login: jasmine.Spy;
    let createAccount: jasmine.Spy;
    let updatePlayer: jasmine.Spy;
    let loadPlayer: jasmine.Spy;
    let loadSave: jasmine.Spy;
    let castSpell: jasmine.Spy;
    const originalProcess = window.process;

    beforeEach(() => {
        currentPlayer = {
            id: 0,
            lastUpdate: '',
            location: {
                mapName: 'Atoris',
                rowIndex: 6,
                columnIndex: 7,
                facing: 'down',
            },
            loggedIn: false,
            name: '',
            skipInstructions: false,
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
            },
        };
        login = jasmine.createSpy('login');
        createAccount = jasmine.createSpy('createAccount');
        updatePlayer = jasmine.createSpy('updatePlayer');
        loadPlayer = jasmine.createSpy('loadPlayer');
        loadSave = jasmine.createSpy('loadSave');
        castSpell = jasmine.createSpy('castSpell');

        window.process = {
            // @ts-ignore
            env: {
                REACT_APP_WEBSOCKET_BASE_URL: 'wss://localhost:8443',
            },
        };
    });

    afterEach(() => {
        window.process = originalProcess;
    });

    const getSubject = () => {
        spyOn(PlayerStateAlias, 'PlayerState').and.returnValue([
            currentPlayer,
            login,
            createAccount,
            updatePlayer,
            loadPlayer,
            loadSave,
            castSpell,
        ]);
        return shallow(<Patrogonia />);
    };

    it('is a Switch of Routes', () => {
        const subject = getSubject();
        expect(subject.type()).toEqual(Switch);

        const howToPlayRoute = subject.childAt(0);
        expect(howToPlayRoute.type()).toEqual(Route);
        expect(howToPlayRoute.prop('path')).toEqual('/how-to-play');
        expect(howToPlayRoute.childAt(0).type()).toEqual(HowToPlay);

        const battleRoute = subject.childAt(1);
        expect(battleRoute.type()).toEqual(PermissionRoute);
        expect(battleRoute.prop('path')).toEqual('/battle');
        expect(battleRoute.childAt(0).type()).toEqual(Battle);

        const worldRoute = subject.childAt(2);
        expect(worldRoute.type()).toEqual(PermissionRoute);
        expect(worldRoute.prop('path')).toEqual('/field');
        expect(worldRoute.childAt(0).childAt(0).type()).toEqual(World);

        const landingRoute = subject.childAt(3);
        expect(landingRoute.type()).toEqual(Route);
        expect(landingRoute.prop('path')).toEqual(['/', '/login']);
        expect(landingRoute.childAt(0).type()).toEqual(Landing);
    });

    it('shows the landing page by default', () => {
        const subject = getSubject();
        const landing = subject.find(Landing);
        expect(landing.props()).toEqual({
            login,
            createAccount,
        });
    });

    it('shows instructions once the user has logged in', () => {
        currentPlayer.loggedIn = true;
        const subject = getSubject();
        const howToPlay = subject.find(HowToPlay);
        expect(howToPlay.exists()).toEqual(true);
    });

    it('updates player to skip instructions once dismissed', () => {
        currentPlayer.loggedIn = true;
        spyOn(PlayerStateAlias, 'PlayerState').and.returnValue([
            currentPlayer,
            login,
            createAccount,
            updatePlayer,
            loadPlayer,
            loadSave,
            castSpell,
        ]);
        mount(
            <MemoryRouter>
                <Patrogonia />
            </MemoryRouter>
        );

        expect(updatePlayer).toHaveBeenCalledWith(
            {
                ...currentPlayer,
                loggedIn: true,
                skipInstructions: true,
            },
            false
        );
    });

    it('sets nextPath on HowToPlay to login initially', () => {
        const subject = getSubject();
        const howToPlay = subject.find(HowToPlay);
        expect(howToPlay.prop('nextPath')).toEqual('/login');
    });

    it('sets nextPath on HowToPlay to field if player is logged in', () => {
        currentPlayer.loggedIn = true;
        const subject = getSubject();
        const howToPlay = subject.find(HowToPlay);
        expect(howToPlay.prop('nextPath')).toEqual('/field');
    });

    it("returns World when the player has logged in, already viewed instructions, and isn't in battle", () => {
        currentPlayer.loggedIn = true;
        currentPlayer.skipInstructions = true;
        const subject = getSubject();
        const world = subject.find(World);
        expect(world.props()).toEqual({
            currentPlayer,
            castSpell,
            updatePlayer: jasmine.any(Function),
        });
    });

    it('returns Battle when the player has logged in, already viewed instructions, and is in battle', () => {
        currentPlayer.loggedIn = true;
        currentPlayer.skipInstructions = true;
        currentPlayer.battleId = 'abcdef12345';
        const subject = getSubject();
        const battle = subject.find(Battle);
        expect(battle.props()).toEqual({
            currentPlayer,
            loadPlayer,
            updatePlayer,
            battleUrl: 'wss://localhost:8443/battles',
            loadSave,
        });
    });
});

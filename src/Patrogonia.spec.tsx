import React from 'react';
import { shallow } from 'enzyme';
import Patrogonia from './Patrogonia';
import Battle from './battle/Battle';
import World from './environment/field/World';
import Landing from './landing/Landing';
import HowToPlay from './instructions/HowToPlay';
import * as PlayerStateAlias from './state/PlayerState';
import Player from "./player/Player";

describe('Patrogonia', () => {
    const currentPlayer: Player = {
        id: 0,
        lastUpdate: "",
        location: {
            mapName: 'field1',
            rowIndex: 6,
            columnIndex: 7,
            facing: 'down'
        },
        loggedIn: false,
        name: "",
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
        }
    };
    const login = jasmine.createSpy('login');
    const createAccount = jasmine.createSpy('createAccount');
    const updatePlayer = jasmine.createSpy('updatePlayer');
    const loadPlayer = jasmine.createSpy('loadPlayer');
    const loadSave = jasmine.createSpy('loadSave');
    const originalProcess = window.process;

    beforeEach(() => {
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
        ]);
        return shallow(<Patrogonia />);
    };

    it('is a div with the expected classname', () => {
        const subject = getSubject();
        expect(subject.type()).toEqual('div');
        expect(subject.prop('className')).toEqual('patrogonia');
    });

    it('shows the landing page by default', () => {
        const subject = getSubject();
        const landing = subject.find(Landing);
        expect(landing.props()).toEqual({
            login,
            createAccount,
            showInstructions: jasmine.any(Function),
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
        const subject = getSubject();
        const howToPlay = subject.find(HowToPlay);

        howToPlay.simulate('dismiss');

        expect(updatePlayer).toHaveBeenCalledWith(
            {
                ...currentPlayer,
                loggedIn: true,
                skipInstructions: true,
            },
            false
        );
    });

    it("doesn't show instructions when skipInstructions is true", () => {
        currentPlayer.loggedIn = true;
        currentPlayer.skipInstructions = true;
        const subject = getSubject();
        const howToPlay = subject.find(HowToPlay);
        expect(howToPlay.exists()).toEqual(false);
    });

    it("returns World when the player has logged in, already viewed instructions, and isn't in battle", () => {
        currentPlayer.loggedIn = true;
        currentPlayer.skipInstructions = true;
        const subject = getSubject();
        const world = subject.find(World);
        expect(world.props()).toEqual({
            currentPlayer,
            playerUrl: 'wss://localhost:8443/players',
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
            loadSave
        });
    });
});

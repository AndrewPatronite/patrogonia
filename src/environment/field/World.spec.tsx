import React, * as ReactAlias from 'react';
import { isEqual } from 'lodash';
import { shallow } from 'enzyme';
import World from './World';
import { Legend } from '../maps/Legend';
import TileRow from './TileRow';
import * as DisplayRangeHelper from './helper/getMapDisplayRange';
import * as MapStateAlias from '../../state/MapState';
import * as LocationToPlayerHelper from './helper/getLocationToPlayerMap';
import * as Subscriptions from '../../subscription/subscribe';
import * as Player from '../sound/sound';
import PlayerStatsModal from '../../player/PlayerStatsModal';

describe('World', () => {
    const { WATER: W, GRASS: G, TOWN: T } = Legend.symbols;
    const map = {
        layout: [
            [W, W, W, W, W],
            [W, W, G, W, W],
            [W, G, T, G, W],
            [W, W, G, W, W],
            [W, W, W, W, W],
        ],
    };
    const currentPlayer = {
        id: 1,
        location: { mapName: 'cave1', rowIndex: 1, columnIndex: 2 },
        stats: { hp: 9 },
    };
    const anotherPlayer = {
        id: 2,
        location: { mapName: 'field1', rowIndex: 3, columnIndex: 4 },
        stats: { hp: 10 },
    };
    const mapPlayers = {
        field1: [anotherPlayer],
        cave1: [currentPlayer],
    };
    const locationToPlayersMap = {
        '1-2': [currentPlayer],
    };

    let props;
    let subject;
    let playerLocationSubscription;
    let setShowPlayerStatsModal;

    beforeEach(() => {
        setShowPlayerStatsModal = jasmine.createSpy('setShowPlayerStatsModal');
        jest.spyOn(ReactAlias, 'useState').mockImplementation(
            (initialState) => {
                if (isEqual(initialState, {})) {
                    return [initialState, () => {}];
                } else if (initialState === false) {
                    return [initialState, setShowPlayerStatsModal];
                }
            }
        );
        jest.spyOn(ReactAlias, 'useEffect').mockImplementation((effect) =>
            effect()
        );
        spyOn(Player, 'playSound');
        spyOn(Player, 'pauseSound');
        playerLocationSubscription = {
            close: jasmine.createSpy('close'),
        };
        spyOn(Subscriptions, 'subscribe').and.returnValue(
            playerLocationSubscription
        );
        spyOn(MapStateAlias, 'MapState').and.returnValue([map, mapPlayers]);
        spyOn(LocationToPlayerHelper, 'getLocationToPlayerMap').and.returnValue(
            locationToPlayersMap
        );
        spyOn(DisplayRangeHelper, 'getMapDisplayRange').and.returnValue({
            rowStartIndex: 1,
            rowEndIndex: 3,
            columnStartIndex: 1,
            columnEndIndex: 3,
        });
        jest.useFakeTimers();
        props = {
            currentPlayer,
            playerUrl: 'wss://localhost:8443/players',
        };
        subject = shallow(<World {...props} />);
    });

    it('is a div with the expected className', () => {
        expect(subject.type()).toEqual('div');
        expect(subject.prop('className')).toEqual('world');
    });

    it('has TileRows for a subset of the map based on the display range', () => {
        const tileRows = subject.find(TileRow);
        expect(tileRows.length).toEqual(3);
        expect(tileRows.at(0).props()).toEqual({
            rowSymbols: map.layout[1],
            rowIndex: 1,
            locationToPlayersMap,
            displayIndexRange: {
                rowStartIndex: 1,
                rowEndIndex: 3,
                columnStartIndex: 1,
                columnEndIndex: 3,
            },
            mapLayout: map.layout,
            currentPlayer,
        });
        expect(tileRows.at(1).props()).toEqual({
            rowSymbols: map.layout[2],
            rowIndex: 2,
            locationToPlayersMap,
            displayIndexRange: {
                rowStartIndex: 1,
                rowEndIndex: 3,
                columnStartIndex: 1,
                columnEndIndex: 3,
            },
            mapLayout: map.layout,
            currentPlayer,
        });
        expect(tileRows.at(2).props()).toEqual({
            rowSymbols: map.layout[3],
            rowIndex: 3,
            locationToPlayersMap,
            displayIndexRange: {
                rowStartIndex: 1,
                rowEndIndex: 3,
                columnStartIndex: 1,
                columnEndIndex: 3,
            },
            mapLayout: map.layout,
            currentPlayer,
        });
    });

    it('has music for field maps', () => {
        const fieldMusic = subject.find('audio').at(0);
        expect(fieldMusic.props()).toEqual({
            className: 'field-music',
            autoPlay: true,
            loop: true,
            children: jasmine.anything(),
        });
        expect(fieldMusic.childAt(0).prop('src')).toEqual(
            'BattleHighlands.mp3'
        );
    });

    it('has music for cave maps', () => {
        const caveMusic = subject.find('audio').at(1);
        expect(caveMusic.props()).toEqual({
            className: 'cave-music',
            autoPlay: true,
            loop: true,
            children: jasmine.anything(),
        });
        expect(caveMusic.childAt(0).prop('src')).toEqual(
            'AcrosstheSandWIP2.mp3'
        );
    });

    describe('PlayerStatsModal', () => {
        it('has the expected props', () => {
            const playerStatsModal = subject.find(PlayerStatsModal);
            expect(playerStatsModal.props()).toEqual({
                showPlayerStats: false,
                onClose: jasmine.any(Function),
                stats: currentPlayer.stats,
            });
        });

        it('toggles the modal to be invisible onClose', () => {
            const playerStatsModal = subject.find(PlayerStatsModal);
            playerStatsModal.simulate('close');
            expect(setShowPlayerStatsModal).toHaveBeenCalledWith(false);
        });
    });

    it('plays field music for field maps', () => {
        props.currentPlayer = anotherPlayer;
        subject = shallow(<World {...props} />);

        expect(Player.pauseSound).toHaveBeenCalledWith('cave-music');
        expect(Player.playSound).toHaveBeenCalledWith('field-music');
    });

    it('plays cave music for cave maps', () => {
        expect(Player.pauseSound).toHaveBeenCalledWith('field-music');
        expect(Player.playSound).toHaveBeenCalledWith('cave-music');
    });

    it('subscribes to player location notifications and closes the connection during unmounting', () => {
        expect(Subscriptions.subscribe).toHaveBeenCalledWith(
            props.playerUrl,
            jasmine.any(Function)
        );
        ReactAlias.useEffect.mock.calls[1][0]()();
        expect(playerLocationSubscription.close).toHaveBeenCalled();
    });

    it('sets show player stats modal via 5 second timer that it clears ', () => {
        expect(setShowPlayerStatsModal).toHaveBeenCalledWith(false);

        jest.runAllTimers();
        expect(setTimeout).toHaveBeenCalledWith(jasmine.any(Function), 5000)
        expect(setShowPlayerStatsModal).toHaveBeenCalledWith(true);

        ReactAlias.useEffect.mock.calls[2][0]()()
        expect(clearTimeout).toHaveBeenCalled()
    });
});

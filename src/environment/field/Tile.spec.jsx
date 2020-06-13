import React from 'react';
import { shallow } from 'enzyme';
import Tile from './Tile';
import Player from '../../player/Player';
import { Legend } from '../maps/Legend';

describe('Tile', () => {
    const { GRASS: G, WATER: W, TOWN: T } = Legend.symbols;
    const map = {
        layout: [
            [W, W, W, W, W, W, W, W, W, W],
            [W, W, W, W, W, W, W, W, W, W],
            [W, W, W, W, W, W, W, W, W, W],
            [W, W, W, W, W, W, W, W, W, W],
            [W, W, W, W, W, W, W, W, W, W],
            [W, W, W, W, W, G, T, W, W, W],
            [W, W, W, W, 'cave1', G, G, W, W, W],
            [W, W, W, W, G, G, G, W, W, W],
            [W, W, W, W, W, W, W, W, W, W],
            [W, W, W, W, W, W, W, W, W, W],
        ],
    };
    const currentPlayer = {
        id: 1,
    };
    const currentPlayerCompanion = {
        id: 2,
    };
    const stranger = {
        id: 3,
    };
    const saved = {
        id: 4,
    };
    const townie = {
        id: 5,
    };

    let props;

    const getSubject = (rowIndex, columnIndex) => {
        props = {
            mapSymbol: map.layout[rowIndex][columnIndex],
            rowIndex,
            columnIndex,
            locationToPlayersMap: {
                '5-5': [currentPlayer, currentPlayerCompanion],
                '5-6': [saved, townie],
                '7-4': [stranger],
            },
            mapLayout: map.layout,
            currentPlayer,
        };
        return shallow(<Tile {...props} />);
    };

    it('is a div with the expected classNames', () => {
        const subject = getSubject(6, 4);
        expect(subject.type()).toEqual('div');
        expect(subject.prop('className')).toEqual(
            'tile rc6-4 entrance water-above water-left'
        );
    });

    it('has an entrance', () => {
        const subject = getSubject(6, 4);
        expect(subject.prop('className')).toEqual(
            'tile rc6-4 entrance water-above water-left'
        );
        expect(subject.find('p').text()).toEqual('cave1');
    });

    it('has the expected classNames shows current player if more than one on the tile', () => {
        const subject = getSubject(5, 5);
        expect(subject.prop('className')).toEqual(
            'tile rc5-5 grass water-above water-left'
        );
        const player = subject.find(Player);
        expect(player.props()).toEqual({
            player: currentPlayer,
            isCurrentPlayer: true,
            isSaveLocation: false,
        });
    });

    it('has the expected classNames and a player', () => {
        const subject = getSubject(7, 4);
        expect(subject.prop('className')).toEqual(
            'tile rc7-4 grass water-left water-below'
        );
        const player = subject.find(Player);
        expect(player.props()).toEqual({
            player: stranger,
            isCurrentPlayer: false,
            isSaveLocation: false,
        });
    });

    it('has the expected classNames and a player at a town', () => {
        const subject = getSubject(5, 6);
        expect(subject.prop('className')).toEqual(
            'tile rc5-6 town water-above water-right'
        );
        const player = subject.find(Player);
        expect(player.props()).toEqual({
            player: saved,
            isCurrentPlayer: false,
            isSaveLocation: true,
        });
    });
});

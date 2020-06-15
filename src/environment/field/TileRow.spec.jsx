import React from 'react';
import { shallow } from 'enzyme';
import TileRow from './TileRow';
import { Legend } from '../maps/Legend';
import Tile from './Tile';

describe('TileRow', () => {
    const { WATER: W, GRASS: G, TOWN: T } = Legend.symbols;
    const mapLayout = [
        [W, W, W, W, W],
        [W, W, G, W, W],
        [W, G, T, G, W],
        [W, W, G, W, W],
        [W, W, W, W, W],
    ];
    const rowIndex = 2;
    const currentPlayer = { id: 1 };
    let props;
    let subject;

    beforeEach(() => {
        props = {
            rowSymbols: mapLayout[rowIndex],
            rowIndex,
            locationToPlayersMap: {
                cave1: [currentPlayer],
            },
            displayIndexRange: { columnStartIndex: 1, columnEndIndex: 3 },
            mapLayout,
            currentPlayer,
        };
        subject = shallow(<TileRow {...props} />);
    });

    it('is a div with the expected className', () => {
        expect(subject.type()).toEqual('div');
        expect(subject.prop('className')).toEqual('row');
    });

    it("has Tiles for the subset of the row's symbols based on the display range", () => {
        const tiles = subject.find(Tile);
        expect(tiles.length).toEqual(3);
        expect(tiles.at(0).props()).toEqual({
            mapSymbol: G,
            rowIndex,
            columnIndex: 1,
            locationToPlayersMap: props.locationToPlayersMap,
            mapLayout,
            currentPlayer
        });
        expect(tiles.at(1).props()).toEqual({
            mapSymbol: T,
            rowIndex,
            columnIndex: 2,
            locationToPlayersMap: props.locationToPlayersMap,
            mapLayout,
            currentPlayer
        });
        expect(tiles.at(2).props()).toEqual({
            mapSymbol: G,
            rowIndex,
            columnIndex: 3,
            locationToPlayersMap: props.locationToPlayersMap,
            mapLayout,
            currentPlayer
        });
    });
});

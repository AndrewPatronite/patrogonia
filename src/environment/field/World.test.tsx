import React from 'react';
import World from './World';
import { Legend } from '../maps/Legend';
import { ModalEnum, ModalInterface } from '../../context';
import { Player } from '../../player';
import { Direction } from '../../navigation';
import { act, fireEvent, RenderResult, screen } from '@testing-library/react';
import { Sound } from '../sound';
import { CaveName, ContinentName, MapName, TownName } from '../maps/types';
import { useModalState, usePlayer, useSound } from '../../hooks';
import { useMap } from './useMap';
import { renderChakra } from '../../../test/utils';

jest.mock('./useMap', () => ({ useMap: jest.fn() }));

jest.mock('./useNpcMovementEffect', () => ({
  useNpcMovementEffect: jest.fn(),
}));

jest.mock('../../hooks', () => ({
  useModalState: jest.fn(),
  usePlayer: jest.fn(),
  useSound: jest.fn(),
}));

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
}));

describe('World', () => {
  const { WATER: W, GRASS: G } = Legend.symbols;
  const map = {
    layout: [
      [W, W, W, W, W],
      [W, W, G, W, W],
      [W, G, TownName.Dewhurst, G, W],
      [W, W, G, W, W],
      [W, W, W, W, W],
    ],
  };
  let modalState: ModalInterface;
  let playSound: jest.Mock;
  let pauseSound: jest.Mock;
  let renderResult: RenderResult;

  const setup = (
    isModalOpen: (modal: ModalEnum) => boolean = () => false,
    mapName: MapName = CaveName.LavaGrotto,
    content: string = ''
  ) => {
    const currentPlayer: Player = {
      id: 1,
      location: {
        mapName,
        rowIndex: 1,
        columnIndex: 2,
        entranceName: ContinentName.Atoris,
        facing: Direction.Down,
      },
      //@ts-expect-error missing fields
      stats: { hp: 9, hpTotal: 10, mp: 4, mpTotal: 5 },
      inventory: [],
      spells: [],
    };
    const locationToPlayerMap = {
      '1-2': [currentPlayer],
    };
    modalState = {
      closeModal: jest.fn(),
      isModalOpen,
      openModal: jest.fn(),
      getModalContent: () => ({
        content,
      }),
    };
    (useModalState as jest.Mock).mockReturnValue(modalState);
    playSound = jest.fn();
    pauseSound = jest.fn();
    (useSound as jest.Mock).mockReturnValue({
      playSound,
      pauseSound,
    });
    (usePlayer as jest.Mock).mockReturnValue({
      currentPlayer,
      updatePlayer: jest.fn(),
      castSpell: jest.fn(),
    });
    (useMap as jest.Mock).mockReturnValue({
      map,
      players: [currentPlayer],
      npcs: [],
      locationToPlayerMap,
      mapDisplayRange: {
        rowStartIndex: 1,
        rowEndIndex: 3,
        columnStartIndex: 1,
        columnEndIndex: 3,
      },
    });
    jest.useFakeTimers();
    jest
      .spyOn(global, 'setTimeout')
      //@ts-expect-error Types of parameters callback and handler are incompatible.
      .mockImplementation((callback: () => void) => {
        callback();
        return 0;
      });
    jest.spyOn(global, 'clearTimeout');
    //false error: Image is missing required "alt" property.
    jest.spyOn(console, 'error').mockImplementation();
    renderResult = renderChakra(<World />);
  };

  it('has TileRows for a subset of the map based on the display range', () => {
    const verifyTile = (
      tile: Element,
      expectedTileClassId: string,
      expectedMapSymbol: string
    ) => {
      expect((tile.getAttribute('class') || '').includes(expectedTileClassId));
      expect(tile.getAttribute('mapsymbol')).toEqual(expectedMapSymbol);
    };

    setup();
    const tileRows = screen.getAllByTestId('tile-row');
    expect(tileRows.length).toEqual(3);
    verifyTile(tileRows[0].children[0], 'rc1-1', W);
    verifyTile(tileRows[0].children[1], 'rc1-2', G);
    verifyTile(tileRows[0].children[2], 'rc1-3', W);
    verifyTile(tileRows[1].children[0], 'rc2-1', G);
    verifyTile(tileRows[1].children[1], 'rc2-2', TownName.Dewhurst);
    verifyTile(tileRows[1].children[2], 'rc2-3', G);
    verifyTile(tileRows[2].children[0], 'rc3-1', W);
    verifyTile(tileRows[2].children[1], 'rc3-2', G);
    verifyTile(tileRows[2].children[2], 'rc3-3', W);
  });

  it('displays player stats', () => {
    setup((modal) => modal === ModalEnum.PlayerStats);
    expect(screen.getByRole('heading').textContent).toEqual('Stats');
    expect(screen.getByText('9/10')).toBeInTheDocument();
    expect(screen.getByText('4/5')).toBeInTheDocument();
  });

  it('displays a field menu', () => {
    setup((modal) => modal === ModalEnum.FieldMenu);
    const menuSections = screen.getAllByRole('button');
    expect(menuSections.length).toEqual(5);
    expect(menuSections[0].textContent).toEqual('Stats');
    expect(menuSections[1].textContent).toEqual('Spells');
    expect(menuSections[2].textContent).toEqual('Items');
    expect(menuSections[3].textContent).toEqual('Options');
    expect(menuSections[4].textContent).toEqual('<< Back');
  });

  it('displays dialogue', () => {
    setup(
      (modal) => modal === ModalEnum.Dialog,
      TownName.Dewhurst,
      "Important stuff n' things"
    );
    expect(screen.getByText("Important stuff n' things")).toBeInTheDocument();
    const okButton = screen.getByRole('button', { name: 'OK' });
    fireEvent.click(okButton);
    expect(modalState.closeModal).toHaveBeenCalled();
  });

  it('plays field music for field maps', () => {
    setup(() => false, ContinentName.Atoris);
    expect(playSound).toHaveBeenCalledWith(Sound.FieldMusic);
  });

  it('plays cave music for cave maps', () => {
    setup();
    expect(playSound).toHaveBeenCalledWith(Sound.CaveMusic);
  });

  it('plays town music for town maps', () => {
    setup(() => false, TownName.Dewhurst);
    expect(playSound).toHaveBeenCalledWith(Sound.TownMusic);
  });

  it('sets show player stats modal via 5 second timer that it clears ', () => {
    setup();
    expect(modalState.closeModal).toHaveBeenCalled();
    act(() => {
      jest.runAllTimers();
      expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), 5000);
      expect(modalState.openModal).toHaveBeenCalledWith(ModalEnum.PlayerStats);
      renderResult.unmount();
      expect(clearTimeout).toHaveBeenCalled();
    });
  });
});

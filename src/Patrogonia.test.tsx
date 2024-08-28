import React from 'react';
import Patrogonia from './Patrogonia';
import { MemoryRouter } from 'react-router-dom';
import { Player } from './player';
import { startingLocation } from './landing/startingLocation';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { useBattle, useMap, useModalState, usePlayer, useSound } from './hooks';
import { encrypt } from './landing/helper';
import { EnemyName } from './battle/types';
import { BattleStatus } from './battle/types/BattleStatus';
import { Sound } from './environment/sound';

jest.mock('./hooks', () => ({
  usePlayer: jest.fn(),
  useSound: jest.fn(),
  useNpcMovementEffect: jest.fn(),
  useBattle: jest.fn(),
  useModalState: jest.fn(),
  useMap: jest.fn(),
}));

describe('Patrogonia', () => {
  let castSpell: jest.Mock;
  let createAccount: jest.Mock;
  let currentPlayer: Partial<Player>;
  let login: jest.Mock;
  let updatePlayer: jest.Mock;
  let playSound: jest.Mock;

  const setup = (loggedIn = false, battleId?: string) => {
    currentPlayer = {
      id: 1,
      lastUpdate: '',
      location: startingLocation,
      loggedIn,
      name: '',
      spells: [],
      stats: {
        playerId: 1,
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
      battleId,
    };
    castSpell = jest.fn();
    createAccount = jest.fn();
    login = jest.fn();
    updatePlayer = jest.fn();
    (usePlayer as jest.Mock).mockReturnValue({
      castSpell,
      createAccount,
      currentPlayer,
      login,
      updatePlayer,
    });
    playSound = jest.fn();
    (useSound as jest.Mock).mockReturnValue({
      playSound,
      pauseSound: jest.fn(),
    });
    (useBattle as jest.Mock).mockReturnValue({
      battle: {
        status: BattleStatus.InProgress,
        enemies: [
          {
            id: '67dbaadd-5326-4dd6-b5d6-d51bea13ed6f',
            name: EnemyName.Knight,
            stats: {
              hp: 25,
            },
          },
        ],
      },
    });
    (useModalState as jest.Mock).mockReturnValue({
      isModalOpen: () => false,
      getModalContent: () => ({
        content: '',
      }),
      closeModal: jest.fn(),
    });
    (useMap as jest.Mock).mockReturnValue({});
    render(
      <MemoryRouter initialEntries={['/login']}>
        <Patrogonia />
      </MemoryRouter>
    );
  };

  describe('LandingPage', () => {
    it('shows the landing page by default', () => {
      setup();
      expect(screen.getByRole('heading').textContent).toEqual(
        'Chronicles of Patrogonia'
      );
    });

    it('creates an account via Quick start', () => {
      setup();
      fireEvent.click(screen.getByText('Start', { selector: 'button' }));
      expect(createAccount).toHaveBeenCalledWith({
        location: startingLocation,
        name: expect.anything(),
        password: expect.anything(),
        username: expect.anything(),
      });
    });

    it('logs user in', async () => {
      setup();
      fireEvent.click(screen.getByText('Login', { selector: 'button' }));
      fireEvent.change(screen.getByRole('textbox', { name: 'Username' }), {
        target: { value: 'Redwan' },
      });
      fireEvent.click(screen.getByText('Show', { selector: 'button' }));
      fireEvent.change(screen.getByRole('textbox', { name: 'Password' }), {
        target: { value: 'OpenSesame!' },
      });
      fireEvent.click(screen.getAllByText('Login', { selector: 'button' })[1]);
      await waitFor(() =>
        expect(login).toHaveBeenCalledWith('Redwan', encrypt('OpenSesame!'))
      );
    });
  });

  describe('Battle', () => {
    const originalScrollIntoView = window.HTMLElement.prototype.scrollIntoView;

    beforeEach(() => {
      window.HTMLElement.prototype.scrollIntoView = jest.fn();
    });

    afterEach(() => {
      window.HTMLElement.prototype.scrollIntoView = originalScrollIntoView;
    });

    it('routes to the Battle if user is logged in and battleId is set', () => {
      setup(true, 'abcdef1234');
      expect(playSound).toHaveBeenCalledWith(Sound.BattleMusic, [
        Sound.FieldMusic,
        Sound.CaveMusic,
      ]);
      expect(window.HTMLElement.prototype.scrollIntoView).toHaveBeenCalled();
    });
  });

  describe('World', () => {
    it('routes the user to the World if user is logged in and not in battle', () => {
      setup(true);
      expect(playSound).toHaveBeenCalledWith(Sound.FieldMusic, [
        Sound.CaveMusic,
        Sound.TownMusic,
      ]);
    });
  });
});

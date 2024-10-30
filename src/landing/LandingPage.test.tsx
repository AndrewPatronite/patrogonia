import React from 'react';
import { Player } from '../player';
import { startingLocation } from './startingLocation';
import {
  fireEvent,
  RenderResult,
  screen,
  waitFor,
} from '@testing-library/react';
import { usePlayer } from '../hooks';
import { encrypt } from './helper';
import { usePathname } from 'next/navigation';
import LandingPage from './LandingPage';
import { renderChakra } from '../../test/utils';

jest.mock('../hooks', () => ({
  usePlayer: jest.fn(),
}));

describe('LandingPage', () => {
  const lastUpdate = new Date().toISOString();
  const originalEnvBuildDate = process.env.NEXT_PUBLIC_BUILD_DATE;
  let createAccount: jest.Mock;
  let currentPlayer: Partial<Player>;
  let login: jest.Mock;
  let renderResult: RenderResult;

  const setup = () => {
    process.env.NEXT_PUBLIC_BUILD_DATE = lastUpdate;
    currentPlayer = {};
    createAccount = jest.fn();
    login = jest.fn();
    (usePlayer as jest.Mock).mockReturnValue({
      createAccount,
      currentPlayer,
      login,
    });
    (usePathname as jest.Mock).mockReturnValue('/login');
    renderResult = renderChakra(<LandingPage />);
  };

  afterEach(() => {
    process.env.NEXT_PUBLIC_BUILD_DATE = originalEnvBuildDate;
  });

  it('has a title', () => {
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

  it('shows the last update', () => {
    setup();
    expect(renderResult.container).toHaveTextContent(
      `Last update: ${new Date(lastUpdate).toLocaleString()}`
    );
  });

  it('provides recommended settings', () => {
    setup();
    expect(renderResult.container).toHaveTextContent(
      'Recommended: Chrome with viewport: 1000 x 1000'
    );
  });

  it('has instructions', () => {
    setup();

    fireEvent.click(screen.getByRole('button', { name: 'How to Play' }));

    expect(screen.getByRole('dialog')).toHaveTextContent(
      [
        'How to Play',
        'Introduction',
        'Movement',
        'Field menu',
        'Saving/Healing',
        'Conversation',
        'Battle commands',
        'Caves',
        'Chronicles of Patrogonia is a classic RPGwhere you gain experience and goldby defeating enemies in battle.',
        'Next',
        'Move using the direction keys:WADS or ',
        'Press Enter to open the field menu.',
        'Visit a town to restoreyour health and magicand save your progress.',
        'Press Space Bar to talk tovillagers in dialog range .',
        '1. Choose a command:',
        'with the arrow keys',
        'or click an entry',
        'or press the number keymatching the entry',
        '1Attack',
        '2Heal',
        '3Ice',
        '4Parry',
        '5run',
        '2. Press Enter to confirm the command.',
        'Enter the Lava Grottoto venture onwardto Grimes.',
      ].join('')
    );
  });

  it('has credits', () => {
    setup();

    fireEvent.click(screen.getByRole('button', { name: 'Credits' }));

    expect(screen.getByRole('dialog')).toHaveTextContent(
      [
        'Created by',
        'Andrew Patronite',
        'Linked',
        'patronite@gmail.com',
        'Music',
        'Crusaderp',
        'https://soundcloud.com/crusaderp/sets/the-frontier',
        'Battle sound effects',
        'James Tubbritt (Sharp)',
        'http://www.irishacts.com',
        'Trumpet, spell, and dialogue sound effects',
        'https://www.zapsplat.com',
      ].join('')
    );
  });
});

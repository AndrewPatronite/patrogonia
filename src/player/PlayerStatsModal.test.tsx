import React from 'react';
import PlayerStatsModal, { PlayerStatsModalProps } from './PlayerStatsModal';
import { render, screen } from '@testing-library/react';

describe('PlayerStatsModal', () => {
  let props: PlayerStatsModalProps;

  beforeEach(() => {
    props = {
      isOpen: true,
      onClose: jest.fn(),
      stats: {
        playerId: 1,
        playerName: 'Redwan',
        level: 1,
        hp: 9,
        hpTotal: 12,
        mp: 1,
        mpTotal: 1,
        gold: 6,
        xp: 8,
        xpTillNextLevel: 7,
        attack: 5,
        defense: 4,
        agility: 5,
      },
    };
    render(<PlayerStatsModal {...props} />);
  });

  it('displays the stats', () => {
    expect(screen.getByRole('heading').textContent).toEqual('Stats');
    const stats = screen.getAllByTestId('player-stat');
    expect(stats.length).toEqual(10);
    expect(stats[0].textContent).toEqual(`Player${props.stats.playerName}`);
    expect(stats[1].textContent).toEqual(`Level${props.stats.level}`);
    expect(stats[2].textContent).toEqual(
      `HP${props.stats.hp}/${props.stats.hpTotal}`
    );
    expect(stats[3].textContent).toEqual(
      `MP${props.stats.mp}/${props.stats.mpTotal}`
    );
    expect(stats[4].textContent).toEqual(`Gold${props.stats.gold}`);
    expect(stats[5].textContent).toEqual(`XP${props.stats.xp}`);
    expect(stats[6].textContent).toEqual(
      `XP till next level${props.stats.xpTillNextLevel}`
    );
    expect(stats[7].textContent).toEqual(`Attack${props.stats.attack}`);
    expect(stats[8].textContent).toEqual(`Defense${props.stats.defense}`);
    expect(stats[9].textContent).toEqual(`Agility${props.stats.agility}`);
  });
});

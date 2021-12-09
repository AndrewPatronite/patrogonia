import React from 'react'
import PlayerStatsPanel from './PlayerStatsPanel'
import { render, screen } from '@testing-library/react'

describe('PlayerStatsPanel', () => {
  const playerStats = {
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
  }

  it('can omit the heading based on props', () => {
    render(<PlayerStatsPanel playerStats={playerStats} showHeading={false} />)
    expect(
      screen.queryByRole('heading', { name: 'Stats' })
    ).not.toBeInTheDocument()
  })

  it('has player stats housing individual stats', () => {
    render(<PlayerStatsPanel playerStats={playerStats} />)
    expect(screen.queryByRole('heading', { name: 'Stats' })).toBeInTheDocument()
    const playerStatRows = screen.getAllByTestId('player-stat')
    expect(playerStatRows.length).toEqual(10)
    expect(playerStatRows[0].textContent).toEqual('PlayerRedwan')
    expect(playerStatRows[1].textContent).toEqual('Level1')
    expect(playerStatRows[2].textContent).toEqual('HP9/12')
    expect(playerStatRows[3].textContent).toEqual('MP1/1')
    expect(playerStatRows[4].textContent).toEqual('Gold6')
    expect(playerStatRows[5].textContent).toEqual('XP8')
    expect(playerStatRows[6].textContent).toEqual('XP till next level7')
    expect(playerStatRows[7].textContent).toEqual('Attack5')
    expect(playerStatRows[8].textContent).toEqual('Defense4')
    expect(playerStatRows[9].textContent).toEqual('Agility5')
  })
})

import React from 'react'
import Log, { LogProps } from './Log'
import { Sound } from '../environment/sound'
import { fireEvent, render, RenderResult, screen } from '@testing-library/react'
import { useSound } from '../hooks'

jest.mock('../hooks', () => ({
  useSound: jest.fn(),
}))

describe('Log', () => {
  const originalScrollIntoView = window.HTMLElement.prototype.scrollIntoView
  let props: LogProps
  let renderResult: RenderResult
  let playSound: jest.Mock
  let pauseSound: jest.Mock

  beforeEach(() => {
    window.HTMLElement.prototype.scrollIntoView = jest.fn()
    playSound = jest.fn()
    pauseSound = jest.fn()
    ;(useSound as jest.Mock).mockReturnValue({
      playSound,
      pauseSound,
    })

    props = {
      deliveredEntries: [],
      onDismiss: jest.fn(),
      showDismiss: false,
      battleStatusStyle: { border: '2px solid #e31e2d' },
      allMessagesDelivered: true,
    }
    renderResult = render(<Log {...props} />)
  })

  afterEach(() => {
    window.HTMLElement.prototype.scrollIntoView = originalScrollIntoView
  })

  const getDeliveredEntries = (logMessages: string[]) =>
    logMessages.map((logMessage) => ({
      content: logMessage,
      round: 1,
      targetId: '',
      delivered: true,
    }))

  it('has content of each delivered entry', () => {
    const logContents = [
      'Enemies approach.',
      'Redwan attacks Skeleton dealing 10 damage.',
    ]
    props.deliveredEntries = getDeliveredEntries(logContents)
    renderResult.rerender(<Log {...props} />)

    expect(screen.getByTestId('battle-log').textContent).toEqual(
      logContents.join('')
    )
  })

  it("has a dismiss button if all messages have been received and the party wasn't destroyed", () => {
    const logContents = [
      'Enemies approach.',
      'Redwan attacks Skeleton dealing 10 damage.',
      'Skeleton is defeated.',
      'The enemies are defeated!',
    ]
    props.deliveredEntries = getDeliveredEntries(logContents)
    props.allMessagesDelivered = true
    props.showDismiss = true
    renderResult.rerender(<Log {...props} />)
    expect(screen.getByTestId('battle-log').textContent).toEqual(
      `${logContents.join('')}OK`
    )
    const dismissButton = screen.getByRole('button')
    expect(dismissButton.textContent).toEqual('OK')
    fireEvent.click(dismissButton)
    expect(props.onDismiss).toHaveBeenCalled()
  })

  it('has a load save button if all messages have been received and the party was destroyed', () => {
    const logContents = [
      'Enemies approach.',
      'Skeleton attacks Redwan dealing 10 damage.',
      'Redwan is dead.',
      'The party was destroyed!',
    ]
    props.deliveredEntries = getDeliveredEntries(logContents)
    props.allMessagesDelivered = true
    props.showDismiss = true
    renderResult.rerender(<Log {...props} />)
    expect(screen.getByTestId('battle-log').textContent).toEqual(
      `${logContents.join('')}Load save`
    )
    const dismissButton = screen.getByRole('button')
    expect(dismissButton.textContent).toEqual('Load save')
    fireEvent.click(dismissButton)
    expect(props.onDismiss).toHaveBeenCalled()
  })

  it('has a scroll to div that gets scrolled into view', () => {
    expect(window.HTMLElement.prototype.scrollIntoView).toHaveBeenCalled()
  })

  describe('sound effects', () => {
    it('plays appropriate sounds through a victorious, level gaining battle', () => {
      const completeBattleLog = [
        {
          round: 0,
          content: 'Enemies approach.',
          targetId: null,
          delivered: true,
        },
        { round: 0, content: 'Enemies approach.', delivered: true },
        {
          round: 1,
          content: 'Andy attacks Knight dealing 15 damage.',
          targetId: '67dbaadd-5326-4dd6-b5d6-d51bea13ed6f',
          delivered: true,
        },
        {
          round: 1,
          content: 'Knight attacks Andy dealing 5 damage.',
          targetId: '1',
          delivered: true,
        },
        {
          round: 1,
          content: 'Rat attacks Andy dealing no damage.',
          targetId: '1',
          delivered: true,
        },
        {
          round: 2,
          content: 'Andy casts Ice on Knight dealing 20 damage.',
          delivered: true,
        },
        {
          round: 2,
          content: 'Knight is defeated.',
          targetId: '67dbaadd-5326-4dd6-b5d6-d51bea13ed6f',
          delivered: true,
        },
        {
          round: 2,
          content: 'Rat attacks Andy dealing no damage.',
          targetId: '1',
          delivered: true,
        },
        {
          round: 3,
          content: 'Andy casts Heal restoring 15 HP.',
          delivered: true,
        },
        {
          round: 3,
          content: 'Rat attacks Andy dealing no damage.',
          targetId: '1',
          delivered: true,
        },
        {
          round: 4,
          content: 'Andy attacks Rat dealing 32 damage.',
          targetId: '82564d64-3c53-43d8-9a99-2355d3081f73',
          delivered: true,
        },
        {
          round: 4,
          content: 'Rat is defeated.',
          targetId: '82564d64-3c53-43d8-9a99-2355d3081f73',
          delivered: true,
        },
        { round: 4, content: 'The enemies are defeated!', delivered: true },
        {
          round: 4,
          content: 'Andy receives 17 experience and 22 gold.',
          targetId: '1',
          delivered: true,
        },
        {
          round: 4,
          content: 'Andy has reached level 10!',
          delivered: true,
        },
      ]
      props.deliveredEntries = completeBattleLog.slice(0, 3)
      renderResult.rerender(<Log {...props} />)

      props.deliveredEntries = completeBattleLog.slice(0, 4)
      renderResult.rerender(<Log {...props} />)

      props.deliveredEntries = completeBattleLog.slice(0, 5)
      renderResult.rerender(<Log {...props} />)

      props.deliveredEntries = completeBattleLog.slice(0, 6)
      renderResult.rerender(<Log {...props} />)

      props.deliveredEntries = completeBattleLog.slice(0, 8)
      renderResult.rerender(<Log {...props} />)

      props.deliveredEntries = completeBattleLog.slice(0, 9)
      renderResult.rerender(<Log {...props} />)

      props.deliveredEntries = completeBattleLog.slice(0, 10)
      renderResult.rerender(<Log {...props} />)

      props.deliveredEntries = completeBattleLog.slice(0, 11)
      renderResult.rerender(<Log {...props} />)

      props.deliveredEntries = completeBattleLog
      renderResult.rerender(<Log {...props} />)

      expect(playSound).toHaveBeenNthCalledWith(1, Sound.PlayerAttack)
      expect(playSound).toHaveBeenNthCalledWith(2, Sound.EnemyAttack)
      expect(playSound).toHaveBeenNthCalledWith(3, Sound.EnemyAttack)
      expect(playSound).toHaveBeenNthCalledWith(4, Sound.Ice)
      expect(playSound).toHaveBeenNthCalledWith(5, Sound.EnemyAttack)
      expect(playSound).toHaveBeenNthCalledWith(6, Sound.Heal)
      expect(playSound).toHaveBeenNthCalledWith(7, Sound.EnemyAttack)
      expect(playSound).toHaveBeenNthCalledWith(8, Sound.PlayerAttack)
      expect(playSound).toHaveBeenNthCalledWith(9, Sound.LevelUp)
      expect(pauseSound).toHaveBeenCalledWith(Sound.BattleMusic)
    })

    it('plays appropriate sounds through a party defeat', () => {
      props.deliveredEntries = [
        {
          content: 'Enemies approach.',
          round: 1,
          targetId: '',
          delivered: true,
        },
        {
          content: 'Skeleton attacks Redwan dealing 10 damage.',
          round: 1,
          targetId: '1',
          delivered: true,
        },
      ]

      renderResult.rerender(<Log {...props} />)
      expect(playSound).toHaveBeenCalledWith(Sound.EnemyAttack)

      props.deliveredEntries = getDeliveredEntries([
        'Enemies approach.',
        'Skeleton attacks Redwan dealing 10 damage.',
        'Redwan is dead.',
        'The party was destroyed!',
      ])
      renderResult.rerender(<Log {...props} />)

      expect(pauseSound).toHaveBeenCalledWith(Sound.BattleMusic)
      expect(playSound).toHaveBeenCalledWith(Sound.PartyDestroyed)
    })
  })
})

import React from 'react'
import OptionPanel, { OptionPanelProps } from './OptionPanel'
import { Command } from './types'
import { fireEvent, render, RenderResult, screen } from '@testing-library/react'

describe('OptionPanel', () => {
  let props: OptionPanelProps
  let renderResult: RenderResult

  beforeEach(() => {
    props = {
      options: [
        { value: Command.Attack, display: 'Attack' },
        { value: Command.Parry, display: 'Parry' },
        { value: 'spell', display: 'Spell' },
        { value: Command.Run, display: 'Run' },
      ],
      onBack: jest.fn(),
      onChange: jest.fn(),
      onNext: jest.fn(),
      isBackEnabled: true,
    }
    renderResult = render(<OptionPanel {...props} />)
  })

  it('has the expected options', () => {
    const list = screen.getByRole('listbox')
    expect(list.children.length).toEqual(props.options.length)
    props.options.forEach((option, index) => {
      expect(list.children[index].textContent).toEqual(option.display)
    })
  })

  it('calls onBack via onKeyDown', () => {
    fireEvent.keyDown(screen.getByRole('listbox'), {
      key: 'Escape',
    })

    expect(props.onBack).toHaveBeenCalled()
  })

  it('updates the selected option via onKeyDown', () => {
    fireEvent.keyDown(screen.getByRole('listbox'), {
      key: 'Enter',
    })
    expect(props.onNext).toHaveBeenNthCalledWith(1, props.options[0].value)

    fireEvent.keyDown(screen.getByRole('listbox'), { key: '4' })

    expect(props.onChange).toHaveBeenCalledWith(Command.Run)
  })

  it('calls onNext with the default option when Enter is pressed', () => {
    fireEvent.keyDown(screen.getByRole('listbox'), {
      key: 'Enter',
    })
    expect(props.onNext).toHaveBeenNthCalledWith(1, props.options[0].value)
  })

  it('calls onNext with the initialValue when present', () => {
    fireEvent.keyDown(screen.getByRole('listbox'), {
      key: 'Enter',
    })
    expect(props.onNext).toHaveBeenNthCalledWith(1, props.options[0].value)

    props.initialValue = Command.Run
    renderResult.rerender(<OptionPanel {...props} />)

    fireEvent.keyDown(screen.getByRole('listbox'), {
      key: 'Enter',
    })
    expect(props.onNext).toHaveBeenNthCalledWith(2, Command.Run)
  })
})

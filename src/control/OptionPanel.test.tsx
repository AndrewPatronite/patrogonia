import React from 'react';
import OptionPanel, { OptionPanelProps } from './OptionPanel';
import { Command } from '../battle/types';
import { fireEvent, screen } from '@testing-library/react';
import { renderChakra } from '../../test/utils';

describe('OptionPanel', () => {
  let props: OptionPanelProps;

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
    };
    renderChakra(<OptionPanel {...props} />);
  });

  it('has the expected options', () => {
    const list = screen.getByRole('listbox');
    expect(list.children.length).toEqual(props.options.length);
    props.options.forEach((option, index) => {
      expect(list.children[index].textContent).toEqual(option.display);
    });
  });

  it('calls onBack via onKeyDown', () => {
    fireEvent.keyDown(screen.getByRole('listbox'), {
      key: 'Escape',
    });

    expect(props.onBack).toHaveBeenCalled();
  });

  it('updates the selected option via onKeyDown', () => {
    fireEvent.keyDown(screen.getByRole('listbox'), {
      key: 'Enter',
    });
    expect(props.onNext).toHaveBeenNthCalledWith(1, props.options[0].value);

    fireEvent.keyDown(screen.getByRole('listbox'), { key: '4' });

    expect(props.onChange).toHaveBeenCalledWith(Command.Run);
  });

  it('calls onNext with the default option when Enter is pressed', () => {
    fireEvent.keyDown(screen.getByRole('listbox'), {
      key: 'Enter',
    });
    expect(props.onNext).toHaveBeenNthCalledWith(1, props.options[0].value);
  });

  it('calls onNext with the chosen option', () => {
    props.options.forEach((option, index) => {
      fireEvent.keyDown(screen.getByRole('listbox'), {
        key: 'Enter',
      });

      expect(props.onNext).toHaveBeenNthCalledWith(index + 1, option.value);
      fireEvent.keyDown(screen.getByTestId(option.value), {
        key: 'ArrowDown',
      });
    });
  });
});

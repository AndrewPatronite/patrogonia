import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import CommandPanel, { CommandPanelProps } from './CommandPanel';
import OptionPanel from './OptionPanel';
import ThemedHeader from '../components/theme/ThemedHeader';
import { Command } from './types';

describe('CommandPanel', () => {
  let props: CommandPanelProps;
  let subject: ShallowWrapper<any>;
  beforeEach(() => {
    props = {
      //@ts-ignore missing Player fields
      currentPlayer: {
        spells: [
          { spellName: 'HEAL', mpCost: 5, battleSpell: true, offensive: false },
          { spellName: 'FIRE', mpCost: 5, battleSpell: true, offensive: true },
          { spellName: 'ICE', mpCost: 5, battleSpell: true, offensive: true },
          {
            spellName: 'RETURN',
            mpCost: 5,
            battleSpell: false,
            offensive: false,
          },
          {
            spellName: 'OUTSIDE',
            mpCost: 5,
            battleSpell: false,
            offensive: false,
          },
        ],
      },
      handleCommand: jest.fn(),
      mp: 10,
    };
    subject = shallow(<CommandPanel {...props} />);
  });

  it('has a command label', () => {
    expect(subject.find(ThemedHeader).prop('children')).toEqual('Command');
  });

  describe('OptionPanel', () => {
    it('has the expected props', () => {
      const optionPanel = subject.find(OptionPanel);
      expect(optionPanel.props()).toEqual({
        options: [
          {
            display: 'Attack',
            value: Command.Attack,
          },
          {
            display: 'Heal',
            value: {
              spellName: 'HEAL',
              mpCost: 5,
              battleSpell: true,
              offensive: false,
            },
          },
          {
            display: 'Fire',
            value: {
              spellName: 'FIRE',
              mpCost: 5,
              battleSpell: true,
              offensive: true,
            },
          },
          {
            display: 'Ice',
            value: {
              spellName: 'ICE',
              mpCost: 5,
              battleSpell: true,
              offensive: true,
            },
          },
          {
            display: 'Parry',
            value: Command.Parry,
          },
          {
            display: 'Run',
            value: Command.Run,
          },
        ],
        onNext: props.handleCommand,
        isBackEnabled: false,
      });
    });

    it('has the expected props for someone without spells', () => {
      props.currentPlayer.spells = [];
      subject = shallow(<CommandPanel {...props} />);
      const optionPanel = subject.find(OptionPanel);
      expect(optionPanel.props()).toEqual({
        options: [
          {
            display: 'Attack',
            value: Command.Attack,
          },
          {
            display: 'Parry',
            value: Command.Parry,
          },
          {
            display: 'Run',
            value: Command.Run,
          },
        ],
        onNext: props.handleCommand,
        isBackEnabled: false,
      });
    });

    it('forwards onNext call to supplied handleCommand', () => {
      const optionPanel = subject.find(OptionPanel);
      optionPanel.simulate('next', 'fire');
      expect(props.handleCommand).toHaveBeenCalledWith('fire');
    });
  });
});

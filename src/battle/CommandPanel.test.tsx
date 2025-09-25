import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import CommandPanel, { CommandPanelProps } from './CommandPanel';
import { OptionPanel } from '../control';
import ThemedHeader from '../components/theme/ThemedHeader';
import { Command } from './types';
import { SpellName } from '../player/types';

describe('CommandPanel', () => {
  let props: CommandPanelProps;
  let subject: ShallowWrapper<any>;
  beforeEach(() => {
    props = {
      //@ts-expect-error missing Player fields
      currentPlayer: {
        spells: [
          {
            spellName: SpellName.Heal,
            mpCost: 5,
            battleSpell: true,
            offensive: false,
          },
          {
            spellName: SpellName.Fire,
            mpCost: 5,
            battleSpell: true,
            offensive: true,
          },
          {
            spellName: SpellName.Ice,
            mpCost: 5,
            battleSpell: true,
            offensive: true,
          },
          {
            spellName: SpellName.Return,
            mpCost: 5,
            battleSpell: false,
            offensive: false,
          },
          {
            spellName: SpellName.Outside,
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
              spellName: SpellName.Heal,
              mpCost: 5,
              battleSpell: true,
              offensive: false,
            },
          },
          {
            display: 'Fire',
            value: {
              spellName: SpellName.Fire,
              mpCost: 5,
              battleSpell: true,
              offensive: true,
            },
          },
          {
            display: 'Ice',
            value: {
              spellName: SpellName.Ice,
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
        width: '8rem',
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
        width: '8rem',
      });
    });

    it('forwards onNext call to supplied handleCommand', () => {
      const optionPanel = subject.find(OptionPanel);
      optionPanel.simulate('next', 'fire');
      expect(props.handleCommand).toHaveBeenCalledWith('fire');
    });
  });
});

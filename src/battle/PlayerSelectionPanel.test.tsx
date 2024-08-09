import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import PlayerSelectionPanel, {
  PlayerSelectionPanelProps,
} from './PlayerSelectionPanel';
import OptionPanel from './OptionPanel';
import ThemedHeader from '../components/theme/ThemedHeader';

describe('PlayerSelectionPanel', () => {
  let props: PlayerSelectionPanelProps;
  let subject: ShallowWrapper<any>;

  beforeEach(() => {
    props = {
      players: [
        //@ts-ignore missing Stats fields
        { playerId: 1, playerName: 'Redwan' },
        //@ts-ignore missing Stats fields
        { playerId: 2, playerName: 'Orfeo' },
      ],
      action: 'Heal',
      handleBack: jest.fn(),
      handleNext: jest.fn(),
      isBackEnabled: true,
    };
    subject = shallow(<PlayerSelectionPanel {...props} />);
  });

  it('has an action ThemedHeader', () => {
    expect(subject.find(ThemedHeader).prop('children')).toEqual('Heal');
  });

  describe('OptionPanel', () => {
    it('has the expected props', () => {
      const optionPanel = subject.find(OptionPanel);
      expect(optionPanel.props()).toEqual({
        options: [
          {
            display: 'Redwan',
            value: 1,
          },
          {
            display: 'Orfeo',
            value: 2,
          },
        ],
        onBack: props.handleBack,
        onNext: props.handleNext,
        isBackEnabled: true,
      });
    });

    it('calls handleBack onBack', () => {
      const optionPanel = subject.find(OptionPanel);
      optionPanel.simulate('back');
      expect(props.handleBack).toHaveBeenCalled();
    });

    it('calls handleNext onNext', () => {
      const optionPanel = subject.find(OptionPanel);
      optionPanel.simulate('next', 1);
      expect(props.handleNext).toHaveBeenCalledWith(1);
    });
  });
});

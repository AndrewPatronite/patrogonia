import React from 'react'
import { shallow } from 'enzyme'
import PlayerSelectionPanel from './PlayerSelectionPanel'
import OptionPanel from './OptionPanel'
import ThemedHeader from '../components/theme/ThemedHeader'

describe('PlayerSelectionPanel', () => {
  let props
  let subject

  beforeEach(() => {
    props = {
      players: [
        { playerId: 1, playerName: 'Redwan' },
        { playerId: 2, playerName: 'Orfeo' },
      ],
      action: 'heal',
      handleBack: jasmine.createSpy('handleBack'),
      handleNext: jasmine.createSpy('handleNext'),
      isBackEnabled: true,
    }
    subject = shallow(<PlayerSelectionPanel {...props} />)
  })

  it('is a div with the expected className', () => {
    expect(subject.type()).toEqual('div')
    expect(subject.prop('className')).toEqual('action-options')
  })

  it('has an action ThemedHeader', () => {
    expect(subject.find(ThemedHeader).text()).toEqual('Heal')
  })

  describe('OptionPanel', () => {
    it('has the expected props', () => {
      const optionPanel = subject.find(OptionPanel)
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
      })
    })

    it('calls handleBack onBack', () => {
      const optionPanel = subject.find(OptionPanel)
      optionPanel.simulate('back')
      expect(props.handleBack).toHaveBeenCalled()
    })

    it('calls handleNext onNext', () => {
      const optionPanel = subject.find(OptionPanel)
      optionPanel.simulate('next', 1)
      expect(props.handleNext).toHaveBeenCalledWith(1)
    })
  })
})

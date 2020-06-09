import React from 'react';
import { shallow } from 'enzyme';
import CommandPanel from './CommandPanel';
import OptionPanel from './OptionPanel';

describe('CommandPanel', () => {
    let props;
    let subject;
    beforeEach(() => {
        props = {
            currentPlayer: {
                spells: [
                    { spellName: 'heal' },
                    { spellName: 'fire' },
                    { spellName: 'ice' },
                ],
            },
            handleCommand: jasmine.createSpy('handleCommand'),
        };
        subject = shallow(<CommandPanel {...props} />);
    });

    it('is a div with the expected className', () => {
        expect(subject.type()).toEqual('div');
        expect(subject.prop('className')).toEqual('action-options');
    });

    it('has a command label', () => {
        expect(subject.find('label').text()).toEqual('Command');
    });

    describe('OptionPanel', () => {
        it('has the expected props', () => {
            const optionPanel = subject.find(OptionPanel);
            expect(optionPanel.props()).toEqual({
                options: [
                    {
                        display: 'Attack',
                        value: 'attack',
                    },
                    {
                        display: 'Heal',
                        value: {
                            spellName: 'heal',
                        },
                    },
                    {
                        display: 'Fire',
                        value: {
                            spellName: 'fire',
                        },
                    },
                    {
                        display: 'Ice',
                        value: {
                            spellName: 'ice',
                        },
                    },
                    {
                        display: 'Parry',
                        value: 'parry',
                    },
                    {
                        display: 'Run',
                        value: 'run',
                    },
                ],
                onNext: props.handleCommand,
                showBackButton: false,
            });
        });

        it('forwards onNext call to supplied handleCommand', () => {
            const optionPanel = subject.find(OptionPanel);
            optionPanel.simulate('next', 'fire')
            expect(props.handleCommand).toHaveBeenCalledWith('fire')
        })
    })
});

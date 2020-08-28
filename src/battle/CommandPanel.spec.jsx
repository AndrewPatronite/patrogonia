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
                    { spellName: 'HEAL', mpCost: 5, battleSpell: true },
                    { spellName: 'FIRE', mpCost: 5, battleSpell: true },
                    { spellName: 'ICE', mpCost: 5, battleSpell: true },
                    { spellName: 'RETURN', mpCost: 5, battleSpell: false },
                    { spellName: 'OUTSIDE', mpCost: 5, battleSpell: false },
                ],
            },
            handleCommand: jasmine.createSpy('handleCommand'),
            mp: 10,
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
                        value: JSON.stringify({
                            spellName: 'HEAL',
                            mpCost: 5,
                            battleSpell: true
                        }),
                    },
                    {
                        display: 'Fire',
                        value: JSON.stringify({
                            spellName: 'FIRE',
                            mpCost: 5,
                            battleSpell: true
                        }),
                    },
                    {
                        display: 'Ice',
                        value: JSON.stringify({
                            spellName: 'ICE',
                            mpCost: 5,
                            battleSpell: true
                        }),
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

        it('has the expected props for someone without spells', () => {
            props.currentPlayer.spells = [];
            subject = shallow(<CommandPanel {...props} />);
            const optionPanel = subject.find(OptionPanel);
            expect(optionPanel.props()).toEqual({
                options: [
                    {
                        display: 'Attack',
                        value: 'attack',
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
            optionPanel.simulate('next', 'fire');
            expect(props.handleCommand).toHaveBeenCalledWith('fire');
        });
    });
});

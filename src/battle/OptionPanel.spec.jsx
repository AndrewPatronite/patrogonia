import React from 'react';
import { shallow } from 'enzyme';
import OptionPanel from './OptionPanel';

describe('OptionPanel', () => {
    let props;
    let subject;

    beforeEach(() => {
        props = {
            options: [
                { value: 'attack', display: 'Attack' },
                { value: 'parry', display: 'Parry' },
                { value: 'spell', display: 'Spell' },
                { value: 'run', display: 'Run' },
            ],
            onBack: jasmine.createSpy('onBack'),
            onChange: jasmine.createSpy('onChange'),
            onNext: jasmine.createSpy('onNext'),
        };
        subject = shallow(<OptionPanel {...props} />);
    });

    it('is a div with the expected class', () => {
        expect(subject.type()).toEqual('div');
        expect(subject.prop('className')).toEqual('option-panel');
    });

    describe('back button', () => {
        it("isn't included by default", () => {
            expect(subject.find('.back-button').exists()).toEqual(false);
        });

        it('is optionally included with the expected props', () => {
            props.showBackButton = true;
            subject = shallow(<OptionPanel {...props} />);
            expect(subject.find('.back-button').props()).toEqual({
                children: '<<',
                className: 'back-button',
                onClick: props.onBack,
                disabled: false
            });
        });

        it('calls the supplied onBack when clicked', () => {
            props.showBackButton = true;
            subject = shallow(<OptionPanel {...props} />);

            subject.find('.back-button').simulate('click');

            expect(props.onBack).toHaveBeenCalled();
        });
    });

    describe('select', () => {
        it('has the expected props', () => {
            const select = subject.find('.option-select');
            expect(select.props()).toEqual({
                className: 'option-select',
                autoFocus: true,
                value: 'attack',
                size: 5,
                onChange: jasmine.any(Function),
                onKeyDown: jasmine.any(Function),
                children: jasmine.any(Array),
                disabled: false
            });
        });

        it('has the expected options', () => {
            const options = subject.find('option');
            expect(options.length).toEqual(4);
            expect(options.at(0).props()).toEqual({
                value: 'attack',
                children: 'Attack',
            });
            expect(options.at(1).props()).toEqual({
                value: 'parry',
                children: 'Parry',
            });
            expect(options.at(2).props()).toEqual({
                value: 'spell',
                children: 'Spell',
            });
            expect(options.at(3).props()).toEqual({
                value: 'run',
                children: 'Run',
            });
        });

        it('sets the selected value and also calls onChange', () => {
            let select = subject.find('.option-select');
            expect(select.prop('value')).toEqual('attack');

            select.simulate('change', { target: { value: 'spell' } });

            expect(props.onChange).toHaveBeenCalledWith('spell');
            select = subject.find('.option-select');
            expect(select.prop('value')).toEqual('spell');
        });

        it('calls onBack via onKeyDown', () => {
            props.showBackButton = true;
            subject = shallow(<OptionPanel {...props} />);
            const select = subject.find('.option-select');

            select.simulate('keyDown', { key: 'Escape' });

            expect(props.onBack).toHaveBeenCalled()
        });

        it('calls onNext via onKeyDown', () => {
            const select = subject.find('.option-select');

            select.simulate('keyDown', { key: 'ArrowRight' });

            expect(props.onNext).toHaveBeenCalledWith('attack')
        });

        it('updates the selected option via onKeyDown', () => {
            let select = subject.find('.option-select');
            expect(select.prop('value')).toEqual('attack');

            select.simulate('keyDown', { key: '4' });

            expect(props.onChange).toHaveBeenCalledWith('run');
            select = subject.find('.option-select');
            expect(select.prop('value')).toEqual('run');
        });
    });

    describe('next button ', () => {
        it('has the expected props', () => {
            expect(subject.find('.next-button').props()).toEqual({
                className: 'next-button',
                children: '>>',
                onClick: jasmine.any(Function),
                disabled: false
            });
        });

        it('calls onNext with the selectedValue when clicked', () => {
            subject.find('.next-button').simulate('click');

            expect(props.onNext).toHaveBeenCalledWith('attack');
        });

        it('calls onNext with the initialValue when present', () => {
            props.initialValue = 'spell'
            subject = shallow(<OptionPanel {...props} />);

            subject.find('.next-button').simulate('click');

            expect(props.onNext).toHaveBeenCalledWith('spell');
        });
    });
});

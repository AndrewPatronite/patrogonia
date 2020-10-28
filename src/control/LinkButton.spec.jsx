import React from 'react';
import { shallow } from 'enzyme';
import LinkButton from './LinkButton';

describe('LinkButton', () => {
    const props = {
        onClick: jasmine.createSpy('onClick'),
        label: 'Whatchamacallit',
    };

    it('is a button with the expected props', () => {
        const subject = shallow(<LinkButton {...props}>Whatchamacallit</LinkButton>);
        expect(subject.type()).toEqual('button');
        expect(subject.props()).toEqual({
            type: 'button',
            className: 'link-button light',
            onClick: props.onClick,
            children: 'Whatchamacallit'
        });
    });

    it('calls onClick passed in via props when clicked', () => {
        const subject = shallow(<LinkButton {...props} />);

        subject.simulate('click');

        expect(props.onClick).toHaveBeenCalled();
    });
});

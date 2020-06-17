import React, * as ReactAlias from 'react';
import { shallow } from 'enzyme';
import Modal from 'react-modal';
import LinkButton from '../control/LinkButton';
import Credits from './Credits';

describe('Credits', () => {
    let subject;

    beforeEach(() => {
        spyOn(Modal, 'setAppElement');
        jest.spyOn(ReactAlias, 'useEffect').mockImplementation((effect) =>
            effect()
        );
        subject = shallow(<Credits />);
    });

    it('is a div with the expected props', () => {
        expect(subject.type()).toEqual('div');
        expect(subject.prop('className')).toEqual('credits');
    });

    it('sets the Modal app element', () => {
        expect(Modal.setAppElement).toHaveBeenCalledWith('body');
    });

    it('has a LinkButton to show the credits modal', () => {
        const linkButton = subject.find(LinkButton);
        expect(linkButton.props()).toEqual({
            onClick: jasmine.any(Function),
            label: 'credits',
        });
    });

    describe('Modal', () => {
        it('has the expected props', () => {
            const modal = subject.find(Modal);
            expect(modal.prop('isOpen')).toEqual(false);
            expect(modal.prop('onRequestClose')).toEqual(jasmine.any(Function));
            expect(modal.prop('style')).toEqual({
                content: {
                    top: '30%',
                    left: '50%',
                    right: 'auto',
                    bottom: 'auto',
                    marginRight: '-50%',
                    transform: 'translate(-50%, -50%)',
                },
            });
        });

        it('has credits for the creator', () => {
            expect(subject.find('.header').at(0).text()).toEqual('Created by');
            expect(subject.find('label').at(0).text()).toEqual('Andrew Patronite')
            const link = subject.find('a').at(0);
            expect(link.prop('href')).toEqual('mailto:patronite@gmail.com')
            expect(link.text()).toEqual('patronite@gmail.com')
        })

        it('has credits for the Music', () => {
            expect(subject.find('.header').at(1).text()).toEqual('Music');
            expect(subject.find('label').at(1).text()).toEqual('Crusaderp')
            const link = subject.find('a').at(1);
            expect(link.prop('href')).toEqual('https://soundcloud.com/crusaderp/sets/the-frontier')
            expect(link.prop('target')).toEqual('_blank')
            expect(link.prop('rel')).toEqual('noopener noreferrer')
            expect(link.text()).toEqual('https://soundcloud.com/crusaderp/sets/the-frontier')
        })

        it('has credits for the Battle sound effects', () => {
            expect(subject.find('.header').at(2).text()).toEqual('Battle sound effects');
            expect(subject.find('label').at(2).text()).toEqual('James Tubbritt (Sharp)')
            const link = subject.find('a').at(2);
            expect(link.prop('href')).toEqual('http://www.irishacts.com')
            expect(link.prop('target')).toEqual('_blank')
            expect(link.prop('rel')).toEqual('noopener noreferrer')
            expect(link.text()).toEqual('http://www.irishacts.com')
        })

        it('has credits for the Trumpet sound effects', () => {
            expect(subject.find('.header').at(3).text()).toEqual('Trumpet and spell sound effects');
            const link = subject.find('a').at(3);
            expect(link.prop('href')).toEqual('https://www.zapsplat.com')
            expect(link.prop('target')).toEqual('_blank')
            expect(link.prop('rel')).toEqual('noopener noreferrer')
            expect(link.text()).toEqual('https://www.zapsplat.com')
        })

        it('is open to show credits when the LinkButton is clicked', () => {
            let modal = subject.find(Modal);
            expect(modal.prop('isOpen')).toEqual(false);
            let linkButton = subject.find(LinkButton);
            expect(linkButton.prop('className')).not.toBeDefined()

            linkButton.simulate('click')

            modal = subject.find(Modal);
            expect(modal.prop('isOpen')).toEqual(true);
            linkButton = subject.find(LinkButton);
            expect(linkButton.prop('className')).toEqual('hidden')
        })

        it('shows the credits link button when the modal is closed', () => {
            let linkButton = subject.find(LinkButton);
            linkButton.simulate('click')
            let modal = subject.find(Modal);
            expect(modal.prop('isOpen')).toEqual(true);
            linkButton = subject.find(LinkButton);
            expect(linkButton.prop('className')).toEqual('hidden')

            modal.prop('onRequestClose')()

            modal = subject.find(Modal);
            expect(modal.prop('isOpen')).toEqual(false);
            linkButton = subject.find(LinkButton);
            expect(linkButton.prop('className')).not.toBeDefined()
        })
    })
});

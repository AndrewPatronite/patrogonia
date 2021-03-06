import React, * as ReactAlias from 'react';
import { shallow } from 'enzyme';
import EnemySelectionPanel from './EnemySelectionPanel';
import OptionPanel from './OptionPanel';
import ThemedHeader from "../components/theme/ThemedHeader";

describe('EnemySelectionPanel', () => {
    let props;
    let subject;

    beforeEach(() => {
        jest.spyOn(ReactAlias, 'useEffect').mockImplementation((effect) =>
            effect()
        );
        props = {
            enemies: [
                { id: 'ffff12345', name: 'Skeleton', stats: { hp: 20 } },
                { id: 'aaaa12345', name: 'Knight', stats: { hp: 20 } },
            ],
            action: 'attack',
            handleBack: jasmine.createSpy('handleBack'),
            handleNext: jasmine.createSpy('handleNext'),
            selectEnemy: jasmine.createSpy('selectEnemy'),
            selectedEnemyId: undefined,
            playerTurnEnabled: true,
        };
        subject = shallow(<EnemySelectionPanel {...props} />);
    });

    it('is a div with the expected className', () => {
        expect(subject.type()).toEqual('div');
        expect(subject.prop('className')).toEqual('action-options');
    });

    it('has an action ThemedHeader', () => {
        expect(subject.find(ThemedHeader).text()).toEqual('Attack');
    });

    describe('OptionPanel', () => {
        it('has the expected props', () => {
            const optionPanel = subject.find(OptionPanel);
            expect(optionPanel.props()).toEqual({
                options: [
                    {
                        display: 'Skeleton',
                        value: 'ffff12345',
                    },
                    {
                        display: 'Knight',
                        value: 'aaaa12345',
                    },
                ],
                onBack: props.handleBack,
                onChange: props.selectEnemy,
                onNext: props.handleNext,
                showBackButton: true,
            });
        });

        it('calls selectEnemy with the first living enemy', () => {
            expect(props.selectEnemy).toHaveBeenCalledWith('ffff12345');
        });

        it('forwards onBack call to the supplied handleBack', () => {
            const optionPanel = subject.find(OptionPanel);
            optionPanel.simulate('back');
            expect(props.handleBack).toHaveBeenCalled();
        });

        it('forwards onNext call to the supplied handleNext', () => {
            const optionPanel = subject.find(OptionPanel);
            optionPanel.simulate('next', 'ffff12345');
            expect(props.handleNext).toHaveBeenCalledWith('ffff12345');
        });
    });
});

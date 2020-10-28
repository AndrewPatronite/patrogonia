import React, * as ReactAlias from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import PlayerSpells from './PlayerSpells';
import Spell from './Spell';
import OptionPanel from '../battle/OptionPanel';
import ThemedPanel from '../components/theme/ThemedPanel';

describe('PlayerSpells', () => {
    let onBack: jasmine.Spy;
    let castSpell: jasmine.Spy;
    let setSpellCast: jasmine.Spy;
    const availableSpells: Spell[] = [
        { spellName: 'HEAL', mpCost: 5, offensive: false, battleSpell: true },
        {
            spellName: 'RETURN',
            mpCost: 7,
            offensive: false,
            battleSpell: false,
        },
        {
            spellName: 'OUTSIDE',
            mpCost: 7,
            offensive: false,
            battleSpell: false,
        },
    ];
    let props: any;
    let subject: ShallowWrapper;

    beforeEach(() => {
        onBack = jasmine.createSpy('onBack');
        castSpell = jasmine.createSpy('castSpell');
        setSpellCast = jasmine.createSpy('setSpellCast');
        jest.spyOn(ReactAlias, 'useEffect').mockImplementation((effect) =>
            effect()
        );
        jest.spyOn(ReactAlias, 'useCallback').mockImplementation(
            (effect) => onBack
        );
        jest.spyOn(ReactAlias, 'useState').mockImplementation(() => [
            {},
            setSpellCast,
        ]);
        props = {
            currentPlayer: {
                id: 1,
                name: 'Redwan',
                loggedIn: true,
                skipInstructions: true,
                battleId: undefined,
                spells: availableSpells,
                stats: {
                    playerName: 'Redwan',
                    level: 5,
                    hp: 40,
                    hpTotal: 54,
                    mp: 20,
                    mpTotal: 27,
                    gold: 10000,
                    xp: 160,
                    xpTillNextLevel: 80,
                    attack: 20,
                    defense: 10,
                    agility: 12,
                },
                location: {
                    mapName: 'Atoris',
                    rowIndex: 5,
                    columnIndex: 7,
                    facing: 'down',
                    entranceName: 'Lava Grotto',
                },
                lastUpdate: '',
                showFieldMenu: true,
                visited: ['Dewhurst'],
            },
            availableSpells,
            onBack,
            castSpell,
        };
        subject = shallow(<PlayerSpells {...props} />);
    });

    it('is a ThemedPanel with the expected class name', () => {
        expect(subject.type()).toEqual(ThemedPanel);
        expect(subject.prop('className')).toEqual('player-spells');
        expect(subject.prop('heading')).toEqual('Spells');
        expect(subject.prop('flexDirection')).toEqual('column');
    });

    it('has an OptionPanel for spells', () => {
        const optionPanel = subject.find(OptionPanel);
        expect(optionPanel.props()).toEqual({
            options: [
                {
                    value: 'HEAL',
                    display: 'Heal',
                },
                {
                    value: 'RETURN',
                    display: 'Return',
                },
                {
                    value: 'OUTSIDE',
                    display: 'Outside',
                },
            ],
            showBackButton: true,
            onBack: jasmine.any(Function),
            onNext: jasmine.any(Function),
            disabled: false,
            onChange: jasmine.any(Function),
        });
    });

    it('selects Heal and shows its cost', () => {
        const optionPanel = subject.find(OptionPanel);
        // @ts-ignore
        optionPanel.prop('onChange')('HEAL');
        expect(setSpellCast).toHaveBeenCalledWith({
            name: 'HEAL',
            targetId: undefined,
            confirmed: undefined,
        });
        setSpellCast.calls.reset();
        const spellCost = subject.find('.spell-cost');
        expect(spellCost.text()).toEqual('Cost 5/20');
        // @ts-ignore
        optionPanel.prop('onNext')('HEAL');
        expect(setSpellCast).toHaveBeenCalledWith({
            name: 'HEAL',
            targetId: props.currentPlayer.id.toString(),
            confirmed: true,
        });
    });

    it('selects Outside', () => {
        const optionPanel = subject.find(OptionPanel);
        // @ts-ignore
        optionPanel.prop('onChange')('OUTSIDE');
        expect(setSpellCast).toHaveBeenCalledWith({
            name: 'OUTSIDE',
            targetId: undefined,
            confirmed: undefined,
        });
        setSpellCast.calls.reset();
        // @ts-ignore
        optionPanel.prop('onNext')('OUTSIDE');
        expect(setSpellCast).toHaveBeenCalledWith({
            name: 'OUTSIDE',
            targetId: props.currentPlayer.location.entranceName,
            confirmed: true,
        });
    });

    it('selects Return', () => {
        const optionPanel = subject.find(OptionPanel);
        // @ts-ignore
        optionPanel.prop('onChange')('RETURN');
        expect(setSpellCast).toHaveBeenCalledWith({
            name: 'RETURN',
            targetId: undefined,
            confirmed: undefined,
        });
        setSpellCast.calls.reset();
        // @ts-ignore
        optionPanel.prop('onNext')('RETURN');
        expect(setSpellCast).toHaveBeenCalledWith({
            name: 'RETURN',
            targetId: undefined,
            confirmed: true,
        });
    });

    it("selects no spell if it doesn't find a matching field spell", () => {
        const optionPanel = subject.find(OptionPanel);
        // @ts-ignore
        optionPanel.prop('onNext')('ICE');
        expect(setSpellCast).not.toHaveBeenCalled();
    });

    it('has an OptionPanel for a return destination and shows its cost', () => {
        jest.spyOn(ReactAlias, 'useState').mockImplementation(() => [
            { name: 'RETURN', targetId: undefined, confirmed: true },
            setSpellCast,
        ]);
        subject = shallow(<PlayerSpells {...props} />);
        const optionPanel = subject.find(OptionPanel);
        expect(optionPanel.props()).toEqual({
            options: [
                {
                    value: 'Dewhurst',
                    display: 'Dewhurst',
                },
            ],
            showBackButton: true,
            onBack: jasmine.any(Function),
            onNext: jasmine.any(Function),
            disabled: false,
        });
        const spellCost = subject.find('.spell-cost');
        expect(spellCost.text()).toEqual('Cost 7/20');
        // @ts-ignore
        optionPanel.prop('onBack')();
        expect(setSpellCast).toHaveBeenCalledWith({});
        setSpellCast.calls.reset();
    });

    it('casts the chosen spell via useEffect', () => {
        jest.spyOn(ReactAlias, 'useState').mockImplementation(() => [
            { name: 'RETURN', targetId: undefined, confirmed: true },
            setSpellCast,
        ]);
        subject = shallow(<PlayerSpells {...props} />);
        let optionPanel = subject.find(OptionPanel);
        // @ts-ignore
        optionPanel.prop('onNext')('Dewhurst');
        expect(setSpellCast).toHaveBeenCalledWith({
            name: 'RETURN',
            targetId: 'Dewhurst',
            confirmed: true,
        });

        jest.useFakeTimers();
        jest.spyOn(ReactAlias, 'useState').mockImplementation(() => [
            { name: 'RETURN', targetId: 'Dewhurst', confirmed: true },
            setSpellCast,
        ]);
        subject = shallow(<PlayerSpells {...props} />);
        optionPanel = subject.find(OptionPanel);
        expect(optionPanel.prop('disabled')).toEqual(true);
        const spellStatus = subject.find('.spell-status');
        expect(spellStatus.text()).toEqual('Redwan cast Return');
        jest.runAllTimers();
        expect(setTimeout).toHaveBeenCalledWith(jasmine.any(Function), 4000);
        expect(castSpell).toHaveBeenCalledWith('RETURN', 'Dewhurst');
        expect(setSpellCast).toHaveBeenCalledWith({});
        expect(onBack).toHaveBeenCalled();
        // @ts-ignore
        ReactAlias.useEffect.mock.calls[0][0]()();
        expect(clearTimeout).toHaveBeenCalled();
    });

    it('has audio for Heal', () => {
        const healAudio = subject.find('.heal');
        expect(healAudio.type()).toEqual('audio');
        expect(healAudio.find('source').prop('src')).toEqual(
            'zapsplat_fantasy_magic_mystery_glissando_bell_43990.mp3'
        );
    });

    it('has audio for Return and Outside', () => {
        const warpAudio = subject.find('.warp');
        expect(warpAudio.type()).toEqual('audio');
        expect(warpAudio.find('source').prop('src')).toEqual(
            'magic_spell_ascending_metallic_pad.mp3'
        );
    });
});

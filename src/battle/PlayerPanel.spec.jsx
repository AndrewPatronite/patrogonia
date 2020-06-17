import React from 'react';
import { shallow } from 'enzyme';
import PlayerPanel from './PlayerPanel';
import PlayerTurnWizard from './PlayerTurnWizard';

describe('PlayerPanel', () => {
    let props;
    let subject;
    const currentPlayerId = 1;

    beforeEach(() => {
        props = {
            currentPlayer: { id: currentPlayerId },
            playerStats: {
                playerId: currentPlayerId,
                playerName: 'Redwan',
                level: 5,
                hp: 50,
                hpTotal: 54,
                mp: 5,
                mpTotal: 10,
            },
            players: [{ id: currentPlayerId }],
            battleStatusClass: 'dire',
            enemies: [{ id: 'ccc123eee', name: 'Knight' }],
            selectEnemy: jasmine.createSpy('selectEnemy'),
            takeTurn: jasmine.createSpy('takeTurn'),
            roundPlayerActions: {},
            selectedEnemyId: 'ccc123eee',
            playerTurnEnabled: true,
            loadSave: jasmine.createSpy('loadSave'),
        };
        subject = shallow(<PlayerPanel {...props} />);
    });

    it('is a div with the expected classNames', () => {
        expect(subject.type()).toEqual('div');
        expect(subject.prop('className')).toEqual('player-panel dire');
    });

    it('has a div containing player stats', () => {
        const playerStats = subject.find('.player-stats');
        expect(playerStats.type()).toEqual('div');
        const statsLabels = playerStats.find('label');
        expect(statsLabels.length).toEqual(4);
        expect(statsLabels.at(0).text()).toEqual('Redwan');
        expect(statsLabels.at(1).text()).toEqual('Level: 5');
        expect(statsLabels.at(2).text()).toEqual('HP: 50/54');
        expect(statsLabels.at(3).text()).toEqual('MP: 5/10');
    });

    it("has no controls when it's not the current player's turn", () => {
        props.roundPlayerActions[currentPlayerId] = 'attack';
        subject = shallow(<PlayerPanel {...props} />);
        expect(subject.find(PlayerTurnWizard).exists()).toEqual(false);
        expect(subject.find('.load-save').exists()).toEqual(false);
    });

    it("has a PlayerTurnWizard when it's the current player's turn", () => {
        expect(subject.find(PlayerTurnWizard).exists()).toEqual(true);
        expect(subject.find('.load-save').exists()).toEqual(false);
    });

    it("has a load save button when it's the current player's turn but player is dead", () => {
        props.playerStats.hp = 0;
        subject = shallow(<PlayerPanel {...props} />);
        expect(subject.find(PlayerTurnWizard).exists()).toEqual(false);
        expect(subject.find('.load-save').exists()).toEqual(true);
    });

    describe('PlayerTurnWizard', () => {
        let playerTurnWizard;

        beforeEach(() => {
            playerTurnWizard = subject.find(PlayerTurnWizard);
        });

        it('has the expected props', () => {
            expect(playerTurnWizard.props()).toEqual({
                currentPlayer: props.currentPlayer,
                players: [{ id: currentPlayerId }],
                enemies: [{ id: 'ccc123eee', name: 'Knight' }],
                selectEnemy: props.selectEnemy,
                takeTurn: props.takeTurn,
                selectedEnemyId: 'ccc123eee',
                playerTurnEnabled: true,
                mp: 5,
            });
        });

        it('calls selectEnemy supplied via props', () => {
            playerTurnWizard.prop('selectEnemy')('ccc123eee');
            expect(props.selectEnemy).toHaveBeenCalledWith('ccc123eee');
        });

        it('calls takeTurn supplied via props', () => {
            playerTurnWizard.prop('takeTurn')();
            expect(props.takeTurn).toHaveBeenCalled();
        });
    });

    describe('Load save button', () => {
        let loadSaveButton;

        beforeEach(() => {
            props.playerStats.hp = 0;
            subject = shallow(<PlayerPanel {...props} />);
            loadSaveButton = subject.find('.load-save');
        });

        it('has the expected props', () => {
            expect(loadSaveButton.props()).toEqual({
                className: 'load-save',
                autoFocus: true,
                onClick: jasmine.any(Function),
                children: 'Load save'
            });
        });

        it('calls loadSave supplied via props onClick', () => {
            loadSaveButton.simulate('click');
            expect(props.loadSave).toHaveBeenCalledWith(currentPlayerId);
        });
    });
});

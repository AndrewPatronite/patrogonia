import React from 'react';
import { shallow } from 'enzyme';
import PlayerTurnWizard from './PlayerTurnWizard';
import CommandPanel from './CommandPanel';
import EnemySelectionPanel from './EnemySelectionPanel';
import PlayerSelectionPanel from './PlayerSelectionPanel';

describe('PlayerTurnWizard', () => {
    const currentPlayer = {
        id: 1,
        name: 'Redwan',
    };
    const anotherEnemyId = 'cccc123';
    let props;
    let subject;

    beforeEach(() => {
        props = {
            currentPlayer,
            players: [currentPlayer],
            enemies: [
                { id: 'abcdef123123', name: 'Skeleton' },
                { id: anotherEnemyId, name: 'Knight' },
            ],
            selectEnemy: jasmine.createSpy('selectEnemy'),
            takeTurn: jasmine.createSpy('takeTurn'),
            selectedEnemyId: 'abcdef123123',
            playerTurnEnabled: true,
        };
        subject = shallow(<PlayerTurnWizard {...props} />);
    });

    describe('command', () => {
        it('is a CommandPanel with the expected props', () => {
            const commandPanel = subject.find(CommandPanel);
            expect(commandPanel.props()).toEqual({
                currentPlayer,
                handleCommand: jasmine.any(Function),
            });
        });

        it('submits turn if command is "parry"', () => {
            const commandPanel = subject.find(CommandPanel);
            commandPanel.prop('handleCommand')('parry');
            expect(props.takeTurn).toHaveBeenCalledWith('parry');
        });

        it('submits turn if command is "run"', () => {
            const commandPanel = subject.find(CommandPanel);
            commandPanel.prop('handleCommand')('run');
            expect(props.takeTurn).toHaveBeenCalledWith('run');
        });

        it('advances to EnemySelectionPanel if command is "attack"', () => {
            const commandPanel = subject.find(CommandPanel);
            commandPanel.prop('handleCommand')('attack');
            expect(props.takeTurn).not.toHaveBeenCalled();
            expect(subject.find(EnemySelectionPanel).exists()).toEqual(true);
        });

        it('advances to EnemySelectionPanel if command is an offensive spell', () => {
            const commandPanel = subject.find(CommandPanel);
            const iceSpell = { offensive: true };
            commandPanel.prop('handleCommand')(iceSpell);
            expect(props.takeTurn).not.toHaveBeenCalled();
            expect(subject.find(EnemySelectionPanel).exists()).toEqual(true);
        });

        it('advances to PlayerSelectionPanel if command is a defensive spell', () => {
            const commandPanel = subject.find(CommandPanel);
            const healSpell = { spellName: 'Heal' };
            commandPanel.prop('handleCommand')(healSpell);
            expect(props.takeTurn).not.toHaveBeenCalled();
            expect(subject.find(PlayerSelectionPanel).exists()).toEqual(true);
        });
    });

    describe('attack - EnemySelectionPanel', () => {
        let enemySelectionPanel;

        beforeEach(() => {
            const commandPanel = subject.find(CommandPanel);
            commandPanel.prop('handleCommand')('attack');
            enemySelectionPanel = subject.find(EnemySelectionPanel);
        });

        it('is a EnemySelectionPanel with the expected props', () => {
            expect(enemySelectionPanel.props()).toEqual({
                enemies: props.enemies,
                action: 'attack',
                handleBack: jasmine.any(Function),
                handleNext: jasmine.any(Function),
                selectEnemy: props.selectEnemy,
                selectedEnemyId: props.selectedEnemyId,
                playerTurnEnabled: props.playerTurnEnabled,
            });
        });

        it('returns to the CommandPanel onBack', () => {
            expect(subject.find(CommandPanel).exists()).toEqual(false);

            enemySelectionPanel.prop('handleBack')();

            expect(subject.find(CommandPanel).exists()).toEqual(true);
        });

        it('submits the turn onNext', () => {
            enemySelectionPanel.prop('handleNext')(props.selectedEnemyId);

            expect(props.takeTurn).toHaveBeenCalledWith(
                'attack',
                props.selectedEnemyId
            );
        });

        it('calls selectEnemy provided via props', () => {
            enemySelectionPanel.prop('selectEnemy')(anotherEnemyId);

            expect(props.selectEnemy).toHaveBeenCalledWith(anotherEnemyId);
        });
    });

    describe('offensive spell - EnemySelectionPanel', () => {
        const iceSpell = { spellName: 'Ice', offensive: true };
        let enemySelectionPanel;

        beforeEach(() => {
            const commandPanel = subject.find(CommandPanel);
            commandPanel.prop('handleCommand')(iceSpell);
            enemySelectionPanel = subject.find(EnemySelectionPanel);
        });

        it('is a EnemySelectionPanel with the expected props', () => {
            expect(enemySelectionPanel.props()).toEqual({
                enemies: props.enemies,
                action: 'Ice',
                handleBack: jasmine.any(Function),
                handleNext: jasmine.any(Function),
                selectEnemy: props.selectEnemy,
                selectedEnemyId: props.selectedEnemyId,
                playerTurnEnabled: props.playerTurnEnabled,
            });
        });

        it('returns to the CommandPanel onBack', () => {
            expect(subject.find(CommandPanel).exists()).toEqual(false);

            enemySelectionPanel.prop('handleBack')();

            expect(subject.find(CommandPanel).exists()).toEqual(true);
        });

        it('submits the turn onNext', () => {
            enemySelectionPanel.prop('handleNext')(props.selectedEnemyId);

            expect(props.takeTurn).toHaveBeenCalledWith(
                iceSpell,
                props.selectedEnemyId
            );
        });

        it('calls selectEnemy provided via props', () => {
            enemySelectionPanel.prop('selectEnemy')(anotherEnemyId);

            expect(props.selectEnemy).toHaveBeenCalledWith(anotherEnemyId);
        });
    });

    describe('defensive spell - PlayerSelectionPanel', () => {
        const healSpell = { spellName: 'Heal' };
        let playerSelectionPanel

        beforeEach(() => {
            const commandPanel = subject.find(CommandPanel);
            commandPanel.prop('handleCommand')(healSpell);
            playerSelectionPanel = subject.find(PlayerSelectionPanel)
        })

        it('is a PlayerSelectionPanel with the expected props', () => {
            expect(playerSelectionPanel.props()).toEqual({
                players: props.players,
                action: 'Heal',
                handleBack: jasmine.any(Function),
                handleNext: jasmine.any(Function),
                showBackButton: true
            })
        });

        it('returns to the CommandPanel onBack', () => {
            expect(subject.find(CommandPanel).exists()).toEqual(false);

            playerSelectionPanel.prop('handleBack')();

            expect(subject.find(CommandPanel).exists()).toEqual(true);
        });

        it('submits the turn onNext', () => {
            const anotherPlayerId = 2
            playerSelectionPanel.prop('handleNext')(anotherPlayerId);

            expect(props.takeTurn).toHaveBeenCalledWith(
                healSpell,
                anotherPlayerId
            );
        });
    });
});

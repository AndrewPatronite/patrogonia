import React, * as ReactAlias from 'react';
import { shallow } from 'enzyme';
import Battle from './Battle';
import * as BattleClassHelper from './helper/getBattleStatusClass';
import * as BattleStateAlias from '../state/BattleState';
import EnemyDisplay from './EnemyDisplay';
import Log from './Log';
import PlayerPanel from './PlayerPanel';
import * as Subscriptions from '../subscription/subscribe';
import * as Player from '../environment/sound/sound';

describe('Battle', () => {
    const currentPlayerId = 1;
    const anotherPlayerId = 2;
    let props;
    let subject;
    let battle;
    let takeTurn;
    let dismissBattle;
    let battleSubscription;

    beforeEach(() => {
        battleSubscription = {
            close: jasmine.createSpy('close'),
        };
        spyOn(Subscriptions, 'subscribe').and.returnValue(battleSubscription);
        spyOn(Player, 'pauseSound');
        spyOn(Player, 'playSound');
        jest.spyOn(ReactAlias, 'useEffect').mockImplementation((effect) =>
            effect()
        );

        battle = {
            enemies: [
                {
                    id: '677d615c-32fe-4e8d-9992-3e110f26a185',
                    name: 'Skeleton',
                },
            ],
            log: [
                { content: 'Enemies approach.', delivered: true },
                {
                    content: 'Redwan attacks Skeleton dealing 10 damage.',
                    targetId: '677d615c-32fe-4e8d-9992-3e110f26a185',
                },
            ],
            playerStats: {
                currentPlayerId: { playerId: currentPlayerId },
                anotherPlayerId: { playerId: anotherPlayerId },
            },
            roundPlayerActions: {
                currentPlayerId: 'attack',
                anotherPlayerId: 'parry',
            },
            status: '',
        };
        takeTurn = jasmine.createSpy('takeTurn');
        dismissBattle = jasmine.createSpy('dismissBattle');
        spyOn(BattleClassHelper, 'getBattleStatusClass').and.returnValue(
            'dire'
        );
        spyOn(BattleStateAlias, 'BattleState').and.returnValue([
            battle,
            takeTurn,
            dismissBattle,
        ]);

        props = {
            currentPlayer: {
                location: {
                    mapName: 'cave1',
                },
            },
            loadPlayer: jasmine.createSpy('loadPlayer'),
            updatePlayer: jasmine.createSpy('updatePlayer'),
            battleUrl: 'wss://localhost:8443/battles',
            loadSave: jasmine.createSpy('loadSave'),
        };
        subject = shallow(<Battle {...props} />);
    });

    it('is a div with className supplied by getBattleStatusClass', () => {
        expect(subject.type()).toEqual('div');
        expect(subject.prop('className')).toEqual('battle dire');
    });

    it('has battle music', () => {
        const audio = subject.find('.battle-music');
        expect(audio.type()).toEqual('audio');
        expect(audio.props()).toEqual({
            className: 'battle-music',
            autoPlay: true,
            loop: true,
            children: jasmine.anything(),
        });
        expect(audio.find('source').prop('src')).toEqual('BattleNO3.mp3');
    });

    it('has an EnemyDisplay with the expected props', () => {
        const enemyDisplay = subject.find(EnemyDisplay);
        expect(enemyDisplay.props()).toEqual({
            mapName: 'cave1',
            enemies: battle.enemies,
            selectedEnemyId: undefined,
            deliveredLogEntries: [
                { content: 'Enemies approach.', delivered: true },
            ],
        });
    });

    describe('Log', () => {
        it('has the expected props', () => {
            const log = subject.find(Log);
            expect(log.props()).toEqual({
                deliveredEntries: [
                    { content: 'Enemies approach.', delivered: true },
                ],
                onDismiss: jasmine.any(Function),
                showDismiss: false,
                statusClass: 'dire',
                allMessagesDelivered: false,
            });
        });

        it('calls dismissBattle supplied by BattleState', () => {
            const log = subject.find(Log);
            log.simulate('dismiss', battle);
            expect(dismissBattle).toHaveBeenCalledWith(battle);
        });
    });

    describe('PlayerPanel', () => {
        let playerPanel;

        beforeEach(() => {
            playerPanel = subject.find(PlayerPanel).at(0);
        });

        it('has a players div with a PlayerPanel with the expected props for each player', () => {
            const playerPanels = subject.find('.players').find(PlayerPanel);
            expect(playerPanels.length).toEqual(2);
            expect(playerPanels.at(0).props()).toEqual({
                currentPlayer: props.currentPlayer,
                playerStats: { playerId: currentPlayerId },
                players: [
                    { playerId: currentPlayerId },
                    { playerId: anotherPlayerId },
                ],
                battleStatusClass: 'dire',
                enemies: battle.enemies,
                selectEnemy: jasmine.any(Function),
                takeTurn: jasmine.any(Function),
                roundPlayerActions: battle.roundPlayerActions,
                selectedEnemyId: undefined,
                playerTurnEnabled: true,
                loadSave: props.loadSave,
            });
            expect(playerPanels.at(1).props()).toEqual({
                currentPlayer: props.currentPlayer,
                playerStats: { playerId: anotherPlayerId },
                players: [
                    { playerId: currentPlayerId },
                    { playerId: anotherPlayerId },
                ],
                battleStatusClass: 'dire',
                enemies: battle.enemies,
                selectEnemy: jasmine.any(Function),
                takeTurn: jasmine.any(Function),
                roundPlayerActions: battle.roundPlayerActions,
                selectedEnemyId: undefined,
                playerTurnEnabled: true,
                loadSave: props.loadSave,
            });
        });

        it('updates the selected enemy', () => {
            expect(
                subject.find(EnemyDisplay).prop('selectedEnemyId')
            ).not.toBeDefined();
            expect(playerPanel.prop('selectedEnemyId')).not.toBeDefined();

            playerPanel.prop('selectEnemy')(
                '677d615c-32fe-4e8d-9992-3e110f26a185'
            );

            expect(subject.find(EnemyDisplay).prop('selectedEnemyId')).toEqual(
                '677d615c-32fe-4e8d-9992-3e110f26a185'
            );
            expect(
                subject.find(PlayerPanel).at(0).prop('selectedEnemyId')
            ).toEqual('677d615c-32fe-4e8d-9992-3e110f26a185');
        });

        it('via takeTurn, it submits turn, hides the players panels until the next turn, and clears selected enemy', () => {
            expect(subject.find('.players').exists()).toEqual(true);
            playerPanel.prop('selectEnemy')(
                '677d615c-32fe-4e8d-9992-3e110f26a185'
            );
            expect(subject.find(EnemyDisplay).prop('selectedEnemyId')).toEqual(
                '677d615c-32fe-4e8d-9992-3e110f26a185'
            );
            const selectedEnemyId = '677d615c-32fe-4e8d-9992-3e110f26a185';

            playerPanel.prop('takeTurn')('attack', selectedEnemyId);

            expect(takeTurn).toHaveBeenCalledWith('attack', selectedEnemyId);
            expect(subject.find('.players').exists()).toEqual(false);
            expect(
                subject.find(EnemyDisplay).prop('selectedEnemyId')
            ).not.toBeDefined();
        });

        it('calls the loadSave provided by props', () => {
            playerPanel.prop('loadSave')();

            expect(props.loadSave).toHaveBeenCalled();
        });
    });

    it('subscribes to battle notifications via useEffect and closes the subscription on unmounting', () => {
        expect(Subscriptions.subscribe).toHaveBeenCalledWith(
            props.battleUrl,
            jasmine.any(Function)
        );

        const subscriptionEffect = ReactAlias.useEffect.mock.calls[0][0];
        subscriptionEffect()();
        expect(battleSubscription.close).toHaveBeenCalled();
    });

    it('plays battle music via useEffect', () => {
        expect(Player.playSound).toHaveBeenCalledWith('battle-music');
    });

    it('enables next player turn after all log messages have been delivered, via useEffect', () => {
        const setPlayerTurnEnabled = jasmine.createSpy('setPlayerTurnEnabled');

        jest.spyOn(ReactAlias, 'useState').mockImplementation(() => [
            false,
            setPlayerTurnEnabled,
        ]);

        battle.log[1].delivered = true;
        subject = shallow(<Battle {...props} />);

        expect(setPlayerTurnEnabled).toHaveBeenCalledWith(true);
    });

    it('pauses battle music and hides the players panel when the battle is over and all log messages have been delivered, via useEffect', () => {
        const setPlayerTurnEnabled = jasmine.createSpy('setPlayerTurnEnabled');

        jest.spyOn(ReactAlias, 'useState').mockImplementation(() => [
            false,
            setPlayerTurnEnabled,
        ]);

        battle.status = 'VICTORY';
        battle.log[1].delivered = true;
        subject = shallow(<Battle {...props} />);
        expect(Player.pauseSound).toHaveBeenCalledWith('battle-music');
    });
});

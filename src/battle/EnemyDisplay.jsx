import React from 'react';
import { filter, find, isEqual } from 'lodash';
import './EnemyDisplay.css';

const EnemyDisplay = ({
    mapName,
    enemies,
    selectedEnemyId,
    deliveredLogEntries,
}) => {
    const enemiesClassName = `enemies ${mapName.substring(0, 4)}`;
    const getEnemyClassName = (enemy) =>
        `enemy ${enemy.name.toLowerCase()}${
            enemy.id === selectedEnemyId ? ' selected' : ''
        }`;
    const enemyDefeatNotYetReported = (enemyId) =>
        !find(
            deliveredLogEntries,
            ({ content, targetId }) =>
                content.includes('defeated') && isEqual(enemyId, targetId)
        );
    const displayedEnemies = filter(
        enemies,
        ({ id: enemyId, stats: enemyStats }) => {
            return enemyStats.hp > 0 || enemyDefeatNotYetReported(enemyId);
        }
    );

    return (
        <div className={enemiesClassName}>
            {displayedEnemies.map((enemy) => (
                <div key={enemy.id} className={getEnemyClassName(enemy)} />
            ))}
        </div>
    );
};

export default EnemyDisplay;

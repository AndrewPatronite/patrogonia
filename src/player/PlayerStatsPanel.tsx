import React from 'react';
import Stats from './Stats';
import './PlayerStatsPanel.css';

const PlayerStatsPanel = ({
    playerStats: {
        playerName,
        level,
        hp,
        hpTotal,
        mp,
        mpTotal,
        gold,
        xp,
        xpTillNextLevel,
        attack,
        defense,
        agility,
    },
}: {
    playerStats: Stats;
}) => (
    <div className="player-stats-panel">
        <h5 className="header">Stats</h5>
        <div className="player-stat">
            <label>Player</label>
            <span>{playerName}</span>
        </div>
        <div className="player-stat">
            <label>Level</label>
            <span>{level}</span>
        </div>
        <div className="player-stat">
            <label>HP</label>
            <span>
                {hp}/{hpTotal}
            </span>
        </div>
        <div className="player-stat">
            <label>MP</label>
            <span>
                {mp}/{mpTotal}
            </span>
        </div>
        <div className="player-stat">
            <label>Gold</label>
            <span>{gold}</span>
        </div>
        <div className="player-stat">
            <label>XP</label>
            <span>{xp}</span>
        </div>
        {xpTillNextLevel > 0 && (
            <div className="player-stat">
                <label>XP till next level</label>
                <span>{xpTillNextLevel}</span>
            </div>
        )}
        <div className="player-stat">
            <label>Attack</label>
            <span>{attack}</span>
        </div>
        <div className="player-stat">
            <label>Defense</label>
            <span>{defense}</span>
        </div>
        <div className="player-stat">
            <label>Agility</label>
            <span>{agility}</span>
        </div>
    </div>
);

export default PlayerStatsPanel;

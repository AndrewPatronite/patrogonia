import React from 'react';
import Stats from './Stats';
import ThemedPanel from '../components/theme/ThemedPanel';
import Row from "../components/Row";

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
    <ThemedPanel className="player-stats-panel" width="175px" heading="Stats" flexDirection="column">
        <Row className="player-stat">
            <label>Player</label>
            <span>{playerName}</span>
        </Row>
        <Row className="player-stat">
            <label>Level</label>
            <span>{level}</span>
        </Row>
        <Row className="player-stat">
            <label>HP</label>
            <span>
                {hp}/{hpTotal}
            </span>
        </Row>
        <Row className="player-stat">
            <label>MP</label>
            <span>
                {mp}/{mpTotal}
            </span>
        </Row>
        <Row className="player-stat">
            <label>Gold</label>
            <span>{gold}</span>
        </Row>
        <Row className="player-stat">
            <label>XP</label>
            <span>{xp}</span>
        </Row>
        {xpTillNextLevel > 0 && (
            <Row className="player-stat">
                <label>XP till next level</label>
                <span>{xpTillNextLevel}</span>
            </Row>
        )}
        <Row className="player-stat">
            <label>Attack</label>
            <span>{attack}</span>
        </Row>
        <Row className="player-stat">
            <label>Defense</label>
            <span>{defense}</span>
        </Row>
        <Row className="player-stat">
            <label>Agility</label>
            <span>{agility}</span>
        </Row>
    </ThemedPanel>
);

export default PlayerStatsPanel;

import React from 'react';
import { isEqual } from 'lodash';
import './Player.css';

const Player = ({
    player: {
        name: playerName,
        location: { facing: directionFacing },
    },
    isCurrentPlayer,
    isSaveLocation,
}) => {
    const playerClassName = `${
        isCurrentPlayer ? 'hero' : 'peer'
    } ${directionFacing}`;
    return (
        <div className="player">
            <div className={playerClassName}>
                {isEqual(directionFacing, 'up') && (
                    <p className="player-name-back">{playerName}</p>
                )}
                {isEqual(directionFacing, 'down') && (
                    <p className="player-name-front">{playerName}</p>
                )}
            </div>
            {isCurrentPlayer && isSaveLocation && (
                <div className="saved">
                    <p>HP/MP restored</p>
                    <p>Game Saved</p>
                </div>
            )}
        </div>
    );
};

export default Player;

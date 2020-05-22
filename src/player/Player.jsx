import React from 'react';
import { isEqual } from 'lodash';
import './Player.css';
import { faCampground, faDragon } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const CAMPING_DURATION_MILLIS = 10000;

const Player = ({
    player: {
        name: playerName,
        location: { facing: directionFacing },
        battleId,
        lastUpdate,
    },
    isCurrentPlayer,
    isSaveLocation,
}) => {
    const playerClassName = `${
        isCurrentPlayer ? 'hero' : 'peer'
    } ${directionFacing}`;
    const lastUpdateDate = lastUpdate && new Date(lastUpdate);
    const now = new Date();
    const camping =
        now.getTime() - lastUpdateDate.getTime() > CAMPING_DURATION_MILLIS;
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
            {battleId ? (
                <FontAwesomeIcon icon={faDragon} />
            ) : camping ? (
                <FontAwesomeIcon icon={faCampground} />
            ) : null}
        </div>
    );
};

export default Player;

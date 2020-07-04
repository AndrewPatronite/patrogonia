import React from 'react';
import { isEqual } from 'lodash';
import './Character.css';
import { faCampground, faDragon } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Player from "./Player";

const CAMPING_DURATION_MILLIS = 10000;

const Character = ({
    player: {
        name: playerName,
        location: { facing: directionFacing },
        battleId,
        lastUpdate,
    },
    isCurrentPlayer,
    isSaveLocation,
}: {
    player: Player,
    isCurrentPlayer: boolean,
    isSaveLocation: boolean,
}) => {
    const playerClassName = `${
        isCurrentPlayer ? 'hero' : 'peer'
    } ${directionFacing}`;
    const lastUpdateDate = lastUpdate && new Date(lastUpdate);
    const now = new Date();
    const camping =
        lastUpdateDate &&
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
                    <p>Game saved</p>
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

export default Character;

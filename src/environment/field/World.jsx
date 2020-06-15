import React, { useEffect, useState } from 'react';
import TileRow from './TileRow';
import { getMapDisplayRange } from './helper/getMapDisplayRange';
import './World.css';
import { MapState } from '../../state/MapState';
import { getLocationToPlayerMap } from './helper/getLocationToPlayerMap';
import { subscribe } from '../../subscription/subscribe';
import { playSound, pauseSound } from '../sound/sound';
import fieldMusic from '../sound/crusaderp/BattleHighlands.mp3';
import caveMusic from '../sound/crusaderp/AcrosstheSandWIP2.mp3';

const World = ({ currentPlayer, playerUrl }) => {
    const [playerLocationMessage, setPlayerLocationMessage] = useState({});
    const {
        location: { mapName },
    } = currentPlayer;

    useEffect(() => {
        if (mapName.includes('field')) {
            pauseSound('cave-music');
            playSound('field-music');
        } else {
            pauseSound('field-music');
            playSound('cave-music');
        }
    }, [mapName]);

    useEffect(() => {
        const playerLocationSubscription = subscribe(
            playerUrl,
            setPlayerLocationMessage
        );
        return () => playerLocationSubscription.close();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const [map, mapPlayers] = MapState(
        currentPlayer,
        playerLocationMessage,
        setPlayerLocationMessage
    );
    const locationToPlayersMap = getLocationToPlayerMap(
        mapPlayers,
        currentPlayer
    );
    const displayIndexRange = getMapDisplayRange(currentPlayer, map);
    const { rowStartIndex, rowEndIndex } = displayIndexRange;

    return (
        <div className="world">
            {map.layout
                .slice(rowStartIndex, rowEndIndex + 1)
                .map((rowSymbols, rowIndexOffset) => (
                    <TileRow
                        key={`tileRow-${rowStartIndex + rowIndexOffset}`}
                        rowSymbols={rowSymbols}
                        rowIndex={rowStartIndex + rowIndexOffset}
                        locationToPlayersMap={locationToPlayersMap}
                        displayIndexRange={displayIndexRange}
                        mapLayout={map.layout}
                        currentPlayer={currentPlayer}
                    />
                ))}
            <audio className="field-music" autoPlay loop>
                <source src={fieldMusic} />
            </audio>
            <audio className="cave-music" autoPlay loop>
                <source src={caveMusic} />
            </audio>
        </div>
    );
};

export default World;

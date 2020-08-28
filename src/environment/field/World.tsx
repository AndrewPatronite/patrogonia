import React, { useEffect, useState } from 'react';
import TileRow from './TileRow';
import { getMapDisplayRange } from './helper/getMapDisplayRange';
import './World.css';
import { MapState } from '../../state/MapState';
import { getLocationToPlayerMap } from './helper/getLocationToPlayerMap';
import { subscribe } from '../../subscription/subscribe';
import { playSound, pauseSound } from '../sound/sound';
import PlayerStatsModal from '../../player/PlayerStatsModal';
import FieldMenu from '../../player/FieldMenu';
import Player from '../../player/Player';
import { Maps } from '../maps/Maps';

const fieldMusic = require('../sound/crusaderp/BattleHighlands.mp3');
const caveMusic = require('../sound/crusaderp/AcrosstheSandWIP2.mp3');

const SHOW_PLAYER_STATS_DELAY = 5000;

const World = ({
    currentPlayer,
    playerUrl,
    closeFieldMenu,
    castSpell,
}: {
    currentPlayer: Player;
    playerUrl: string;
    closeFieldMenu: (event: React.MouseEvent | React.KeyboardEvent) => void;
    castSpell: (spellName: string, targetId: string) => void;
}) => {
    const [playerLocationMessage, setPlayerLocationMessage] = useState({});
    const [showPlayerStatsModal, setShowPlayerStatsModal] = useState(false);
    const {
        location: { mapName, rowIndex, columnIndex },
        stats,
        showFieldMenu,
    } = currentPlayer;

    useEffect(() => {
        if (Maps.isField(mapName)) {
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

    useEffect(() => {
        setShowPlayerStatsModal(false);
        const timer = setTimeout(
            () => setShowPlayerStatsModal(true),
            SHOW_PLAYER_STATS_DELAY
        );
        return () => clearTimeout(timer);
    }, [rowIndex, columnIndex]);

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
                .map((rowSymbols: string[], rowIndexOffset: number) => (
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
            <PlayerStatsModal
                showPlayerStats={showPlayerStatsModal && !showFieldMenu}
                onClose={() => setShowPlayerStatsModal(false)}
                stats={stats}
            />
            <FieldMenu
                showFieldMenu={showFieldMenu}
                closeFieldMenu={closeFieldMenu}
                currentPlayer={currentPlayer}
                castSpell={castSpell}
            />
        </div>
    );
};

export default World;

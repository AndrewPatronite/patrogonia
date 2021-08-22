import React, { useEffect, useState } from 'react';
import TileRow from './TileRow';
import { getMapDisplayRange } from './helper/getMapDisplayRange';
import './World.css';
import { MapState } from '../../state/MapState';
import { getLocationToPlayerMap } from './helper/getLocationToPlayerMap';
import { subscribe } from '../../subscription/subscribe';
import { pauseSound, playSound } from '../sound/sound';
import PlayerStatsModal from '../../player/PlayerStatsModal';
import FieldMenu from '../../player/FieldMenu';
import Player from '../../player/Player';
import { Maps } from '../maps/Maps';
import { useCharacterPositions, useModalState, useNpcs } from '../../hooks';
import { ModalEnum } from '../../context/ModalStateContext';
import DialogModal from '../../dialog/DialogModal';
import { usePlayerNavigationEffect } from '../../navigation';

const fieldMusic = require('../sound/crusaderp/BattleHighlands.mp3');
const caveMusic = require('../sound/crusaderp/AcrosstheSandWIP2.mp3');
const townMusic = require('../sound/crusaderp/IndoorsThree.mp3');

const SHOW_PLAYER_STATS_DELAY = 5000;

const World = ({
    currentPlayer,
    castSpell,
    updatePlayer,
}: {
    currentPlayer: Player;
    castSpell: (spellName: string, targetId: string) => void;
    updatePlayer: (player: Player, updateToServer: boolean) => void;
}) => {
    const playerUrl = `${process.env.REACT_APP_WEBSOCKET_BASE_URL}/players`;
    const {
        canMoveToPosition,
        setCharacterTalking,
        updateCharacterPosition,
    } = useCharacterPositions();
    const {
        closeModal,
        getModalContent,
        isModalOpen,
        openModal,
    } = useModalState();
    const {
        location: { mapName, rowIndex, columnIndex },
        stats,
    } = currentPlayer;
    const npcs = useNpcs(mapName);

    usePlayerNavigationEffect(
        currentPlayer,
        updatePlayer,
        canMoveToPosition,
        updateCharacterPosition,
        openModal,
        npcs,
        setCharacterTalking,
        isModalOpen
    );

    const [playerLocationMessage, setPlayerLocationMessage] = useState({});

    useEffect(() => {
        if (Maps.isField(mapName)) {
            pauseSound('cave-music');
            pauseSound('town-music');
            playSound('field-music');
        } else if (Maps.isTown(mapName)) {
            pauseSound('cave-music');
            pauseSound('field-music');
            playSound('town-music');
        } else {
            pauseSound('field-music');
            pauseSound('town-music');
            playSound('cave-music');
        }
    }, [mapName]);

    useEffect(() => {
        const playerLocationSubscription = subscribe(
            playerUrl,
            setPlayerLocationMessage
        );
        return () => {
            playerLocationSubscription.close();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        closeModal(ModalEnum.PlayerStats);
        const timer = setTimeout(
            () => openModal(ModalEnum.PlayerStats),
            SHOW_PLAYER_STATS_DELAY
        );
        return () => clearTimeout(timer);
    }, [rowIndex, columnIndex, closeModal, openModal]);

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
    const isPlayerStatsOpen = isModalOpen(ModalEnum.PlayerStats);
    const isFieldMenuOpen = isModalOpen(ModalEnum.FieldMenu);
    const isDialogOpen = isModalOpen(ModalEnum.Dialog);

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
                        npcs={npcs}
                    />
                ))}
            <audio className="field-music" autoPlay loop>
                <source src={fieldMusic} />
            </audio>
            <audio className="cave-music" autoPlay loop>
                <source src={caveMusic} />
            </audio>
            <audio className="town-music" autoPlay loop>
                <source src={townMusic} />
            </audio>
            <PlayerStatsModal
                showPlayerStats={
                    isPlayerStatsOpen && !isFieldMenuOpen && !isDialogOpen
                }
                onClose={() => closeModal(ModalEnum.PlayerStats)}
                stats={stats}
            />
            <FieldMenu
                showFieldMenu={isFieldMenuOpen && !isDialogOpen}
                closeFieldMenu={() => closeModal(ModalEnum.FieldMenu)}
                currentPlayer={currentPlayer}
                castSpell={castSpell}
            />
            <DialogModal
                showDialog={isDialogOpen}
                closeDialog={() => closeModal(ModalEnum.Dialog)}
                getDialog={() => getModalContent(ModalEnum.Dialog)}
            />
        </div>
    );
};

export default World;

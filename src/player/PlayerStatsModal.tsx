import React, { useEffect } from 'react';
import Modal from 'react-modal';
import './PlayerStatsModal.css';
import Stats from './Stats';

const PlayerStatsModal = ({
    showPlayerStats,
    onClose,
    stats: {
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
    showPlayerStats: boolean,
    onClose: (event: React.MouseEvent | React.KeyboardEvent) => void,
    stats: Stats,
}) => {
    useEffect(() => {
        Modal.setAppElement('body');
    }, []);

    const modalStyle = {
        content: {
            top: '30%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(5%, 5%)',
        },
    };
    return (
        <Modal
            className="player-stats-modal"
            isOpen={showPlayerStats}
            onRequestClose={onClose}
            style={modalStyle}
            shouldFocusAfterRender={false}
        >
            <div className="player-stats">
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
        </Modal>
    );
};

export default PlayerStatsModal;

import React, { useEffect } from 'react';
import Modal from 'react-modal';
import Stats from './Stats';
import PlayerStatsPanel from './PlayerStatsPanel';
import './PlayerStatsModal.css';

const PlayerStatsModal = ({
    showPlayerStats,
    onClose,
    stats: playerStats,
}: {
    showPlayerStats: boolean;
    onClose: (event: React.MouseEvent | React.KeyboardEvent) => void;
    stats: Stats;
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
            <PlayerStatsPanel playerStats={playerStats} />
        </Modal>
    );
};

export default PlayerStatsModal;

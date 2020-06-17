import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import LinkButton from '../control/LinkButton';
import './Credits.css';

const Credits = () => {
    const [showingCredits, showCredits] = useState(false);

    useEffect(() => {
        Modal.setAppElement('body');
    }, []);

    const dismiss = () => showCredits(false);

    const modalStyle = {
        content: {
            top: '30%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
        },
    };

    return (
        <div className="credits">
            <LinkButton
                className={showingCredits ? 'hidden' : undefined}
                onClick={() => showCredits(true)}
                label="credits"
            />
            <Modal
                isOpen={showingCredits}
                onRequestClose={dismiss}
                style={modalStyle}
            >
                <div className="credits-modal">
                    <h4 className="header">Created by</h4>
                    <label>Andrew Patronite</label>
                    <a href="mailto:patronite@gmail.com">patronite@gmail.com</a>

                    <h4 className="header">Music</h4>
                    <label>Crusaderp</label>
                    <a
                        href="https://soundcloud.com/crusaderp/sets/the-frontier"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        https://soundcloud.com/crusaderp/sets/the-frontier
                    </a>

                    <h4 className="header">Battle sound effects</h4>
                    <label>James Tubbritt (Sharp)</label>
                    <a
                        href="http://www.irishacts.com"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        http://www.irishacts.com
                    </a>

                    <h4 className="header">Trumpet and spell sound effects</h4>
                    <a
                        href="https://www.zapsplat.com"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        https://www.zapsplat.com
                    </a>
                </div>
            </Modal>
        </div>
    );
};

export default Credits;

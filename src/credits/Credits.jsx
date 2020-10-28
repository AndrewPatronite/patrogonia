import React, { useContext, useEffect, useState } from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';
import LinkButton from '../control/LinkButton';
import './Credits.css';
import ThemedPanel from '../components/theme/ThemedPanel';
import { ThemeContext } from '../components/theme/ThemeContext';
import ThemedHeader from '../components/theme/ThemedHeader';

const StyledLink = styled.a`
    color: ${(props) => props.theme.linkColor};
    margin-bottom: 40px;
`;

const Credits = () => {
    const [showingCredits, showCredits] = useState(false);
    const { theme } = useContext(ThemeContext);

    useEffect(() => {
        Modal.setAppElement('body');
    }, []);

    const dismiss = () => showCredits(false);

    const modalStyle = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            border: 0,
            padding: 0,
        },
    };

    return (
        <div className="credits">
            <LinkButton
                className={showingCredits ? 'hidden' : undefined}
                onClick={() => showCredits(true)}
            >
                credits
            </LinkButton>
            <Modal
                isOpen={showingCredits}
                onRequestClose={dismiss}
                style={modalStyle}
            >
                <ThemedPanel className="credits-modal" flexDirection="column">
                    <ThemedHeader theme={theme} className="credits-header">
                        Created by
                    </ThemedHeader>
                    <label>Andrew Patronite</label>
                    <StyledLink
                        className="styled-link"
                        theme={theme}
                        href="mailto:patronite@gmail.com"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        patronite@gmail.com
                    </StyledLink>

                    <ThemedHeader theme={theme} className="credits-header">
                        Music
                    </ThemedHeader>
                    <label>Crusaderp</label>
                    <StyledLink
                        className="styled-link"
                        theme={theme}
                        href="https://soundcloud.com/crusaderp/sets/the-frontier"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        https://soundcloud.com/crusaderp/sets/the-frontier
                    </StyledLink>

                    <ThemedHeader theme={theme} className="credits-header">
                        Battle sound effects
                    </ThemedHeader>
                    <label>James Tubbritt (Sharp)</label>
                    <StyledLink
                        className="styled-link"
                        theme={theme}
                        href="http://www.irishacts.com"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        http://www.irishacts.com
                    </StyledLink>

                    <ThemedHeader theme={theme} className="credits-header">
                        Trumpet and spell sound effects
                    </ThemedHeader>
                    <StyledLink
                        className="styled-link"
                        theme={theme}
                        href="https://www.zapsplat.com"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        https://www.zapsplat.com
                    </StyledLink>
                </ThemedPanel>
            </Modal>
        </div>
    );
};

export default Credits;

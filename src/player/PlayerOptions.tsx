import React, { useEffect, useRef } from 'react';
import ThemedPanel from '../components/theme/ThemedPanel';
import ThemeSwitch from '../components/theme/ThemeSwitch';
import LinkButton from '../control/LinkButton';

const PlayerOptions = () => {
    const switchRef = useRef(null);

    useEffect(() => {
        // @ts-ignore
        switchRef.current.firstChild.lastChild.lastChild.focus();
    }, []);

    const logOut = () => {
        const currentPlayerKey = 'currentPlayer';
        const currentPlayer = JSON.parse(
            localStorage.getItem(currentPlayerKey) || ''
        );
        currentPlayer.loggedIn = false;
        localStorage.setItem(currentPlayerKey, JSON.stringify(currentPlayer));
        window.location.href = '/';
    };

    return (
        <ThemedPanel
            className="player-options"
            heading="Options"
            flexDirection="column"
        >
            <div ref={switchRef}>
                <ThemeSwitch />
            </div>
            {
                // @ts-ignore
                <LinkButton className="logout-button" onClick={logOut}>
                    Log out
                </LinkButton>
            }
        </ThemedPanel>
    );
};

export default PlayerOptions;

import React, { useEffect, useState } from 'react';
import Battle from './battle/Battle';
import World from './environment/field/World';
import Landing from './landing/Landing';
import HowToPlay from './instructions/HowToPlay';
import { PlayerState } from './state/PlayerState';
import { playerNavigationEffect } from './navigation/playerNavigationEffect';
import './Patrogonia.css';

const Patrogonia = () => {
    const playerUrl = `${process.env.REACT_APP_WEBSOCKET_BASE_URL}/players`;
    const battleUrl = `${process.env.REACT_APP_WEBSOCKET_BASE_URL}/battles`;
    const [
        currentPlayer,
        login,
        createAccount,
        updatePlayer,
        loadPlayer,
        loadSave,
    ] = PlayerState();

    useEffect(playerNavigationEffect(currentPlayer, updatePlayer), [
        currentPlayer,
    ]);

    const [showInstructions, setShowInstructions] = useState(
        currentPlayer.loggedIn && !currentPlayer.skipInstructions
    );

    useEffect(() => {
        if (currentPlayer.loggedIn && !currentPlayer.skipInstructions) {
            setShowInstructions(true);
        }
    }, [currentPlayer.loggedIn, currentPlayer.skipInstructions]);

    const skipInstructions = (shouldSkip) => {
        setShowInstructions(false);
        updatePlayer({ ...currentPlayer, skipInstructions: shouldSkip }, false);
    };

    return (
        <div className="patrogonia">
            {showInstructions ? (
                <HowToPlay onDismiss={() => skipInstructions(true)} />
            ) : currentPlayer.loggedIn ? (
                currentPlayer.battleId ? (
                    <Battle
                        currentPlayer={currentPlayer}
                        loadPlayer={loadPlayer}
                        updatePlayer={updatePlayer}
                        battleUrl={battleUrl}
                        loadSave={loadSave}
                    />
                ) : (
                    <World
                        currentPlayer={currentPlayer}
                        playerUrl={playerUrl}
                    />
                )
            ) : (
                <Landing
                    login={login}
                    createAccount={createAccount}
                    showInstructions={() => setShowInstructions(true)}
                />
            )}
        </div>
    );
};

export default Patrogonia;

import React, { useEffect } from 'react';
import Battle from './battle/Battle';
import World from './environment/field/World';
import Landing from './landing/Landing';
import { PlayerState } from './state/PlayerState';
import { playerNavigationEffect } from './navigation/playerNavigationEffect';
import './Patrogonia.css';

const playerUrl = 'ws://localhost:8080/players';
const battleUrl = 'ws://localhost:8080/battles';

const Patrogonia = () => {
    const [
        currentPlayer,
        login,
        createAccount,
        updatePlayer,
        loadPlayer,
    ] = PlayerState();

    useEffect(playerNavigationEffect(currentPlayer, updatePlayer), [
        currentPlayer,
    ]);

    return (
        <div className="patrogonia">
            {currentPlayer.loggedIn ? (
                currentPlayer.battleId ? (
                    <Battle
                        currentPlayer={currentPlayer}
                        loadPlayer={loadPlayer}
                        updatePlayer={updatePlayer}
                        battleUrl={battleUrl}
                    />
                ) : (
                    <World
                        currentPlayer={currentPlayer}
                        playerUrl={playerUrl}
                    />
                )
            ) : (
                <Landing login={login} createAccount={createAccount} />
            )}
        </div>
    );
};

export default Patrogonia;

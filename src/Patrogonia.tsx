import React, { useEffect } from 'react';
import { Route, useHistory, Switch } from 'react-router-dom';
import { PlayerState } from './state/PlayerState';
import Landing from './landing/Landing';
import HowToPlay from './instructions/HowToPlay';
import World from './environment/field/World';
import Battle from './battle/Battle';
import './Patrogonia.css';
import PermissionRoute from './PermissionRoute';

const Patrogonia = () => {
    const battleUrl = `${process.env.REACT_APP_WEBSOCKET_BASE_URL}/battles`;
    const [
        currentPlayer,
        login,
        createAccount,
        updatePlayer,
        loadPlayer,
        loadSave,
        castSpell,
    ] = PlayerState();
    const history = useHistory();

    useEffect(() => {
        const {
            location: { pathname },
        } = history;
        let nextPath;

        if (!currentPlayer.loggedIn) {
            nextPath = '/login';
        } else if (!currentPlayer.skipInstructions) {
            updatePlayer({ ...currentPlayer, skipInstructions: true }, false);
            nextPath = '/how-to-play';
        } else if (currentPlayer.battleId) {
            nextPath = '/battle';
        } else {
            nextPath = '/field';
        }
        if (nextPath !== pathname) {
            history.replace(nextPath);
        }
    }, [currentPlayer, history, updatePlayer]);

    return (
        <Switch>
            <Route path="/how-to-play">
                <HowToPlay
                    nextPath={currentPlayer.loggedIn ? '/field' : '/login'}
                />
            </Route>
            <PermissionRoute
                hasPermission={currentPlayer.loggedIn}
                path="/battle"
            >
                <Battle
                    currentPlayer={currentPlayer}
                    loadPlayer={loadPlayer}
                    updatePlayer={updatePlayer}
                    battleUrl={battleUrl}
                    loadSave={loadSave}
                />
            </PermissionRoute>
            <PermissionRoute
                hasPermission={currentPlayer.loggedIn}
                path="/field"
            >
                <div className="patrogonia">
                    <World
                        currentPlayer={currentPlayer}
                        castSpell={castSpell}
                        updatePlayer={updatePlayer}
                    />
                </div>
            </PermissionRoute>
            <Route path={['/', '/login']}>
                <Landing login={login} createAccount={createAccount} />
            </Route>
        </Switch>
    );
};

export default Patrogonia;

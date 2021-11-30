import React, { useEffect } from 'react'
import { Route, Switch, useHistory } from 'react-router-dom'
import World from './environment/field/World'
import Battle from './battle/Battle'
import PermissionRoute from './PermissionRoute'
import { LandingPage } from './landing'
import { usePlayer } from './hooks/usePlayer'

const Patrogonia = () => {
  const battleUrl = `${process.env.REACT_APP_WEBSOCKET_BASE_URL}/battles`
  const {
    castSpell,
    createAccount,
    currentPlayer,
    loadPlayer,
    loadSave,
    login,
    updatePlayer,
  } = usePlayer()
  const history = useHistory()

  useEffect(() => {
    const {
      location: { pathname },
    } = history
    let nextPath

    if (!currentPlayer.loggedIn) {
      nextPath = '/login'
    } else if (currentPlayer.battleId) {
      nextPath = '/battle'
    } else {
      nextPath = '/field'
    }
    if (nextPath !== pathname) {
      history.replace(nextPath)
    }
  }, [currentPlayer, history, updatePlayer])

  return (
    <Switch>
      <PermissionRoute hasPermission={currentPlayer.loggedIn} path="/battle">
        <Battle
          currentPlayer={currentPlayer}
          loadPlayer={loadPlayer}
          updatePlayer={updatePlayer}
          battleUrl={battleUrl}
          loadSave={loadSave}
        />
      </PermissionRoute>
      <PermissionRoute hasPermission={currentPlayer.loggedIn} path="/field">
        <World
          currentPlayer={currentPlayer}
          castSpell={castSpell}
          updatePlayer={updatePlayer}
        />
      </PermissionRoute>
      <Route path={['/', '/login']}>
        <LandingPage login={login} createAccount={createAccount} />
      </Route>
    </Switch>
  )
}

export default Patrogonia

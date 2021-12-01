import React, { useEffect } from 'react'
import { Route, Switch, useHistory } from 'react-router-dom'
import World from './environment/field/World'
import PermissionRoute from './PermissionRoute'
import { LandingPage } from './landing'
import { usePlayer } from './hooks/usePlayer'
import { Battle } from './battle'

const Patrogonia = () => {
  const {
    castSpell,
    createAccount,
    currentPlayer,
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
      nextPath = `/battle/${currentPlayer.battleId}`
    } else {
      nextPath = `/field/${currentPlayer.location.mapName}`
    }
    if (nextPath !== pathname) {
      history.replace(nextPath)
    }
  }, [currentPlayer, history, updatePlayer])

  return (
    <Switch>
      <PermissionRoute
        hasPermission={currentPlayer.loggedIn}
        path="/battle/:battleId"
      >
        <Battle />
      </PermissionRoute>
      <PermissionRoute
        hasPermission={currentPlayer.loggedIn}
        path="/field/:mapName"
      >
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

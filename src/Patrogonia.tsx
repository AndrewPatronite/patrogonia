import React, { useEffect } from 'react'
import { Route, Switch, useHistory } from 'react-router-dom'
import { PlayerState } from './state/PlayerState'
import World from './environment/field/World'
import Battle from './battle/Battle'
import PermissionRoute from './PermissionRoute'
import { LandingPage } from './landing'
import { useToast } from '@chakra-ui/react'

const Patrogonia = () => {
  const toast = useToast()
  const battleUrl = `${process.env.REACT_APP_WEBSOCKET_BASE_URL}/battles`
  const [
    currentPlayer,
    login,
    createAccount,
    updatePlayer,
    loadPlayer,
    loadSave,
    castSpell,
  ] = PlayerState(toast)
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

import React from 'react'
import { Route, useHistory } from 'react-router-dom'
import { RouteProps } from 'react-router'

interface PermissionRouteProps extends RouteProps {
  hasPermission: boolean
}

const PermissionRoute = ({
  hasPermission,
  children,
  ...routerProps
}: PermissionRouteProps) => {
  const history = useHistory()
  if (hasPermission) {
    return <Route {...routerProps}>{children}</Route>
  } else {
    history.replace('/')
    return null
  }
}

export default PermissionRoute

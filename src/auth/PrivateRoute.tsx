/* eslint-disable react/jsx-props-no-spreading */
import React, { useContext } from 'react'
import {
  Route,
  Redirect,
  RouteComponentProps,
  RouteProps,
} from 'react-router-dom'

import { useAuth } from '../providers/AuthProvider'

interface IPrivateRouteProps extends RouteProps {
  component: React.ComponentType<RouteComponentProps>
}

const PrivateRoute = ({
  component: RouteComponent,
  ...rest
}: IPrivateRouteProps) => {
  const { user } = useAuth()

  return (
    <Route
      exact
      {...rest}
      render={(routeProps) =>
        user ? <RouteComponent {...routeProps} /> : <Redirect to="/login" />
      }
    />
  )
}

export default PrivateRoute

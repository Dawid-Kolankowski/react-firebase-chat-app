/* eslint-disable react/jsx-props-no-spreading */
import React, { useContext } from 'react'
import {
  Route,
  Redirect,
  RouteComponentProps,
  RouteProps,
} from 'react-router-dom'
import { AuthContext } from '../providers/AuthProvider'

interface IPublicRouteProps extends RouteProps {
  component: React.ComponentType<RouteComponentProps>
  restricted: boolean
}

const PublicRoute = ({
  component: RouteComponent,
  restricted,
  ...rest
}: IPublicRouteProps) => {
  const { user } = AuthContext()

  return (
    <Route
      {...rest}
      render={(routeProps) =>
        user && restricted ? (
          <Redirect to="/" />
        ) : (
          <RouteComponent {...routeProps} />
        )
      }
    />
  )
}

export default PublicRoute

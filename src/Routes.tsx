import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import { useAuth } from './providers/AuthProvider'
import Spinner from './components/Spinner'
import PrivateRoute from './auth/PrivateRoute'
import PublicRoute from './auth/PublicRoute'
import Chat from './pages/Chat'

function Routes() {
  const { loading } = useAuth()

  return (
    <Router>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <PrivateRoute path="/" component={Chat} />
          <PublicRoute path="/login" component={Login} exact restricted />
          <PublicRoute path="/register" component={Register} restricted />
        </>
      )}
    </Router>
  )
}

export default Routes

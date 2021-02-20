import React from 'react'
import './App.css'
import styled, { createGlobalStyle } from 'styled-components'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import 'react-toastify/dist/ReactToastify.css'

const GlobalStyle = createGlobalStyle`
body{
  
  font-family: 'Roboto', sans-serif;
  box-sizing:border-box;
  background-color:#1789FC;
  color:#333136;
}
*,::after,::before{
  box-sizing:inherit;
  font-family:inherit;
  margin: 0;
  padding: 0;
 
}
`

const App: React.FC = () => {
  return (
    <Router>
      <GlobalStyle />
      <Route path="/" component={Login} exact />
      <Route path="/register" component={Register} />
    </Router>
  )
}

export default App

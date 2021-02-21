import React from 'react'
import './App.css'
import { AuthProvider } from './providers/AuthProvider'
import GlobalStyle from './styles/globalStyles'
import Routes from './Routes'

import 'react-toastify/dist/ReactToastify.css'

const App: React.FC = () => {
  return (
    <AuthProvider>
      <GlobalStyle />
      <Routes />
    </AuthProvider>
  )
}

export default App

/* eslint-disable no-unused-expressions */
import React, { useEffect, useState } from 'react'
import firebase from 'firebase/app'
import { auth } from '../firebase/firebase'
import { createUserProfileDoc } from '../firebase/firebaseUser'

export function createCtx<ContextType>() {
  const ctx = React.createContext<ContextType | undefined>(undefined)
  function useCtx() {
    const c = React.useContext(ctx)
    if (!c) throw new Error('useCtx must be inside a Provider with a value')
    return c
  }
  return [useCtx, ctx.Provider] as const
}

type AuthProviderType = {
  user: firebase.User | null
  loading: boolean
  setLoading: (value: boolean) => void
}
const [useAuth, CtxProvider] = createCtx<AuthProviderType>()

export { useAuth as AuthContext }

export const AuthProvider: React.FC<React.ReactNode> = ({ children }) => {
  const [user, setUser] = useState<firebase.User | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const unsubscribeFromAuth = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser)
      setLoading(false)
      currentUser ? createUserProfileDoc(currentUser) : null
    })

    return () => unsubscribeFromAuth()
  }, [])

  return (
    <CtxProvider value={{ user, loading, setLoading }}>{children}</CtxProvider>
  )
}

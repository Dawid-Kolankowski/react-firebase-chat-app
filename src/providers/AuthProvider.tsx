/* eslint-disable no-unused-expressions */
import React, { useEffect, useState } from 'react'
import firebase from 'firebase/app'
import { auth, firestore } from '../firebase/firebase'
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
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
}
const [useAuth, CtxProvider] = createCtx<AuthProviderType>()

export { useAuth }

export const AuthProvider: React.FC<React.ReactNode> = ({ children }) => {
  const [user, setUser] = useState<firebase.User | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const unsubscribeFromAuth = auth.onAuthStateChanged(async (currentUser) => {
      setUser(currentUser)
      if (currentUser) {
        await createUserProfileDoc(currentUser)

        firestore
          .collection('users')
          .doc(currentUser.uid)
          .update({ status: true })
      }

      setLoading(false)
    })

    return () => unsubscribeFromAuth()
  }, [])

  return (
    <CtxProvider value={{ user, loading, setLoading }}>{children}</CtxProvider>
  )
}

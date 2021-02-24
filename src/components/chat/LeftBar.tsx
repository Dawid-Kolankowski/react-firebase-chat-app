import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import firebase from 'firebase/app'
import UserInfo from './UserInfo'
import { useAuth } from '../../providers/AuthProvider'
import { getUserDoc } from '../../firebase/firebaseUser'

const LeftBar = () => {
  const { user } = useAuth()
  const [userDoc, setUserDoc] = useState<
    firebase.firestore.DocumentData | null | undefined
  >(null)

  useEffect(() => {
    async function getDoc() {
      const doc = await getUserDoc(user!.uid)
      setUserDoc(doc)
    }
    getDoc()
  }, [user])
  return (
    <Container>
      {userDoc ? <UserInfo userDoc={userDoc} /> : null}aaaaaaa
    </Container>
  )
}

export default LeftBar

const Container = styled.div`
  min-width: 280px;
  max-width: 360px;
  flex-basis: auto;
  flex-grow: 1;
  background-color: white;
  height: 90%;
  border-radius: 0.5rem 0 0 0.5rem;
  padding: 1rem;
`

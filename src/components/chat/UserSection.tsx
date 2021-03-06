import React, { useEffect, useState, useContext } from 'react'
import styled from 'styled-components'
import firebase from 'firebase/app'
import UserInfo from './UserInfo'
import ChatsList from './ChatsList'
import { useAuth } from '../../providers/AuthProvider'
import { getUserDoc } from '../../firebase/firebaseUser'
import { IUser } from '../../types'

const UserSection = () => {
  const { user } = useAuth()
  const [userDoc, setUserDoc] = useState<IUser | null>(null)

  useEffect(() => {
    async function getDoc() {
      const doc = await getUserDoc(user!.uid)
      setUserDoc(doc)
    }
    getDoc()
  }, [user])

  return (
    <Container>
      {userDoc && <UserInfo userDoc={userDoc} />}
      <ChatsList user={user!.uid} />
    </Container>
  )
}

export default UserSection

const Container = styled.div`
  min-width: 280px;
  max-width: 360px;
  flex: 1;
  background-color: white;
  height: 90%;
  border-radius: 0.5rem 0 0 0.5rem;
  padding: 1rem;
  display: flex;
  flex-direction: column;
`

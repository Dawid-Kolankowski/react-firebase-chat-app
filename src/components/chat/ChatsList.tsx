import React, { useEffect, useState } from 'react'
import firebase from 'firebase/app'
import styled from 'styled-components'
import { firestore } from '../../firebase/firebase'
import ChatUser from './ChatUser'

const ChatsList = ({ user }: { user: string }) => {
  const [chats, setChats] = useState<firebase.firestore.DocumentData[]>([])

  useEffect(() => {
    const unsubscribe = firestore
      .collection('users')
      .doc(user)
      .collection('friends')
      .onSnapshot((doc) => {
        const docs = doc.docs.map((item) => item.data())
        setChats(docs)
      })
    return () => unsubscribe()
  }, [user])

  return (
    <>
      <Header>Friends List</Header>
      {chats.map((chat) => (
        <ChatUser key={chat.chatId} chatInfo={chat} />
      ))}
    </>
  )
}

export default ChatsList

const Header = styled.h3`
  margin-bottom: 0.5rem;
`

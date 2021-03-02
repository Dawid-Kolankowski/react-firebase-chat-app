import React, { useEffect, useState } from 'react'
import firebase from 'firebase/app'
import styled from 'styled-components'
import { ScrollStyling } from '../../styles/components'
import { firestore } from '../../firebase/firebase'
import ChatUser from './ChatUser'

interface IChat {
  chatId: string
  friendId: string
}

const ChatsList = ({ user }: { user: string }) => {
  const [chats, setChats] = useState<IChat[]>([])

  useEffect(() => {
    const unsubscribe = firestore
      .collection('users')
      .doc(user)
      .collection('friends')
      .onSnapshot((doc) => {
        const docs = doc.docs.map((item) => item.data() as IChat)
        setChats(docs)
      })
    return () => unsubscribe()
  }, [user])

  return (
    <>
      <Header>Friends List</Header>
      <Container>
        {chats.map((chat) => (
          <ChatUser key={chat.chatId} chatInfo={chat} />
        ))}
      </Container>
    </>
  )
}

export default ChatsList

const Header = styled.h3`
  margin-bottom: 0.5rem;
`

const Container = styled.div`
  overflow: auto;
  flex: 1;
  ${ScrollStyling}
`

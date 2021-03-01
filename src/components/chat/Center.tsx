import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import { firestore } from '../../firebase/firebase'
import { ChatContext } from '../../providers/ChatProvider'
import { useAuth } from '../../providers/AuthProvider'
import ChatHeader from './ChatHeader'
import ChatInput from './ChatInput'
import ChatBox from './ChatBox'

const Center = () => {
  const { selectedChat } = useContext(ChatContext)
  const { user } = useAuth()
  const [currentUserDoc, setCurrentUserDoc] = useState<any>({})
  const [friendDoc, setFriendDoc] = useState<any>({})

  useEffect(() => {
    if (selectedChat.friendId !== '') {
      firestore
        .collection('users')
        .doc(user!.uid)
        .get()
        .then((doc) => setCurrentUserDoc({ id: doc.id, ...doc.data() }))

      firestore
        .collection('users')
        .doc(selectedChat.friendId)
        .get()
        .then((doc) => setFriendDoc({ id: doc.id, ...doc.data() }))
    }
  }, [selectedChat])

  return (
    <Container>
      {selectedChat.friendId ? (
        <>
          <ChatHeader friendDoc={friendDoc} />
          <ChatBox />{' '}
          <ChatInput
            chatId={selectedChat.chatId}
            currentUser={currentUserDoc}
          />
        </>
      ) : null}
    </Container>
  )
}

export default Center

const Container = styled.div`
  flex: 2;
  flex-shrink: 0;
  background-color: white;
  height: 90%;
  min-width: 320px;
  border-left: 2px solid rgba(51, 49, 54, 0.1);
  border-right: 2px solid rgba(51, 49, 54, 0.1);
  display: flex;
  flex-direction: column;
`

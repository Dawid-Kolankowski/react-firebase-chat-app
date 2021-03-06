import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import { getUserDoc } from '../../firebase/firebaseUser'
import { ChatContext } from '../../providers/ChatProvider'
import { useAuth } from '../../providers/AuthProvider'
import ChatHeader from './ChatHeader'
import ChatInput from './ChatInput'
import ChatBox from './ChatBox'
import { IUser } from '../../types'

const ChatSection: React.FC = () => {
  const { selectedChat } = useContext(ChatContext)
  const { user } = useAuth()
  const [currentUserDoc, setCurrentUserDoc] = useState<IUser>({} as IUser)
  const [friendDoc, setFriendDoc] = useState<IUser>({} as IUser)

  async function getUsers() {
    setCurrentUserDoc(await getUserDoc(user!.uid))
    setFriendDoc(await getUserDoc(selectedChat.friendId))
  }

  useEffect(() => {
    if (selectedChat.friendId !== '') {
      getUsers()
    }
  }, [selectedChat])

  return (
    <Container>
      {selectedChat.friendId && (
        <>
          <ChatHeader friendDoc={friendDoc} />
          <ChatBox
            selectedChatId={selectedChat.chatId}
            currentUser={currentUserDoc}
            friend={friendDoc}
          />{' '}
          <ChatInput
            chatId={selectedChat.chatId}
            currentUser={currentUserDoc}
          />
        </>
      )}
    </Container>
  )
}

export default ChatSection

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

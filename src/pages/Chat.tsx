import React, { useEffect } from 'react'
import styled from 'styled-components'
import ChatBox from '../components/chat/ChatBox'
import LeftBar from '../components/chat/LeftBar'
import RightBar from '../components/chat/RightBar'
import { StyledToastContainer } from '../styles/components'
import { useAuth } from '../providers/AuthProvider'
import { setOfflineOnClose } from '../firebase/firebaseUser'
import ChatProvider from '../providers/ChatProvider'
import useUnload from '../hooks/useUnload'

const Chat: React.FC = () => {
  const { user } = useAuth()

  useUnload(() => {
    setOfflineOnClose(user!.uid)
  })
  return (
    <Container>
      <ChatProvider>
        <StyledToastContainer />
        <LeftBar />
        <ChatBox />
        <RightBar />
      </ChatProvider>
    </Container>
  )
}

export default Chat

const Container = styled.div`
  max-width: 1400px;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 1rem;
  margin: 0 auto;
`

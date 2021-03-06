import React from 'react'
import styled from 'styled-components'
import ChatSection from '../components/chat/ChatSection'
import UserSection from '../components/chat/UserSection'
import RequestsSection from '../components/chat/RequestsSection'
import { StyledToastContainer } from '../styles/components'
import { useAuth } from '../providers/AuthProvider'
import { setOfflineOnClose } from '../firebase/firebaseUser'
import ChatProvider from '../providers/ChatProvider'
import useUnload from '../hooks/useUnload'

const Chat: React.FC = () => {
  const { user } = useAuth()

  useUnload((e: Event) => {
    setOfflineOnClose(user!.uid)

    e.preventDefault()
    e.returnValue = false
  })
  return (
    <Container>
      <ChatProvider>
        <StyledToastContainer />
        <UserSection />
        <ChatSection />
        <RequestsSection />
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

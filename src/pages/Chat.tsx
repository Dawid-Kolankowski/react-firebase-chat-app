import React, { useEffect } from 'react'
import styled from 'styled-components'
import ChatBox from '../components/chat/ChatBox'
import LeftBar from '../components/chat/LeftBar'
import RightBar from '../components/chat/RightBar'
import { StyledToastContainer } from '../styles/components'
import { useAuth } from '../providers/AuthProvider'
import { setOfflineOnClose } from '../firebase/firebaseUser'

const Chat: React.FC = () => {
  const { user } = useAuth()

  const handler = () => setOfflineOnClose(user!.uid)

  useEffect(() => {
    window.addEventListener('beforeunload', handler)
    return window.removeEventListener('beforeunload', handler)
  }, [])

  return (
    <Container>
      <StyledToastContainer />
      <LeftBar />
      <ChatBox />
      <RightBar />
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

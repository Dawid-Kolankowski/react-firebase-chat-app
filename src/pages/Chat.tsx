import React from 'react'
import styled from 'styled-components'

import ChatBox from '../components/chat/ChatBox'
import LeftBar from '../components/chat/LeftBar'
import RightBar from '../components/chat/RightBar'

const Chat: React.FC = () => {
  return (
    <Container>
      <LeftBar />
      <ChatBox />
      <RightBar />
    </Container>
  )
}

export default Chat

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 1rem;
`

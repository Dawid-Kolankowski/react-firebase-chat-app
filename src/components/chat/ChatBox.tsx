import React from 'react'
import styled from 'styled-components'

const ChatBox = () => {
  return <Container />
}

export default ChatBox

const Container = styled.div`
  flex: 1;
  background-color: white;
  height: 90%;
  min-width: 320px;
  border-left: 2px solid rgba(51, 49, 54, 0.1);
  border-right: 2px solid rgba(51, 49, 54, 0.1);
  padding: 1rem;
`

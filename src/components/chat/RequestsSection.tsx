import React from 'react'
import styled from 'styled-components'
import FriendRequests from './FriendRequests'

const RequestsSection = () => {
  return (
    <Container>
      <FriendRequests />
    </Container>
  )
}

export default RequestsSection

const Container = styled.div`
  background-color: white;
  min-width: 280px;
  max-width: 360px;
  flex: 1;
  height: 90%;
  border-radius: 0 0.5rem 0.5rem 0;
  padding: 1rem;
`

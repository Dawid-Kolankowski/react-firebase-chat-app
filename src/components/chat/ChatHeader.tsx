import React from 'react'
import styled from 'styled-components'

const ChatHeader = ({ friendDoc }: { friendDoc: any }) => {
  return (
    <Container>
      <ProfilePicture src={friendDoc.photoURL} />
      <Header>{friendDoc.displayName}</Header>
    </Container>
  )
}

export default ChatHeader

const Container = styled.div`
  padding: 0.5rem;
  border-bottom: 1px solid rgba(51, 49, 54, 0.1);
  display: flex;
`

const ProfilePicture = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 0.5rem;
`
const Header = styled.h3`
  margin-left: 1rem;
`

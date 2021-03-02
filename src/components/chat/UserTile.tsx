import React from 'react'
import styled from 'styled-components'
import { AddOutline } from '@styled-icons/zondicons'

interface IUser {
  onClick: (id: string) => void
  userDoc: any
}

const UserTile: React.FC<IUser> = ({ onClick, userDoc }) => {
  return (
    <Container>
      <ProfilePicture src={userDoc.photoURL} alt="profile" />

      <Header>{userDoc.displayName}</Header>
      <AddButton onClick={() => onClick(`${userDoc.id}`)}>
        <AddIcon />
      </AddButton>
    </Container>
  )
}

export default UserTile

const Container = styled.div`
  display: flex;
  background: #ceeaf7;
  padding: 0.5rem;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
`
const Header = styled.h3`
  margin-left: 0.5rem;
  max-width: 20rem;
  color: #333136;
`
const ProfilePicture = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 0.5rem;
`
const AddIcon = styled(AddOutline)`
  height: 30px;
  color: #333136;
`
const AddButton = styled.button`
  background-color: transparent;
  border: none;
  outline: none;
  margin-left: auto;
  :hover {
    cursor: pointer;
  }
`

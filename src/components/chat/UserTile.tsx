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
      <ProfilePicture src={`${userDoc.photoURL}`} alt="profile" />

      <h3>{userDoc.displayName}</h3>
      <AddButton onClick={() => onClick(`${userDoc.id}`)}>
        <AddIcon />
      </AddButton>
    </Container>
  )
}

export default UserTile

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
`

const ProfilePicture = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 0.5rem;
`
const AddIcon = styled(AddOutline)`
  height: 30px;
  color: white;
`
const AddButton = styled.button`
  background-color: transparent;
  border: none;
  outline: none;
  :hover {
    cursor: pointer;
  }
`

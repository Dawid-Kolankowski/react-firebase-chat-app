import React from 'react'
import firebase from 'firebase/app'
import styled, { css } from 'styled-components'
import UserMenu from './UserMenu'

function UserInfo({ userDoc }: firebase.firestore.DocumentData) {
  return (
    <Container border>
      <Container>
        <ProfilePicture src={userDoc.photoURL} alt="profile" />

        <UserName>{userDoc.displayName}</UserName>
      </Container>
      <UserMenu />
    </Container>
  )
}

export default UserInfo

const Container = styled('div')<{ border?: boolean }>`
  display: flex;
  justify-content: space-between;

  ${(props) =>
    props?.border &&
    css`
      padding: 1rem;
      background-color: #ceeaf7;
      border-radius: 0.5rem;
      position: relative;
      align-items: center;
      margin-bottom: 1rem;
    `}
`

const ProfilePicture = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 0.5rem;
`

const UserName = styled.h3`
  margin-left: 1rem;
`

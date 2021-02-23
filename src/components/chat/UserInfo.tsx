import React from 'react'
import firebase from 'firebase/app'
import styled, { css } from 'styled-components'
import UserMenu from './UserMenu'

function UserInfo({ userDoc }: firebase.firestore.DocumentData) {
  console.log(userDoc)
  return (
    <Container border>
      <Container>
        <ProfilePicture src={`${userDoc.photoURL}`} alt="profile" />

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
      position: relative;
      align-items: center;
      padding-bottom: 0.5rem;
      border-bottom: 2px solid rgba(51, 49, 54, 0.1);
    `}
`

const ProfilePicture = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 100px;
`

const UserName = styled.h3`
  margin-left: 1rem;
`

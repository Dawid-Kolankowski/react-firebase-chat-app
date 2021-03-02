import React from 'react'
import styled, { css } from 'styled-components'

const Message = ({
  message,
  user,
  side,
}: {
  message: string
  user: any
  side: boolean
}) => {
  console.log(user)
  return (
    <Container>
      <MessageContainer side={side}>{message}</MessageContainer>
      <ProfilePicture side={side} src={user.photoURL} alt="profile" />
    </Container>
  )
}

export default Message

const Container = styled.div`
  margin-bottom: 0.5rem;
  display: flex;
`
const MessageContainer = styled('div')<{ side: boolean }>`
  display: inline-block;
  padding: 0.5rem;
  border-radius: 0.5rem;
  color: #333136;
  background-color: #ceeaf7;
  max-width: 80%;
  overflow-wrap: break-word;
  ${(props) =>
    props.side &&
    css`
      margin-left: auto;
      background-color: #1789fc;
      color: white;
    `};
`
const ProfilePicture = styled('img')<{ side: boolean }>`
  width: 35px;
  height: 35px;
  border-radius: 0.5rem;

  ${(props) =>
    props.side === false &&
    css`
      order: -1;
      margin-right: 0.3rem;
    `};

  ${(props) =>
    props.side &&
    css`
      order: 1;
      margin-left: 0.3rem;
    `};
`

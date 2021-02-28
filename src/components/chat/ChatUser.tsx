import React, { useEffect, useState, useContext } from 'react'
import firebase from 'firebase/app'
import styled, { css } from 'styled-components'
import { firestore } from '../../firebase/firebase'
import { ChatContext } from '../../providers/ChatProvider'

interface IChat {
  chatId: string
  friendId: string
}

const ChatUser = ({ chatInfo }: { chatInfo: IChat }) => {
  const [friend, setFriend] = useState<firebase.firestore.DocumentData>()

  useEffect(() => {
    const unsubscribe = firestore
      .collection('users')
      .doc(chatInfo.friendId)
      .onSnapshot((doc) => {
        setFriend(doc.data())
      })
    return () => unsubscribe()
  }, [chatInfo.friendId])

  const { setSelectedChat } = useContext(ChatContext)

  return friend ? (
    <Container onClick={() => setSelectedChat(chatInfo)}>
      <ProfilePicture src={friend.photoURL} alt="profile" />
      <UserDetails>
        <h3>
          {friend.displayName}
          <br />
          {friend.status ? (
            <>
              <StatusIcon active /> online
            </>
          ) : (
            <>
              <StatusIcon /> offline
            </>
          )}
        </h3>
      </UserDetails>
    </Container>
  ) : null
}

export default ChatUser

const Container = styled('div')<{ border?: boolean }>`
  display: flex;
  padding: 1rem;
  background-color: #ceeaf7;
  border-radius: 0.5rem;
  position: relative;
  align-items: center;
  user-select: none;
  margin-bottom: 0.5rem;
  :hover {
    cursor: pointer;
    opacity: 0.8;
  }
`

const ProfilePicture = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 0.5rem;
`
const UserDetails = styled.div`
  margin-left: 1rem;
`
const StatusIcon = styled('div')<{ active?: boolean }>`
  display: inline-block;
  border-radius: 100px;
  width: 10px;
  height: 10px;
  background-color: red;
  ${(props) =>
    props?.active &&
    css`
      background-color: #13cc13;
    `}
`

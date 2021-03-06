import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Close } from '@styled-icons/zondicons'
import { toast } from 'react-toastify'
import useHideOnLostFocus from '../../hooks/useHideOnLostFocus'
import { firestore } from '../../firebase/firebase'
import { useAuth } from '../../providers/AuthProvider'
import UserTile from './UserTile'
import { getIdsAndDocs } from '../../utils'
import { IUser, IChat, IAddFriends } from '../../types'

const AddFriendsMenu: React.FC<IAddFriends> = ({ switchFriendsMenu }) => {
  const friendsMenuHideRef = useHideOnLostFocus(switchFriendsMenu)
  const [usersList, setUsersList] = useState<any>([])
  const [searchTerm, setSearchTerm] = useState('')
  const { user } = useAuth()

  async function searchUsers() {
    if (!searchTerm) {
      return
    }

    const usersRef = firestore.collection('users')
    const users: IUser[] = await usersRef
      .orderBy('displayName')
      .startAt(searchTerm)
      .endAt(`${searchTerm}~`)
      .limit(5)
      .get()
      .then((snapshot) => snapshot.docs.map(getIdsAndDocs))

    const sendRequests = await usersRef
      .doc(user!.uid)
      .collection('sendRequests')
      .get()
      .then((snapshot) => snapshot.docs.map(getIdsAndDocs))

    const recivedRequests = await usersRef
      .doc(user!.uid)
      .collection('pendingRequests')
      .get()
      .then((snapshot) => snapshot.docs.map(getIdsAndDocs))

    const friends: IChat[] = await usersRef
      .doc(user!.uid)
      .collection('friends')
      .get()
      .then((snapshot) => snapshot.docs.map(getIdsAndDocs))

    const filteredUsers = filterUsers(
      users,
      sendRequests,
      recivedRequests,
      friends,
    )

    setUsersList(filteredUsers)
  }

  const filterUsers = (
    users: IUser[],
    sendRequests: any,
    recivedRequests: any,
    friends: IChat[],
  ) => {
    const filteredUsers = users.filter((element) => {
      if (element.id === user!.uid) {
        return false
      }

      for (let i = 0; i < sendRequests.length; i += 1) {
        if (sendRequests[i].id === element.id) {
          return false
        }
      }
      for (let i = 0; i < recivedRequests.length; i += 1) {
        if (recivedRequests[i].id === element.id) {
          return false
        }
      }
      for (let i = 0; i < friends.length; i += 1) {
        if (friends[i].friendId === element.id) {
          return false
        }
      }

      return true
    })
    return filteredUsers
  }

  useEffect(() => {
    searchUsers()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm])

  const sendFriendRequest = (id: string) => {
    firestore
      .collection('users')
      .doc(id)
      .collection('pendingRequests')
      .doc(user!.uid)
      .set({ sender: user!.uid })

    firestore
      .collection('users')
      .doc(user!.uid)
      .collection('sendRequests')
      .doc(id)
      .set({ reciver: id })
      .then(() => toast.success('Request sent!'))

    setSearchTerm('')
    setUsersList([])
  }

  return (
    <Menu ref={friendsMenuHideRef}>
      <Container>
        {' '}
        <Input
          value={searchTerm}
          placeholder="Search"
          onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
        />
        <Button onClick={switchFriendsMenu}>
          <CloseIcon />
        </Button>
      </Container>
      <UserContainer>
        {usersList &&
          usersList.map((item: any) => (
            // eslint-disable-next-line react/jsx-indent
            <UserTile
              key={item.id}
              onClick={sendFriendRequest}
              userDoc={item}
            />
          ))}
      </UserContainer>
    </Menu>
  )
}

export default AddFriendsMenu

const UserContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-height: 400px;
`

const Input = styled.input`
  border: none;
  font-size: 1.2rem;
  padding: 10px;
  width: 80%;
  background-color: #ceeaf7;
  border-radius: 0.5rem;

  :focus {
    outline: none;
  }
  ::placeholder {
    opacity: 0.5;
  }
`

const Menu = styled.div`
  width: 100%;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 0;
  right: 0;
  color: white;
  background-color: #1789fc;
  border-radius: 0.5rem;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
  z-index: 1000;
`

const CloseIcon = styled(Close)`
  height: 30px;
  color: white;
`
const Button = styled.button`
  /* margin-left: auto; */
  background: transparent;
  border: none;
  outline: none;

  :hover {
    cursor: pointer;
  }
`

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
`

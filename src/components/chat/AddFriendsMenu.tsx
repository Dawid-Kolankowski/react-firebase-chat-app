/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Close, AddOutline } from '@styled-icons/zondicons'
import { toast } from 'react-toastify'
import useHideOnLostFocus from '../../hooks/useHideOnLostFocus'
import { firestore } from '../../firebase/firebase'
import { useAuth } from '../../providers/AuthProvider'

interface IAddFriends {
  switchFriendsMenu: () => void
}

const AddFriendsMenu: React.FC<IAddFriends> = ({ switchFriendsMenu }) => {
  const friendsMenuHideRef = useHideOnLostFocus(switchFriendsMenu)
  const [usersList, setUsersList] = useState<any>([])
  const [searchTerm, setSearchTerm] = useState('')
  const { user } = useAuth()

  useEffect(() => {
    async function searchUsers() {
      if (!searchTerm) return
      const users = await firestore
        .collection('users')
        .orderBy('displayName')
        .startAt(searchTerm)
        .endAt(`${searchTerm}~`)
        .limit(10)
        .get()
        .then((snapshot) =>
          snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          })),
        )
      const filteredUsers = users.filter((el) => el.id !== user!.uid)
      setUsersList(filteredUsers)
    }
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
      .then(() => toast.success('Request sent!'))
  }

  return (
    <Menu ref={friendsMenuHideRef}>
      <Container>
        {' '}
        <Input
          placeholder="Search"
          onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
        />
        <Button onClick={switchFriendsMenu}>
          <CloseIcon />
        </Button>
      </Container>
      <UserContainer>
        {usersList
          ? usersList.map((item: any) => (
              // eslint-disable-next-line react/jsx-indent
              <User key={item.id} onClick={sendFriendRequest} userDoc={item} />
            ))
          : null}
      </UserContainer>
    </Menu>
  )
}

export default AddFriendsMenu
interface IUser {
  onClick: (id: string) => void
  userDoc: any
}

const User: React.FC<IUser> = ({ onClick, userDoc }) => {
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

const UserContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-height: 400px;
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

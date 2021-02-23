import React, { useEffect, useState } from 'react'
import styled, { css } from 'styled-components'
import { Close } from '@styled-icons/zondicons'
import useHideOnLostFocus from '../../hooks/useHideOnLostFocus'
import { firestore } from '../../firebase/firebase'

interface IAddFriends {
  switchFriendsMenu: () => void
}

const AddFriends: React.FC<IAddFriends> = ({ switchFriendsMenu }) => {
  const friendsMenuHideRef = useHideOnLostFocus(switchFriendsMenu)
  const [usersList, setUsersList] = useState<any>([])
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    async function getAllUsers() {
      if (searchTerm === '') return
      const users = await firestore
        .collection('users')
        .orderBy('displayName')
        .startAt(searchTerm)
        .endAt(`${searchTerm}~`)
        .get()
        .then((snapshot) =>
          snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          })),
        )
      setUsersList(users)
    }
    getAllUsers()
  }, [searchTerm])

  console.log(searchTerm)

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
    </Menu>
  )
}

export default AddFriends

export const Input = styled.input`
  border: none;
  font-size: 1.2rem;
  padding: 10px;

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
  border-radius: 1rem;
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
`

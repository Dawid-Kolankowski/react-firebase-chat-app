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

  useEffect(() => {
    async function getAllUsers() {
      const users = await firestore
        .collection('users')
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
  }, [])

  return (
    <Menu ref={friendsMenuHideRef}>
      {' '}
      <Button onClick={switchFriendsMenu}>
        <CloseIcon />
      </Button>
    </Menu>
  )
}

export default AddFriends

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
  height: 25px;
  color: white;
`
const Button = styled.button`
  margin-left: auto;
  background: transparent;
  border: none;
  outline: none;

  :hover {
    cursor: pointer;
  }
`

import React from 'react'
import styled, { css } from 'styled-components'
import { Close, ArrowRight, UserAdd } from '@styled-icons/zondicons'
import { auth } from '../../firebase/firebase'
import useHideOnLostFocus from '../../hooks/useHideOnLostFocus'
import { useAuth } from '../../providers/AuthProvider'
import { setOfflineOnClose } from '../../firebase/firebaseUser'

interface IDropdown {
  switchMenu: () => void
  switchFriendsMenu: () => void
}

const DropdownMenu: React.FC<IDropdown> = ({
  switchMenu,
  switchFriendsMenu,
}) => {
  const menuHideRef = useHideOnLostFocus(switchMenu)
  const { user } = useAuth()

  const logOut = async () => {
    setOfflineOnClose(user!.uid)
    auth.signOut()
  }

  return (
    <Menu ref={menuHideRef}>
      <Button style={{ marginLeft: 'auto' }} onClick={switchMenu}>
        <CloseIcon />
      </Button>
      <MenuItem
        onClick={() => {
          switchMenu()
          switchFriendsMenu()
        }}
      >
        Add Friend <AddFriend />
      </MenuItem>
      <MenuItem onClick={logOut}>
        LogOut <LogOut />
      </MenuItem>
    </Menu>
  )
}

export default DropdownMenu

const Button = styled.button`
  background: transparent;
  border: none;
  outline: none;
  :hover {
    cursor: pointer;
  }
`

const Menu = styled.div`
  width: 250px;
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
const Icons = css`
  height: 25px;
  color: white;
`

const CloseIcon = styled(Close)`
  height: 25px;
  color: white;
`
const LogOut = styled(ArrowRight)`
  ${Icons}
`
const AddFriend = styled(UserAdd)`
  ${Icons}
`
const MenuItem = styled.div`
  font-size: 1.3rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem;
  margin-top: 1rem;
  :hover {
    cursor: pointer;
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 0.5rem;
  }
`

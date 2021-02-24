import React, { useState } from 'react'
import styled from 'styled-components'
import { DotsHorizontalTriple } from '@styled-icons/zondicons'
import DropdownMenu from './DropdownMenu'
import AddFriendsMenu from './AddFriendsMenu'

const UserMenu = () => {
  const [menuState, setMenuState] = useState<boolean>(false)
  const [friendState, setFriendState] = useState<boolean>(false)

  const switchMenu = () => {
    setMenuState(!menuState)
  }
  const switchFriendsMenu = () => {
    setFriendState(!friendState)
  }

  return (
    <>
      <Button onClick={switchMenu}>
        <ButtonIcon />
      </Button>
      {menuState ? (
        <DropdownMenu
          switchMenu={switchMenu}
          switchFriendsMenu={switchFriendsMenu}
        />
      ) : null}
      {friendState ? (
        <AddFriendsMenu switchFriendsMenu={switchFriendsMenu} />
      ) : null}
    </>
  )
}

export default UserMenu
const ButtonIcon = styled(DotsHorizontalTriple)`
  width: 30px;
  height: 30px;
  color: #333136;
`
const Button = styled.button`
  background: transparent;
  border: none;
  outline: none;
  :hover {
    cursor: pointer;
  }
`

import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import {
  DotsHorizontalTriple,
  Close,
  ArrowRight,
} from '@styled-icons/zondicons'
import { auth } from '../../firebase/firebase'
import DropdownMenu from './DropdownMenu'

const UserMenu = () => {
  const [menuState, setMenuState] = useState<boolean>(false)

  const switchMenu = () => {
    setMenuState(!menuState)
  }

  return (
    <>
      <Button onClick={switchMenu}>
        <ButtonIcon />
      </Button>
      {menuState ? <DropdownMenu switchMenu={() => switchMenu()} /> : null}
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
  border-radius: 1rem;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
`
const CloseIcon = styled(Close)`
  height: 25px;
  color: white;
`
const LogOut = styled(ArrowRight)`
  height: 25px;
  color: white;
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

// import React, { useEffect, useRef, useState } from 'react'
// import styled from 'styled-components'
// import {
//   DotsHorizontalTriple,
//   Close,
//   ArrowRight,
// } from '@styled-icons/zondicons'
// import { auth } from '../../firebase/firebase'

// const UserMenu = () => {
//   const [menuState, setMenuState] = useState<boolean>(false)

//   const switchMenu = () => {
//     setMenuState(!menuState)
//   }

//   const menu = useRef<HTMLDivElement>(null)

//   const handleClick = (e: any) => {
//     if (menu && menu.current && menu.current.contains(e.target)) {
//       console.log('click')
//       return
//     }
//     console.log('click')
//     setMenuState(false)
//   }

//   useEffect(() => {
//     document.addEventListener('mousedown', handleClick)

//     return () => {
//       document.removeEventListener('mousedown', handleClick)
//     }
//   }, [])

//   return (
//     <>
//       <Button onClick={switchMenu}>
//         <ButtonIcon />
//       </Button>
//       {menuState ? (
//         <Menu ref={menu}>
//           <Button style={{ marginLeft: 'auto' }} onClick={switchMenu}>
//             <CloseIcon />
//           </Button>

//           <MenuItem onClick={() => auth.signOut()}>
//             LogOut <LogOut />
//           </MenuItem>
//         </Menu>
//       ) : null}
//     </>
//   )
// }

// export default UserMenu
// const ButtonIcon = styled(DotsHorizontalTriple)`
//   width: 30px;
//   height: 30px;
//   color: #333136;
// `
// const Button = styled.button`
//   background: transparent;
//   border: none;
//   outline: none;
//   :hover {
//     cursor: pointer;
//   }
// `

// const Menu = styled.div`
//   width: 250px;
//   padding: 1rem;
//   display: flex;
//   flex-direction: column;
//   position: absolute;
//   top: 0;
//   right: 0;
//   color: white;
//   background-color: #1789fc;
//   border-radius: 1rem;
//   box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
// `
// const CloseIcon = styled(Close)`
//   height: 25px;
//   color: white;
// `
// const LogOut = styled(ArrowRight)`
//   height: 25px;
//   color: white;
// `
// const MenuItem = styled.div`
//   font-size: 1.3rem;
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
//   padding: 0.5rem;
//   margin-top: 1rem;
//   :hover {
//     cursor: pointer;
//     background-color: rgba(255, 255, 255, 0.1);
//     border-radius: 0.5rem;
//   }
// `

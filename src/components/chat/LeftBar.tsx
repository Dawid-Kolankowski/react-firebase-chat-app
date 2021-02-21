import React from 'react'
import styled from 'styled-components'
import UserInfo from './UserInfo'

const LeftBar = () => {
  return (
    <Container>
      <UserInfo />
    </Container>
  )
}

export default LeftBar

const Container = styled.div`
  min-width: 280px;
  max-width: 360px;
  flex-basis: auto;
  flex-grow: 1;
  background-color: white;
  height: 90%;
  border-radius: 1rem 0 0 1rem;
  padding: 1rem;
`

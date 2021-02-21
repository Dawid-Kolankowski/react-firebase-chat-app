import React from 'react'
import styled, { keyframes } from 'styled-components'

const spin = keyframes`
 0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
`

const SpinnerStyled = styled.div`
  border: 16px solid #f3f3f3;
  border-top: 16px solid #3498db;
  border-radius: 50%;
  width: 120px;
  height: 120px;
  animation: ${spin} 2s linear infinite;
  margin-bottom: 2rem;
`
const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`
const Header = styled.h1`
  color: white;
  font-size: 3rem;
`
function Spinner() {
  return (
    <Container>
      <SpinnerStyled />
      <Header>Loading</Header>
    </Container>
  )
}

export default Spinner

import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const Form = styled.form`
  width: 90%;
  max-width: 550px;
  padding: 3rem;
  background: white;
  border-radius: 1rem;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
`

export const Label = styled.label`
  display: flex;
  flex-direction: column;
  font-size: 1.3rem;
  font-weight: 700;
`
export const Header = styled.h1`
  text-align: center;
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 1rem;
`

export const Input = styled.input`
  border: none;
  font-size: 1.2rem;
  padding: 10px;
  margin-top: 0.5rem;
  background-color: #ceeaf7;
  border-radius: 0.5rem;
  margin-bottom: 1rem;

  :focus {
    outline: none;
  }
  ::placeholder {
    opacity: 0.5;
  }
`

export const Button = styled.button`
  background-color: #1789fc;
  font-family: 'Roboto', sans-serif;
  font-size: 1.2rem;
  border: none;
  padding: 10px;
  border-radius: 0.5rem;
  display: block;
  color: white;
  width: 100%;
  margin-bottom: 1rem;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
  :hover {
    cursor: pointer;
  }
  :disabled {
    cursor: wait;
  }
  :focus {
    outline: none;
  }
`
export const Question = styled.div`
  text-align: right;
`
export const RouterLink = styled(Link)`
  font-size: 1.2rem;
  border-bottom: none;
  color: #1789fc;
`

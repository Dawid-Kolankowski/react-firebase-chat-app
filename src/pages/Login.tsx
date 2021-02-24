import React, { useState } from 'react'
import styled, { keyframes } from 'styled-components'
import { toast } from 'react-toastify'
import { Spinner3 } from '@styled-icons/evil'
import useInput from '../hooks/useInput'
import {
  Container,
  Form,
  Header,
  Label,
  Input,
  Button,
  Question,
  RouterLink,
} from '../styles/auth'
import { StyledToastContainer } from '../styles/components'
import { provider, auth } from '../firebase/firebase'
import { useAuth } from '../providers/AuthProvider'

const Login: React.FC = () => {
  const { value: email, onChange: onChangeEmail } = useInput('')
  const { value: password, onChange: onChangePassword } = useInput('')
  const [loadingGoogle, setLoadingGoogle] = useState<boolean>(false)
  const [loadingEmail, setLoadingEmail] = useState<boolean>(false)
  const notify = (message: string) => toast.error(message)
  const { setLoading } = useAuth()

  const logInWithGoogle = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    setLoadingGoogle(true)
    setLoading(true)
    auth.signInWithPopup(provider).catch((error) => {
      notify(error.message)
      setLoading(false)
    })
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLoadingEmail(true)
    if (!password || !email) {
      setLoadingEmail(false)
      notify("Password or email can't be empty")
      return
    }

    auth.signInWithEmailAndPassword(email, password).catch((error) => {
      notify(error.message)
      setLoadingEmail(false)
    })
  }
  return (
    <Container>
      <StyledToastContainer />
      <Form onSubmit={handleSubmit}>
        <Header>Sign In</Header>
        <Label htmlFor="email">
          Email
          <Input
            value={email}
            onChange={onChangeEmail}
            className="auth__input"
            type="email"
            name="email"
            placeholder="Email"
          />
        </Label>
        <Label htmlFor="email">
          Password
          <Input
            value={password}
            onChange={onChangePassword}
            className="auth__input"
            type="password"
            name="password"
            placeholder="Password"
          />
        </Label>
        <Button type="submit">
          {' '}
          {loadingEmail ? <ButtonSpinner /> : 'Sign In'}
        </Button>

        <Button
          disabled={loadingGoogle}
          type="button"
          onClick={logInWithGoogle}
        >
          {loadingGoogle ? <ButtonSpinner /> : 'Sign in with google'}
        </Button>
        <Question>
          Don&lsquo;t have an account?{' '}
          <RouterLink to="/Register">Register</RouterLink>
        </Question>
      </Form>
    </Container>
  )
}

export default Login

const spin = keyframes`
 0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }`

const ButtonSpinner = styled(Spinner3)`
  width: 1.5rem;
  height: 1.5rem;
  animation: ${spin} 2s linear infinite;
  color: white;
`

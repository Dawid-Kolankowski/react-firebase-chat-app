import React from 'react'
import { toast } from 'react-toastify'
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

import firebaseApp, { provider } from '../firebase'

const Login: React.FC = () => {
  const { value: email, onChange: onChangeEmail } = useInput('')
  const { value: password, onChange: onChangePassword } = useInput('')
  const notify = (message: string) => toast.error(message)

  const logInWithGoogle = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    firebaseApp
      .auth()
      .signInWithPopup(provider)
      .catch((error) => {
        notify(error)
      })
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    firebaseApp
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch((error) => {
        notify(error.message)
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
        <Button type="submit">Sign In</Button>

        <Button type="button" onClick={logInWithGoogle}>
          Sign in with google
        </Button>
        <Question>
          {' '}
          Don&lsquo;t have an account?{' '}
          <RouterLink to="/Register">Register</RouterLink>
        </Question>
      </Form>
    </Container>
  )
}

export default Login

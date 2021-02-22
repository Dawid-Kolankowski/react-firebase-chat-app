import React from 'react'
import { toast } from 'react-toastify'
import { StyledToastContainer } from '../styles/components'
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

import useInput from '../hooks/useInput'
import { auth } from '../firebase/firebase'

const Register: React.FC = () => {
  const { value: email, onChange: onChangeEmail } = useInput('')
  const { value: password, onChange: onChangePassword } = useInput('')
  const {
    value: confirmPassword,
    onChange: onChangeConfirmPassword,
  } = useInput('')
  const notify = (message: string) => toast.error(message)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (confirmPassword !== password) {
      notify('Password does not match')
      return
    }
    if (!password || !confirmPassword || !email) {
      notify("Don't leave empty fields!")
      return
    }
    auth
      .createUserWithEmailAndPassword(email, password)
      .catch((error) => notify(error.message))
  }

  return (
    <Container>
      <StyledToastContainer />
      <Form onSubmit={handleSubmit}>
        <Header>Sign Up</Header>
        <Label htmlFor="email">
          Email
          <Input
            value={email}
            className="auth__input"
            type="email"
            name="email"
            placeholder="Email"
            onChange={onChangeEmail}
          />
        </Label>
        <Label htmlFor="email">
          Password
          <Input
            value={password}
            className="auth__input"
            type="password"
            name="password"
            placeholder="Password"
            onChange={onChangePassword}
          />
        </Label>
        <Label htmlFor="confirm password">
          Confirm Password
          <Input
            value={confirmPassword}
            className="auth__input"
            type="password"
            name="confirm password"
            placeholder="Password"
            onChange={onChangeConfirmPassword}
          />
        </Label>
        <Button type="submit">Sign Up</Button>

        <Question>
          Already have an account? <RouterLink to="/">Login</RouterLink>
        </Question>
      </Form>
    </Container>
  )
}

export default Register

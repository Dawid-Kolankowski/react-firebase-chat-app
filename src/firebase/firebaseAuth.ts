import { toast } from 'react-toastify'
import { provider, auth } from './firebase'

const notify = (message: string) => toast.error(message)

export const signInWithGoogle = async () =>
  auth.signInWithPopup(provider).catch((error) => {
    notify(error.message)
  })

export const signInWithEmail = async (email: string, password: string) => {
  auth.signInWithEmailAndPassword(email, password).catch((error) => {
    notify(error.message)
  })
}

export const createUser = async (email: string, password: string) => {
  auth
    .createUserWithEmailAndPassword(email, password)
    .catch((error) => notify(error.message))
}

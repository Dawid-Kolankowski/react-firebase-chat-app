import firebase from 'firebase/app'
import { firestore } from './firebase'
import { IUser } from '../types'

const DUMMY_PHOTO = 'https://picsum.photos/id/1062/200/300'

const userIsNotPresent = (user: firebase.User) => {
  return !user || !user.email
}

const createDocIfNotPresent = async (
  user: firebase.User,
  userRef: firebase.firestore.DocumentReference<firebase.firestore.DocumentData>,
) => {
  const createdAt = new Date()
  const { email } = user
  let { photoURL } = user
  const displayName = email!.substring(0, email!.lastIndexOf('@'))
  if (photoURL === null) {
    photoURL = DUMMY_PHOTO
  }

  await userRef.set({
    email,
    photoURL,
    createdAt,
    displayName,
  })
}

export const createUserProfileDoc = async (user: firebase.User) => {
  if (userIsNotPresent(user)) return

  const userRef = firestore.doc(`users/${user.uid}`)
  const snapshot = await userRef.get()
  if (!snapshot.exists) {
    await createDocIfNotPresent(user, userRef)
  }
}

export const getUserDoc = (uid: string): Promise<IUser> => {
  return firestore
    .collection('users')
    .doc(uid)
    .get()
    .then((doc) => ({ id: doc.id, ...doc.data() } as IUser))
}

export const setOfflineOnClose = (id: string) => {
  firestore.collection('users').doc(id).update({ status: false })
}

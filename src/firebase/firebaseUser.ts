import firebase from 'firebase/app'
import { firestore } from './firebase'
import { IUser } from '../types'

export const createUserProfileDoc = async (user: firebase.User) => {
  if (!user || !user.email) return

  const userRef = firestore.doc(`users/${user.uid}`)
  const snapshot = await userRef.get()
  if (!snapshot.exists) {
    const createdAt = new Date()
    const { email } = user
    let { photoURL } = user
    const displayName = email.substring(0, email.lastIndexOf('@'))
    if (photoURL === null) {
      photoURL = 'https://picsum.photos/id/1062/200/300'
    }

    await userRef.set({
      email,
      photoURL,
      createdAt,
      displayName,
    })
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

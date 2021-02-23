import firebase from 'firebase/app'
import { firestore } from './firebase'

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

export const getUserDoc = (uid: string) => {
  return firestore
    .collection('users')
    .doc(uid)
    .get()
    .then((doc) => {
      return { id: doc.id, ...doc.data() }
    })
}

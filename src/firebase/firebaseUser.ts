import firebase from 'firebase/app'
import { firestore } from './firebase'

export const createUserProfileDoc = async (user: firebase.User) => {
  if (!user || !user.email) return

  const userRef = firestore.doc(`users/${user.uid}`)
  const snapshot = await userRef.get()
  console.log(snapshot.data())
  if (!snapshot.exists) {
    const createdAt = new Date()
    const { email, photoURL } = user
    const displayName = email.substring(0, email.lastIndexOf('@'))

    await userRef.set({
      email,
      photoURL,
      createdAt,
      displayName,
    })
  }
}

export const getUserDoc = async (
  uid: string,
  cb: React.Dispatch<
    React.SetStateAction<firebase.firestore.DocumentReference<firebase.firestore.DocumentData> | null>
  >,
) => {
  if (!uid) return null
  const user = await firestore.collection('users').doc(uid)
  cb(user)
  return null
}

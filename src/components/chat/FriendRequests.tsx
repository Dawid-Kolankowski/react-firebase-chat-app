import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { toast } from 'react-toastify'
import { firestore } from '../../firebase/firebase'
import { useAuth } from '../../providers/AuthProvider'
import { getIdsAndDocs } from '../../utils'
import UserTile from './UserTile'

const FriendRequests: React.FC = () => {
  const [requestUsers, setRequestUsers] = useState<any>([])
  const [requestIds, setRequestIds] = useState<any>([])
  const { user } = useAuth()
  const userRef = firestore.collection('users')

  useEffect(() => {
    const unsubscribeFromFriendRequests = userRef
      .doc(user!.uid)
      .collection('pendingRequests')
      .onSnapshot((snapshot) => {
        const requests = snapshot.docs.map((doc) => getIdsAndDocs(doc))
        setRequestIds(requests)
      })

    return () => unsubscribeFromFriendRequests()
  }, [])

  useEffect(() => {
    async function getUsers() {
      const results = await Promise.all(
        requestIds.map(async (item: any) => {
          return userRef
            .doc(item.id)
            .get()
            .then((doc) => getIdsAndDocs(doc))
        }),
      )
      setRequestUsers(results)
    }
    getUsers()
  }, [requestIds])

  const acceptRequest = (id: string) => {
    firestore
      .collection('users')
      .doc(user!.uid)
      .collection('pendingRequests')
      .doc(id)
      .delete()

    firestore
      .collection('users')
      .doc(user!.uid)
      .collection('sendRequests')
      .doc(id)
      .delete()

    firestore
      .collection('users')
      .doc(user!.uid)
      .collection('friends')
      .doc(id)
      .set({ friendId: id })

    firestore
      .collection('users')
      .doc(id)
      .collection('friends')
      .doc(user!.uid)
      .set({ friendId: user!.uid })
      .then(() => toast.success('Friend added'))
  }

  return (
    <>
      <Header>Friend Requests</Header>
      {requestUsers
        ? requestUsers.map((item: any) => (
            // eslint-disable-next-line react/jsx-indent
            <UserTile key={item.id} onClick={acceptRequest} userDoc={item} />
          ))
        : null}
    </>
  )
}

export default FriendRequests

const Header = styled.h2`
  margin-bottom: 1rem;
`

import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { toast } from 'react-toastify'
import { firestore } from '../../firebase/firebase'
import { useAuth } from '../../providers/AuthProvider'
import { getIdsAndDocs } from '../../utils'
import UserTile from './UserTile'
import { ScrollStyling } from '../../styles/components'
import { IUser } from '../../types'

const FriendRequests: React.FC = () => {
  const [requestUsers, setRequestUsers] = useState<IUser[]>([])
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    async function getUsers() {
      const results = await Promise.all(
        requestIds.map(
          async (item: any): Promise<IUser> => {
            return userRef
              .doc(item.id)
              .get()
              .then((doc) => getIdsAndDocs(doc))
          },
        ),
      )
      setRequestUsers(results as IUser[])
    }
    getUsers()
  }, [requestIds])

  const acceptRequest = async (id: string) => {
    const chatRef: any = await firestore.collection('chat').doc()
    chatRef.set({ users: [id, user!.uid] })

    userRef.doc(user!.uid).collection('pendingRequests').doc(id).delete()

    userRef.doc(user!.uid).collection('sendRequests').doc(id).delete()

    userRef
      .doc(user!.uid)
      .collection('friends')
      .doc(id)
      .set({ friendId: id, chatId: chatRef.id })

    userRef
      .doc(id)
      .collection('friends')
      .doc(user!.uid)
      .set({ friendId: user!.uid, chatId: chatRef.id })
      .then(() => toast.success('Friend added'))
  }

  return (
    <>
      {requestUsers.length ? (
        <>
          <Header>Friend Requests</Header>
          <Container>
            {requestUsers.map((item: any) => (
              <UserTile key={item.id} onClick={acceptRequest} userDoc={item} />
            ))}
          </Container>
        </>
      ) : null}
    </>
  )
}

export default FriendRequests

const Header = styled.h2`
  margin-bottom: 1rem;
`

const Container = styled.div`
  height: 85%;
  overflow-y: scroll;
  overflow-x: hidden;
  ${ScrollStyling}
`

import React, { useEffect, useState, useRef } from 'react'
import styled from 'styled-components'
import firebase from 'firebase/app'
import { ScrollStyling } from '../../styles/components'
import { firestore } from '../../firebase/firebase'
import Message from './Message'
import { IChatBox, IMessage } from '../../types'

const ChatBox: React.FC<IChatBox> = ({
  selectedChatId,
  currentUser,
  friend,
}) => {
  const [messages, setMessages] = useState<IMessage[]>([])

  useEffect(() => {
    const unsubscribe = firestore
      .collection('chat')
      .doc(selectedChatId)
      .collection('messages')
      .orderBy('date', 'desc')
      .onSnapshot((doc) => {
        const docs = doc.docs.map((item) => item.data() as IMessage)
        setMessages(docs.reverse())
      })

    return unsubscribe
  }, [selectedChatId])

  return (
    <Container>
      <SpacerDiv />
      {messages.map((doc: firebase.firestore.DocumentData) => {
        if (doc.sender === currentUser.id) {
          return (
            <Message
              key={doc.date}
              message={doc.message}
              user={currentUser}
              side
            />
          )
        }
        return (
          <Message
            key={doc.date}
            message={doc.message}
            user={friend}
            side={false}
          />
        )
      })}
      <AlwaysScrollToBottom />
    </Container>
  )
}

export default ChatBox

const AlwaysScrollToBottom = () => {
  const elementRef = useRef<any>()
  useEffect(() => elementRef.current.scrollIntoView())
  return <div ref={elementRef} />
}

const Container = styled.div`
  padding: 0 0.5rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: auto;
  scroll-behavior: smooth;
  ${ScrollStyling}
`

const SpacerDiv = styled.div`
  margin-top: auto;
`

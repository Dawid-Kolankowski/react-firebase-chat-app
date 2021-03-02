/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { ScTelegram } from '@styled-icons/evil'
import useInput from '../../hooks/useInput'
import EmojiMenu from './EmojiMenu'
import { firestore } from '../../firebase/firebase'

const ChatInput = ({
  chatId,
  currentUser,
}: {
  chatId: string
  currentUser: any
}) => {
  const {
    value: inputValue,
    setValue: setInputValue,
    onChange: onInputChange,
  } = useInput('')

  useEffect(() => {
    setInputValue('')
  }, [chatId])

  const sendMessage = () => {
    if (!inputValue) {
      return
    }
    firestore
      .collection('chat')
      .doc(chatId)
      .collection('messages')
      .doc()
      .set({ message: inputValue, sender: currentUser.id, date: new Date() })
      .then(() => setInputValue(''))
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      sendMessage()
    }
  }

  return (
    <Container>
      <InputContainer onKeyDown={handleKeyDown}>
        <Input
          value={inputValue}
          onChange={onInputChange}
          placeholder="Message"
        />
        <EmojiMenu
          setInputValue={(input: string) => setInputValue(inputValue + input)}
        />
      </InputContainer>
      <SendIcon onClick={sendMessage} />
    </Container>
  )
}

export default ChatInput

const Container = styled.div`
  padding: 0.5rem;
  border-top: 1px solid rgba(51, 49, 54, 0.1);
  display: flex;
`

const InputContainer = styled.div`
  background-color: #ceeaf7;
  flex: 1;
  border-radius: 0.3rem;
  padding: 0.5rem;
  position: relative;
  display: flex;
`
const Input = styled.input`
  background-color: transparent;
  border: none;
  outline: none;
  font-size: 1.2rem;
  color: #333136;
  flex: 1;
`

const SendIcon = styled(ScTelegram)`
  width: 50px;
  height: 50px;
  color: #5d5a62;
  :hover {
    cursor: pointer;
  }
`

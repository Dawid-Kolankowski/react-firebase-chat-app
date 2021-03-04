import React, { useState, createContext } from 'react'
import { IChatProvider, IChat } from '../types'

export const ChatContext = createContext<IChatProvider>({} as IChatProvider)

const ChatProvider: React.FC = ({ children }) => {
  const [selectedChat, setSelectedChat] = useState<IChat>({
    chatId: '',
    friendId: '',
  })

  return (
    <ChatContext.Provider value={{ selectedChat, setSelectedChat }}>
      {children}
    </ChatContext.Provider>
  )
}

export default ChatProvider

import React, { useState, createContext } from 'react'

interface IChatProvider {
  selectedChat: string
  setSelectedChat: React.Dispatch<React.SetStateAction<string>>
}

export const ChatContext = createContext<IChatProvider>({} as IChatProvider)

const ChatProvider: React.FC = ({ children }) => {
  const [selectedChat, setSelectedChat] = useState<string>('')

  return (
    <ChatContext.Provider value={{ selectedChat, setSelectedChat }}>
      {children}
    </ChatContext.Provider>
  )
}

export default ChatProvider

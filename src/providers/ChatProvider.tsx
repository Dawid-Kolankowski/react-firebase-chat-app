import React, { useState, createContext } from 'react'

interface IChat {
  chatId: string
  friendId: string
}

interface IChatProvider {
  selectedChat: IChat
  setSelectedChat: React.Dispatch<React.SetStateAction<IChat>>
}

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

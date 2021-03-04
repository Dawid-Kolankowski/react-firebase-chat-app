import firebase from 'firebase/app'

export interface IUser {
  id: string
  email: string
  displayName: string
  photoURL: string
  status: boolean
  createdAt: Date
}

export interface IChat {
  chatId: string
  friendId: string
}

export interface IChatProvider {
  selectedChat: IChat
  setSelectedChat: React.Dispatch<React.SetStateAction<IChat>>
}

export interface IAddFriends {
  switchFriendsMenu: () => void
}

export interface IChatBox {
  selectedChatId: string
  currentUser: IUser
  friend: IUser
}

export interface IMessage {
  date: Date
  message: string
  sender: string
}

export interface IMessageDisplay {
  message: string
  user: IUser
  side: boolean
}
export interface IChatInput {
  chatId: string
  currentUser: IUser
}

export interface IDropdown {
  switchMenu: () => void
  switchFriendsMenu: () => void
}

export interface IAuthProvider {
  user: firebase.User | null
  loading: boolean
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
}

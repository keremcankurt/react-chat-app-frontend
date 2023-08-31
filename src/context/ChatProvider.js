import { createContext, useContext, useState } from 'react'

const ChatContext = createContext()

const ChatProvider = ({children}) => {
    const [user, setUser] = useState()
    const [selectedChat, setSelectedChat] = useState()
    const [chats, setChats] = useState([])
    const [notification, setNotification] = useState([])
    return (
        <ChatContext.Provider 
        value={
            {
                user,
                chats,
                setUser,
                setChats,
                selectedChat, 
                notification,
                setNotification,
                setSelectedChat,
            }
        }>
            {children}
        </ChatContext.Provider>
    )
}
export const ChatState = () => {
    return useContext(ChatContext)
} 

export default ChatProvider
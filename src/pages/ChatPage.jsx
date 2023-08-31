import React, { useEffect, useState } from 'react'
import { ChatState } from '../context/ChatProvider'
import { Box } from '@chakra-ui/react'
import SideDrawer from '../components/misc/SideDrawer'
import MyChats from '../components/MyChats'
import ChatBox from '../components/ChatBox'
import { useNavigate } from 'react-router-dom'
 export default function ChatPage() {

  const { user, setUser, setSelectedChat} = ChatState()
  const navigate = useNavigate()
  const [fetchAgain, setFetchAgain] = useState(false);
    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'))
        setUser(userInfo)
        setSelectedChat(null)
        if(!userInfo) {
            navigate('/')
        }
    },[navigate, setUser, user, setSelectedChat])
  
  return (
    <div style={{width: '100%'}}>
      {user && <SideDrawer/>}
      <Box
        display='flex'
        justifyContent='space-between'
        w='100%'
        h='91.5%'
        p='10px'
      >
        {user && <MyChats fetchAgain={fetchAgain} />}
        {user && (
          <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        )}
      </Box>
    </div>
  )
}

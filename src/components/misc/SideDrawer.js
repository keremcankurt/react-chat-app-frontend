import { Avatar, Box, Button, Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay, Input, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Spinner, Text, Tooltip, useDisclosure, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import { FaSearch } from 'react-icons/fa';
import { BellIcon, ChevronDownIcon } from '@chakra-ui/icons'
import { ChatState } from '../../context/ChatProvider';
import ProfileModal from './ProfileModal';
import axios from 'axios';
import ChatLoading from '../ChatLoading';
import UserListItem from '../UserAvatar/UserListItem';
import { getSender } from '../../config/ChatLogics';
import { Effect } from 'react-notification-badge'
import NotificationBadge from "react-notification-badge";
export default function SideDrawer() {
  const [search, setSearch] = useState('')
  const [searchResult, setSearchResult] = useState([])
  const [loading, setLoading] = useState(false)
  const [loadingChat, setLoadingChat] = useState()
  
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { user, setUser, setSelectedChat, chats, setChats, notification, setNotification } = ChatState()

  const toast = useToast()
  const logoutHandler = () => {
    localStorage.removeItem('userInfo')
    setUser(null)

  }

  const handleSearch = async() => {
    if(!search) {
      toast({
        title: 'Please Enter something in search',
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position: 'top-left'
      })
      return;
    }
    
    try {
      setLoading(true)
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      }

      const { data } = await axios.get(`/api/user?search=${search}`, config)

      setLoading(false)
      setSearchResult(data)

    } catch (error) {
      setLoading(false)
      toast({
        title: 'Error Occured!',
        description: 'Failed to Load the Search Results',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'bottom-left'
      })
      
    }
  }

  const accessChat = async(id) => {
    try {
      setLoadingChat(true)
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`
        }
      }
      const { data } = await axios.post('api/chat', {id}, config)
      if(!chats.find((c) => c._id === data._id)) setChats([data, ...chats])
      setLoadingChat(false)
      setSelectedChat(data)
      onClose()
    } catch (error) {
      setLoadingChat(false)
      toast({
        title: 'Error fetching the chat!',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'bottom-left'
      })
    }
  }
  return (
    <>
      <Box
        display='flex'
        justifyContent='space-between'
        alignItems='center'
        bg='white'
        w='100%'
        p='5px 10px 5px 10px'
        borderWidth='5px'
      >
        <Tooltip label='Search Users to Chat' hasArrow placement='bottom-end'>
          <Button variant='ghost' onClick={onOpen}>
            <FaSearch size={15} />
            <Text display={{base: 'none', md: 'flex'}} px='5px'>Search Users</Text>
          </Button>
        </Tooltip>
        <Text fontSize='2xl'>Chat-App</Text>
        <div>
          <Menu>
            <MenuButton p={1}>
              <NotificationBadge
                count={notification.length}
                effect={Effect.SCALE}
              />
              <BellIcon fontSize='2xl' m={1}/>
            </MenuButton>
            <MenuList pl={2}>
              {!notification.length && 'No New Messages'}
              {notification.map(n => (
                <MenuItem key={n._id} onClick={() => {
                  setSelectedChat(n.chat)
                  setNotification(notification.filter((_n) => _n !== n)) 
                }}>
                  {n.chat.isGroupChat ? `New Message in ${n.chat.chatName}` : `New Message from ${getSender(user, n.chat.users)}`}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon/>}>
              <Avatar size='sm' cursor='pointer' name={user.name} src={`${process.env.REACT_APP_API_BASE_URL}/images/${user?.pic}`} />
            </MenuButton>
            <MenuList>
              <ProfileModal user={user}>
                <MenuItem>My Profile</MenuItem>
              </ProfileModal>
              <MenuDivider/>
              <MenuItem onClick={logoutHandler}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </div>
      </Box>
      <Drawer placement='left' onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth='1px'>Search Users</DrawerHeader>
          <DrawerBody>
            <Box display='flex' pb={2}>
              <Input
                placeholder='Search by name or email'
                mr={2}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button onClick={handleSearch}>Go</Button>
            </Box>
            {loading ? (
              <ChatLoading/>
            ):(
              searchResult?.map(_user => (
                <UserListItem 
                  key={_user._id}
                  user={_user}
                  handleFunction={() => accessChat(_user._id)}

                />
              ))
            )}
            {loadingChat && <Spinner ml='auto' display='flex'/>}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  )
}

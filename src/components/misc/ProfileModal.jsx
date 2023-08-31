import { ViewIcon } from '@chakra-ui/icons'
import { Avatar, Button, IconButton, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure } from '@chakra-ui/react'
import React from 'react'

export default function ProfileModal({ user, children }) {
    const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
        {
            children ? <span onClick={onOpen}>{children}</span>
            : 
            <IconButton
                display={{base: 'flex'}}
                icon={<ViewIcon/>}
                onClick={onOpen}
            />
        }
        <Modal size='lg' isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent >
          <ModalHeader
            fontSize='25px'
            display='flex'
            justifyContent='center'
          >
            {user?.name}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody
            display='flex'
            flexDirection='column'
            alignItems='center'
            justifyContent='space-between'
            gap={5}
          >
            <Avatar size='2xl' cursor='pointer' name={user.name} src={`${process.env.REACT_APP_API_BASE_URL}/images/${user?.pic}`} />
            <Text fontSize={{base: '15px', md: '20px'}}>Email: {user?.email}</Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

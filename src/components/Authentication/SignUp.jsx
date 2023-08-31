import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
export default function SignUp() {
    const [show, setShow] = useState(false)
    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [confirmpassword, setConfirmpassword] = useState()
    const [password, setPassword] = useState()
    const [pic, setPic] = useState()
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    const toast = useToast()

    const postDetails = (_pic) => {
        if(!(_pic.type === 'image/jpeg' || _pic.type === 'image/png')) {
            setPic(null)
            toast({
                title: 'Please Select an Image',
                status: 'warning',
                duration: 3000,
                isClosable: true,
                position: 'bottom'
            })
        }else {
            setPic(_pic)
        }

    }

    const submitHandler = async() => {
        setLoading(true)
        if(!name ||!email || !password || !confirmpassword){
            toast({
                title: 'Please Fill al the Fields',
                status: 'error',
                duration: 3000,
                isClosable: true,
                position: 'bottom'
            })
            setLoading(false)
            return;
        }
        try {

            const formData = new FormData()
            pic &&  formData.append('profile_image', pic);
            const user = {
                name, email, password
            }

            formData.append('user', JSON.stringify(user))
            const { data } = await axios.post('/api/user',formData)
            toast({
                title: 'Registration successful',
                status: 'success',
                duration: 3000,
                isClosable: true,
                position: 'bottom'
            })

            localStorage.setItem('userInfo', JSON.stringify(data))
            setLoading(false)
            navigate('/chats')
        } catch (error) {
            setLoading(false)
            toast({
                title: 'Error Occured',
                description: error.response.data.message,
                status: 'error',
                duration: 3000,
                isClosable: true,
                position: 'bottom'
            })
        }
    }
  return (
    <VStack spacing='5px' color='black'>
        <FormControl id='first-name' isRequired>
            <FormLabel>Name</FormLabel>
            <Input
                placeholder='Enter Your Name'
                onChange={(e) => setName(e.target.value)}
            />
        </FormControl>
        <FormControl isRequired>
            <FormLabel>Email</FormLabel>
            <Input
                placeholder='Enter Your Email'
                onChange={(e) => setEmail(e.target.value)}
            />
        </FormControl>
        <FormControl isRequired>
            <FormLabel>Confirm Password</FormLabel>
            <InputGroup>
                <Input
                    type={show ? 'text' : 'password'}
                    placeholder='Confirm Password'
                    onChange={(e) => setConfirmpassword(e.target.value)}
                />
                <InputRightElement width='4.5rem'>
                    <Button h='1.75rem' size='sm' onClick={() => setShow(!show)}>{show ? 'Hide' : 'Show'}</Button>
                </InputRightElement>
            </InputGroup>
        </FormControl>
        <FormControl isRequired>
            <FormLabel>Password</FormLabel>
            <InputGroup>
                <Input
                    type={show ? 'text' : 'password'}
                    placeholder='Password'
                    onChange={(e) => setPassword(e.target.value)}
                />
                <InputRightElement width='4.5rem'>
                    <Button h='1.75rem' size='sm' onClick={() => setShow(!show)}>{show ? 'Hide' : 'Show'}</Button>
                </InputRightElement>
            </InputGroup>
        </FormControl>
        <FormControl id='pic'>
            <FormLabel>Upload Your Picture</FormLabel>
            <Input 
                type='file'
                p={1.5}
                accept='image/*'
                onChange={(e) => postDetails(e.target.files[0])}
            />
        </FormControl>
        <Button
            colorScheme='blue'
            width='100%'
            style={{marginTop: 15}}
            onClick={submitHandler}
            isLoading={loading}
        >
            Sign Up
        </Button>
    </VStack>
  )
}

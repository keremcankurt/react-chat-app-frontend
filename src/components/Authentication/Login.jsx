import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack, useToast } from '@chakra-ui/react'
import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Login() {
    const [show, setShow] = useState(false)
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()
    const toast = useToast()
    const submitHandler = async() => {
        setLoading(true)
        if(!email || !password){
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
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                }
            }
            const { data } = await axios.post('/api/user/login',{email, password}, config)
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
        <FormControl isRequired>
            <FormLabel>Email</FormLabel>
            <Input
                placeholder='Enter Your Email'
                onChange={(e) => setEmail(e.target.value)}
                value={email}
            />
        </FormControl>
        <FormControl isRequired>
            <FormLabel>Password</FormLabel>
            <InputGroup>
                <Input
                    type={show ? 'text' : 'password'}
                    placeholder='Password'
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                />
                <InputRightElement width='4.5rem'>
                    <Button h='1.75rem' size='sm' onClick={() => setShow(!show)}>{show ? 'Hide' : 'Show'}</Button>
                </InputRightElement>
            </InputGroup>
        </FormControl>
        <Button
            colorScheme='blue'
            width='100%'
            style={{marginTop: 15}}
            onClick={submitHandler}
            isLoading={loading}
        >
            Login
        </Button>
        <Button
            colorScheme='red'
            variant='solid'
            width='100%'
            style={{marginTop: 15}}
            onClick={() => {
                setEmail('guest@example.com');
                setPassword('123456')
            }}
            isLoading={loading}
        >
            Get Guest User Credentials
        </Button>
    </VStack>
  )
}

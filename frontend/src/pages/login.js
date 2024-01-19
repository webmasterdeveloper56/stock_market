// Import necessary dependencies
import React, { useState } from 'react';
import {
    Box,
    FormControl,
    FormLabel,
    Input,
    Button,
    VStack,
    Alert,
    AlertIcon,
    HStack,
} from '@chakra-ui/react';
import { useAuth } from '../context/authContext';
import { Link } from 'react-router-dom';
import { userLogin } from '../services/apiAction';

export const Login = () => {
    // State to manage input values
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // State for error handling
    const [error, setError] = useState('');
    const { login } = useAuth()
    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await userLogin({email, password});
            if(res.status == 'success') {
                login({...res.data})
            } else {
                setError('Invalid email or password');
            }
        } catch(error) {
            setError("server error!")
        }
    };

    return (
        <VStack spacing={4} align="center" justifyContent={'center'} height={'100vh'}>
            <Box maxW="md" p={8} borderWidth={1} borderRadius={8} boxShadow="lg">
                <form onSubmit={handleSubmit}>
                    <FormControl>
                        <FormLabel>Email address</FormLabel>
                        <Input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </FormControl>
                    <FormControl mt={4}>
                        <FormLabel>Password</FormLabel>
                        <Input
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </FormControl>
                    {error && (
                        <Alert status="error" mt={4}>
                            <AlertIcon />
                            {error}
                        </Alert>
                    )}
                    <HStack justifyContent={'space-around'} alignItems={'flex-end'}>
                        <Button colorScheme="blue" mt={4} type="submit">
                            Login
                        </Button>
                        <Link to={"/register"}>Register</Link>
                    </HStack>
                </form>
            </Box>
        </VStack>
    );
};

// Register.js
import React, { useState } from 'react';
import {
    Box,
    Button,
    FormControl,
    FormLabel,
    HStack,
    Input,
    Text,
    VStack,
} from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import { userRegister } from '../services/apiAction';

export const Register = () => {
    const [formData, setFormData] = useState({ username: '',userEmail:'', password: '' });
    const [registrationError, setRegistrationError] = useState(null);
    const navigate = useNavigate()
    const handleRegister = async () => {
        try {
            if(formData.password == formData.confirmPassword) {
                try{
                    const res = await userRegister({...formData});
                    if(res == 'success') {
                        setRegistrationError(null);
                        navigate('/login')    
                    } else {
                        setRegistrationError(res);
                    }
                } catch(error) {
                    setRegistrationError("Registration failed. Please try again.")    
                }
            } else {
                setRegistrationError("Registration failed. Please try again.")
            }
        } catch (error) {
            setRegistrationError('Registration failed. Please try again.');
        }
    };

    return (
        <VStack spacing={4} align="center">
            <Box p={8} borderWidth={1} borderRadius="lg">
                <Text fontSize="xl" mb={4}>
                    Register
                </Text>
                {registrationError && (
                    <Text color="red.500" mb={4}>
                        {registrationError}
                    </Text>
                )}
                <FormControl id="username" isRequired>
                    <FormLabel>Username</FormLabel>
                    <Input
                        type="text"
                        value={formData.username}
                        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    />
                </FormControl>
                <FormControl id="userEmail" isRequired>
                    <FormLabel>user Email</FormLabel>
                    <Input
                        type="email"
                        value={formData.userEmail}
                        onChange={(e) => setFormData({ ...formData, userEmail: e.target.value })}
                    />
                </FormControl>
                <FormControl id="password" isRequired mt={4}>
                    <FormLabel>Password</FormLabel>
                    <Input
                        type="password"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    />
                </FormControl>
                <FormControl id="confirmPassword" isRequired mt={4}>
                    <FormLabel>ConfirmPassword</FormLabel>
                    <Input
                        type="password"
                        value={formData.confirmPassword}
                        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    />
                </FormControl>
                <HStack alignItems={'flex-end'} justifyContent={'space-around'}>
                    <Button colorScheme="teal" mt={4} onClick={handleRegister}>
                        Register
                    </Button>

                    <Link to= "/login" > Login</Link>
                </HStack>
            </Box>
        </VStack>
    );
};

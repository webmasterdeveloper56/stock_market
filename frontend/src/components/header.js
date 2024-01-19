import { Button, HStack, Menu, MenuButton, MenuItem, MenuList, Text } from "@chakra-ui/react"
import { useAuth } from "../context/authContext"
import { useNavigate } from "react-router-dom";
import BuyModal from "./confirmModal";
import { useState } from "react";

export const Header = () =>{
    const { user, logout } = useAuth();
    const [isOpen , setOpenModal] = useState(false)
    const navigate = useNavigate()
    const handleLogout = () => {
        logout()
    }

    return (
        <HStack width={'100%'} justifyContent={'space-around'} bgColor={'rgba(30,104,138,1)'} height={'75px'}>
            <Text width={'50%'} fontSize={'28px'} color={'white'}>Stock Exchange</Text>
            <HStack alignItems={'center'} justifyContent={'right'}>
                {/* <Button onClick={()=>setOpenModal(true)} >Make Order</Button> */}
                <Menu>
                    <MenuButton color={'white'}> {user.name}</MenuButton>
                    <MenuList>
                        <MenuItem onClick={()=> navigate('/profile')}>profile</MenuItem>
                        <MenuItem onClick={handleLogout}>Log Out</MenuItem>
                        <MenuItem onClick={() => navigate('/')}>Home</MenuItem>
                    </MenuList>
                </Menu>
            </HStack>
            <BuyModal isOpen={isOpen} onClose={()=>setOpenModal(false)}/>
        </HStack>
    )
}
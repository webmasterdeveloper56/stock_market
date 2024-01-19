import { Button, HStack, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, Spacer, useDisclosure } from "@chakra-ui/react";
import React, { useState } from "react";
import { setOrders } from "../services/apiAction";
import { useAuth } from "../context/authContext";

const stocks = [
    {
        id: 0,
        name: 'stock0',
    },
    {
        id: 1,
        name: 'stock1',
    },
    {
        id: 2,
        name: 'stock2',
    },
    {
        id: 3,
        name: 'stock3',
    },
    {
        id: 4,
        name: 'stock4',
    }
]

const SellModal = ({ isOpen, onClose, data }) => {
    const [amount, setAmount] = useState(0)
    const [price, setPrice] = useState(0)
    const [error, setError] = useState("")
    const { user } = useAuth()
    const confirmHandle = async () => {
        if (amount > data.amount) {
            return
        }
        const returnData = await setOrders({
            userId: user.id,
            type: 'sell',
            stockId: data.stockId,
            stockName: data.stockName,
            amount: amount,
            price: price
        })
        if (returnData.status == "success") {
            onClose()
        } else {

        }
    };


    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered >
            <ModalOverlay />
            <ModalContent width={'300px'} borderRadius={20} alignItems="center">
                <ModalHeader >Sell {data.stockName}</ModalHeader>
                <ModalCloseButton />
                <ModalBody style={{ display: "flex", flexDirection: "column", justifyContent: "flex-start" }} mt={"-20px"} alignItems={'center'}>
                    <div style={{ color: 'red' }}>{error}</div>
                    <HStack justifyContent={'space-around'} width={'100%'} mt={'15px'}>
                        <label style={{ width: '100px' }}>amount : </label>
                        <Spacer />
                        <Input value={amount} onChange={(e) => {
                            setAmount(e.target.value)
                            if (e.target.value > data.amount) {
                                setError("Exceed total amount!")
                            } else {
                                setError("")
                            }
                        }} >
                        </Input>
                    </HStack>
                    <HStack justifyContent={'space-around'} width={'100%'} mt={'15px'}>
                        <label style={{ width: '100px' }}>Price :</label>
                        <Input value={price} onChange={(e) => setPrice(e.target.value)} ></Input>
                    </HStack>
                </ModalBody>
                <ModalFooter style={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
                    <Button bgColor="#914EC6" color={'white'} onClick={confirmHandle} width={"80%"}>
                        Make order
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default SellModal;
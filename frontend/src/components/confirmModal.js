import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, Spacer, useDisclosure } from "@chakra-ui/react";
import React from "react";

const ConfirmModal = ({ isOpen, onClose, confirmHandler, type}) => {
    const onConfirm = async () => {
        confirmHandler(type)
    };


    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered >
            <ModalOverlay />
            <ModalContent width={'300px'} borderRadius={20} alignItems="center">
                <ModalHeader >Order Stocks</ModalHeader>
                <ModalCloseButton />
                <ModalBody style={{ display: "flex", flexDirection: "column", justifyContent: "flex-start" }} mt={"-20px"} alignItems={'center'}>
                    Are you sure to proceed?
                </ModalBody>
                <ModalFooter style={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
                    <Button bgColor="#914EC6" color={'white'} onClick={onConfirm} width={"80%"}>
                        Make order
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default ConfirmModal;
import React, { ReactChild } from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    Button
} from '@chakra-ui/react';

interface ConfirmDialogProps {
    isOpen: boolean
    onCancel: () => void
    message: string
    onConfirm: () => void
    children: ReactChild
}

const PromptDialog: React.FC<ConfirmDialogProps> = ({ isOpen, onCancel, message, onConfirm, children }) => {
    const initialRef = React.useRef(null)
    const finalRef = React.useRef(null)

    return (
        <Modal
            initialFocusRef={initialRef}
            finalFocusRef={finalRef}
            isOpen={isOpen}
            onClose={onCancel}
            isCentered
            motionPreset='slideInBottom'
        >
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>{message}</ModalHeader>
                <ModalCloseButton />

                <ModalBody>
                    {children}
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme="messenger" mr={3} onClick={onConfirm}>Save</Button>
                    <Button onClick={onCancel}>Cancel</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default PromptDialog;

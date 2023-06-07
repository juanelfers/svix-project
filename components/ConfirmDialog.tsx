import React from 'react';
import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    AlertDialogCloseButton,
    Button,
} from '@chakra-ui/react';

interface ConfirmDialogProps {
    isOpen: boolean
    onClose: () => void
    message: string
    onConfirm: () => void
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({ isOpen, onClose, message, onConfirm }) => {
    const cancelRef = React.useRef<HTMLInputElement>(null)

    return (
        <AlertDialog
            motionPreset='slideInBottom'
            leastDestructiveRef={cancelRef}
            onClose={onClose}
            isOpen={isOpen}
            isCentered
        >
            <AlertDialogOverlay />

            <AlertDialogContent>
                <AlertDialogHeader>Confirm</AlertDialogHeader>
                <AlertDialogCloseButton />
                <AlertDialogBody>
                    {message}
                </AlertDialogBody>
                <AlertDialogFooter>
                    <Button onClick={onClose}>
                        No
                    </Button>
                    <Button colorScheme='red' ml={3} onClick={onConfirm}>
                        Yes
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default ConfirmDialog;

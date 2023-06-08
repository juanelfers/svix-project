import { useState } from 'react';
import {
    Box,
    FormControl,
    FormLabel,
    ButtonGroup,
    Button,
    Input,
    Textarea,
    Spinner,
    useDisclosure
} from '@chakra-ui/react';

import PromptDialog from './PromptDialog';

import { EventType } from '../interfaces';

const isValidForm = (eventType: EventType) => Object.values(eventType).every(Boolean);

interface AddEventFormProps {
    onNewEvent: (name: string, description: string) => void
    isOpen: boolean
    onClose: () => void
}

const AddEventForm: React.FC<AddEventFormProps> = ({ onNewEvent, isOpen, onClose }) => {
    const [eventType, setEventType] = useState<EventType>({ name: '', description: '' })

    const handleSubmit = () => {
        if (!isValidForm(eventType)) return;

        // Push event
        const { name, description } = eventType;
        onNewEvent(name, description);

        // Resets state
        setEventType({ name: '', description: '' });
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setEventType(event => ({ ...event, [e.target.name]: e.target.value }));
    }

    return (
        <PromptDialog
            isOpen={isOpen}
            onCancel={onClose}
            message="Add new event"
            onConfirm={handleSubmit}>
            <FormControl>
                <FormLabel>
                    Event Type Name
                    <Input
                        value={eventType.name}
                        type='text'
                        name="name"
                        mt="2"
                        placeholder="Max 256 chars"
                        onChange={handleChange} />
                </FormLabel>

                <FormLabel>
                    Description
                    <Textarea
                        value={eventType.description}
                        name="description"
                        mt="2"
                        placeholder="Describe your hook here"
                        resize="none"
                        onChange={handleChange} />
                </FormLabel>

            </FormControl>
        </PromptDialog>
    )
}

export default AddEventForm;

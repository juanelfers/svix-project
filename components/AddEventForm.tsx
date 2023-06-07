import { useState } from 'react';
import {
    Box,
    FormControl,
    FormLabel,
    ButtonGroup,
    Button,
    Input,
    Textarea,
    Divider,
    Spinner
} from '@chakra-ui/react';

import { EventType } from '../interfaces';

const isValidForm = (eventType: EventType) => Object.values(eventType).every(Boolean);

interface AddEventFormProps {
    onNewEvent: (name: string, description: string) => void
}

const AddEventForm: React.FC<AddEventFormProps> = ({ onNewEvent }) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [eventType, setEventType] = useState<EventType>({ name: '', description: '' })

    const handleSubmit = async (event: React.SyntheticEvent) => {
        event.preventDefault();
        setLoading(true);

        // Push event
        const { name, description } = eventType;
        await onNewEvent(name, description);

        // Resets state
        setLoading(false);
        setEventType({ name: '', description: '' });
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setEventType(event => ({ ...event, [e.target.name]: e.target.value }));
    }

    return (
        <Box as="form" onSubmit={handleSubmit}>
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
                        onChange={handleChange} />
                </FormLabel>

                <Divider my="4" />

                <ButtonGroup>
                    <Button type="submit" colorScheme="messenger" isDisabled={loading || !isValidForm(eventType)}>
                        {loading && <Spinner size='sm' mr="2" />}
                        Create
                    </Button>
                </ButtonGroup>
            </FormControl>
        </Box>
    )
}

export default AddEventForm;

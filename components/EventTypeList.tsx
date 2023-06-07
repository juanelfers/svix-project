import { useState, useEffect } from 'react'
import {
    ListItem,
    UnorderedList,
    Button,
    Flex,
    ButtonGroup,
    Spacer,
    useDisclosure,
    FormLabel,
    Textarea,
    Text
} from '@chakra-ui/react'

import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
} from '@chakra-ui/react'

import svix from '../lib/svix';
import { EventType } from '../interfaces';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';

interface EventTypeListProps {
    list: EventType[]
    getEventList: Function
}

const EventTypeList: React.FC<EventTypeListProps> = ({ list, getEventList }) => {
    const confirm = useDisclosure();
    const prompt = useDisclosure();

    const [pendingDelete, setPendingDelete] = useState<string>('');
    const [pendingEdit, setPendingEdit] = useState<number | null>(null);
    const [description, setDescription] = useState<string>('');

    useEffect(() => {
        if (pendingEdit !== null) {
            setDescription(list[pendingEdit].description);
        } else {
            setDescription('')
        }
    }, [pendingEdit])

    const deleteRequest = (index: number) => {
        confirm.onOpen();
        setPendingDelete(list[index].name);
    };

    const editRequest = (index: number) => {
        setPendingEdit(index);
        prompt.onOpen();
    };

    const onConfirmClose = () => {
        confirm.onClose();
        setPendingDelete('');
    };

    const onPromptClose = () => {
        prompt.onClose();
        setPendingEdit(null);
    };

    const handleDelete = async () => {
        await svix.delete(pendingDelete);
        await getEventList();
        setPendingDelete('');
        confirm.onClose();
    };

    const handleEdit = async () => {
        if (pendingEdit === null) return;

        const { name } = list[pendingEdit];
        await svix.update(name, description);
        await getEventList();
        setPendingEdit(null);
        prompt.onClose();
    };

    return (
        <>
            <Table>
                <Thead>
                    <Th>Name</Th>
                    <Th>Description</Th>
                    <Th>Actions</Th>
                </Thead>
                <Tbody>
                    {list.map(({ name, description }: EventType, index: number) => (
                        <Tr key={name}>
                            <Td>
                                <strong>{name}</strong>
                            </Td>
                            <Td>
                                <em>{description}</em>
                            </Td>
                            <Td>
                                <ButtonGroup py="1">
                                    <Button
                                        size="sm"
                                        colorScheme="messenger"
                                        onClick={() => editRequest(index)}><EditIcon /></Button>
                                    <Button
                                        size="sm"
                                        colorScheme="messenger"
                                        onClick={() => deleteRequest(index)}><DeleteIcon /></Button>
                                </ButtonGroup>
                            </Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </>
    )
}

export default EventTypeList;

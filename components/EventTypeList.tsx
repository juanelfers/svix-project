import {
    Button,
    ButtonGroup,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Spinner
} from '@chakra-ui/react'

import { EventType } from '../interfaces';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';

interface EventTypeListProps {
    list: EventType[]
    editRequest: Function
    deleteRequest: Function
}

const EventTypeList: React.FC<EventTypeListProps> = ({ list, editRequest, deleteRequest }) => {
    return (
        <>
            <Table>
                <Thead>
                    <Tr>
                        <Th>Name</Th>
                        <Th>Description</Th>
                        <Th>Actions</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {!list.length && (
                        <Tr>
                            <Td colSpan={3}><Spinner size='sm' mr="2" /> Loading...</Td>
                        </Tr>
                    )}
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

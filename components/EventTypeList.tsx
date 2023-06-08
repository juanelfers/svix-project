import {
    Button,
    ButtonGroup,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Spinner,
    Text,
    Box
} from '@chakra-ui/react'

import { EventType } from '../interfaces';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';

interface EventTypeListProps {
    list: EventType[]
    editRequest: Function
    deleteRequest: Function
}

const EventTypeList: React.FC<EventTypeListProps> = ({ list, editRequest, deleteRequest }) => {
    if (!list.length) {
        return (
            <Box textAlign="center">
                <Spinner size='sm' mr="2" />
            </Box>
        );
    }

    return (
        <>
            {/*<Text>
                {!list.length ? 'Loading...' : (
                    list.length + 'events'
                )}
            </Text>*/}
            <Table>
                <Thead>
                    <Tr>
                        <Th pl={0}>Name</Th>
                        <Th>Description</Th>
                        <Th pr={0} textAlign="right">Actions</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {list.map(({ name, description }: EventType, index: number) => (
                        <Tr key={name}>
                            <Td pl={0}><strong>{name}</strong></Td>
                            <Td><em>{description}</em></Td>
                            <Td pr={0}>
                                <ButtonGroup display="flex" justifyContent="flex-end">
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

import Layout from '../components/Layout'
import { useState, useCallback, useEffect } from 'react';
import {
  Heading,
  useDisclosure,
  FormLabel,
  Textarea,
  Button
} from '@chakra-ui/react';
import EventTypeList from '../components/EventTypeList';

import ConfirmDialog from '../components/ConfirmDialog';
import PromptDialog from '../components/PromptDialog';
import AddEventForm from '../components/AddEventForm'

import { EventType } from '../interfaces';
import svix from '../lib/svix';

const IndexPage = () => {
  const [list, setList] = useState<EventType[]>([]);

  const getEventList = useCallback(async () => {
    const list = await svix.list();
    setList(list.data)
  }, []);

  const handleNewEvent = async (name: string, description: string) => {
    await svix.create(name, description);
    await getEventList();
    newEventDialog.onClose();
  };

  const confirm = useDisclosure();
  const prompt = useDisclosure();
  const newEventDialog = useDisclosure();

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

  useEffect(() => {
    getEventList();
  }, []);

  return (
    <Layout title="Svix Event Types Manager">
      <Heading mb={12}>Event Types</Heading>
      <EventTypeList list={list} editRequest={editRequest} deleteRequest={deleteRequest} />

      {/* Delete confirm dialog */}
      <ConfirmDialog
        isOpen={confirm.isOpen}
        onClose={onConfirmClose}
        message="Do you want to delete this event?"
        onConfirm={handleDelete} />

      {/* Edit dialog */}
      <PromptDialog
        isOpen={prompt.isOpen}
        onCancel={onPromptClose}
        message="Edit description"
        onConfirm={handleEdit}>
        <FormLabel>
          Description
          <Textarea
            mt="2"
            value={description}
            name="description"
            onChange={event => setDescription(event.target.value)} />
        </FormLabel>
      </PromptDialog>

      {/* New event dialog */}
      <Button
        position="absolute"
        rounded="100%"
        right={-10}
        bottom={-10}
        width={20}
        height={20}
        fontSize="2xl"
        colorScheme="gray"
        shadow="md"
        onClick={newEventDialog.onOpen}>+</Button>
      <AddEventForm onNewEvent={handleNewEvent} isOpen={newEventDialog.isOpen} onClose={newEventDialog.onClose} />
    </Layout>
  );
};

export default IndexPage

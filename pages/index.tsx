import Layout from '../components/Layout'
import { useState, useCallback, useEffect } from 'react';
import {
  Heading,
  useDisclosure,
} from '@chakra-ui/react';
import EventTypeList from '../components/EventTypeList';

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
    getEventList();
  };

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


  useEffect(() => {
    getEventList();
  }, []);

  return (
    <Layout title="Svix Event Types Manager">
      <Heading mb={4}>Event Type List</Heading>
      <EventTypeList list={list} editRequest={editRequest} deleteRequest={deleteRequest} />
    </Layout>
  );
};

export default IndexPage

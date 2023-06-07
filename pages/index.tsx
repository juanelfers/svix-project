import Layout from '../components/Layout'
import { useState, useCallback, useEffect } from 'react';
import { Heading } from '@chakra-ui/react';
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

  useEffect(() => {
    getEventList();
  }, []);

  return (
    <Layout title="Svix Event Types Manager">
      <Heading mb={4}>Event Type List</Heading>
      <EventTypeList list={list} getEventList={getEventList} />
    </Layout>
  );
};

export default IndexPage

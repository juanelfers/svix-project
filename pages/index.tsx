import Layout from '../components/Layout'
import { useState, useCallback, useEffect } from 'react';
import { Box, Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
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
      <Tabs>
        <TabList>
          <Tab>Events</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <EventTypeList list={list} getEventList={getEventList} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Layout>
  );
};

export default IndexPage

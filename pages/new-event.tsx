import Layout from '../components/Layout'
import AddEventForm from '../components/AddEventForm'
import svix from '../lib/svix';

const NewEvent = () => {
    const handleNewEvent = async (name: string, description: string) => {
        await svix.create(name, description);
    };

    return (
        <Layout title="Svix Event Types Manager">
            <AddEventForm onNewEvent={handleNewEvent} />
        </Layout>
    )
}

export default NewEvent;

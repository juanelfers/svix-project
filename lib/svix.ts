import { Svix } from "svix";

const svix = new Svix("testsk_A4mkqV-RNi68IVQ3Z-TC7JoWwk2DdWes.eu");

const validName = (name: string) => name.length <= 256 && /^[a-zA-Z0-9\-_.]+$/.test(name)

const lib = {
    list: async function () {
        return await svix.eventType.list({ limit: 20 });
    },
    create: async function (name: string, description: string) {
        if (!validName(name)) return console.log('Invalid name');

        return svix.eventType.create({ name, description });
    },
    update: async function (name: string, description: string) {
        return svix.eventType.update(name, { description });
    },
    delete: async function (name: string) {
        return svix.eventType.delete(name);
    }
};

export default lib;


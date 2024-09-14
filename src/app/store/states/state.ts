import { AppState } from "../interfaces/app.interface";

export const appState: AppState = {
    services: [
        { name: 'API', icon: '/home.png' },
        { name: 'Storage', icon: '/news.png' },
        { name: 'Validation', icon: '/binoculars.png' },
        { name: 'Schema', icon: '/file.png' },
    ],

    api: [ { _id: '1', name: '/commits', action: 'get' } ],
    storage: [{ _id: '1', name: 'Commits' }],
    validation: [{ _id: '1', name: 'Commit Name', field: 'body' }],
    schema: [{ _id: '1', name: 'Commit' }],

    view: { service: '', serviceDataId: '' }
};

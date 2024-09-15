import { AppState } from "../interfaces/app.interface";

export const appState: AppState = {
    services: [
        { name: 'API', icon: '/news.png' },
        { name: 'Storage', icon: '/folder.png' },
        { name: 'Schema', icon: '/tool.png' },
        { name: 'Validation', icon: '/binoculars.png' },
    ],

    api: [ { _id: '1', name: '/commits', action: 'get' } ],
    storage: [{ _id: '2', name: 'commits' }],
    schema: [{ _id: '3', name: 'Commit' }],
    validation: [{ _id: '4', name: 'commit name is alpha', field: 'param' }],

    view: { service: 'Validation', serviceDataId: '4' }
};

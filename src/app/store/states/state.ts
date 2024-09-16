import { AppState } from "../interfaces/app.interface";

export const appState: AppState = {
    services: [
        { name: 'API', icon: '/news.png' },
        { name: 'Storage', icon: '/folder.png' },
        { name: 'Schema', icon: '/tool.png' },
        { name: 'Validator', icon: '/binoculars.png' },
    ],

    api: [ { _id: '1', date: '', name: '/commits', action: 'get' } ],
    storage: [{ _id: '2', date: '', name: 'commits' }],
    schema: [{ _id: '3', date: '', name: 'Commit' }],
    validator: [{ _id: '4', date: '', name: 'commit name is alpha', field: 'param' }],

    view: { service: '', serviceDataId: '' }
};

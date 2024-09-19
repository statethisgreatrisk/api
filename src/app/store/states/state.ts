import { AppState } from "../interfaces/app.interface";

export const appState: AppState = {
    services: [
        { name: 'API', icon: '/news.png' },
        { name: 'Storage', icon: '/folder.png' },
        { name: 'Schema', icon: '/tool.png' },
        { name: 'Validator', icon: '/binoculars.png' },
    ],

    api: [{ _id: '1', date: '', name: 'Endpoint 1', action: '', url: '', validators: [] }],
    storage: [{ _id: '2', date: '', name: 'Collection 1', schema: '' }],
    schema: [{ _id: '3', date: '', name: 'Schema 1', keys: [] }],
    validator: [{ _id: '4', date: '', name: 'Validator 1', field: 'param', path: '', validation: '' }],

    view: { service: 'Validator', serviceDataId: '4' }
};

import { AppState } from "../interfaces/app.interface";

export const appState: AppState = {
    services: [
        { name: 'Workflow', icon: '/workflow.png' },
        { name: 'API', icon: '/news.png' },
        { name: 'Storage', icon: '/folder.png' },
        { name: 'Schema', icon: '/tool.png' },
        { name: 'Validator', icon: '/binoculars.png' },
    ],

    api: [],
    storage: [],
    schema: [],
    validator: [],
    workflow: [],

    view: { service: '', serviceDataId: '', window: '', windowId: '' },
};

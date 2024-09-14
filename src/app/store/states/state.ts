import { AppState } from "../interfaces/app.interface";

export const appState: AppState = {
    services: [
        { name: 'API', icon: '/home.png' },
        { name: 'Storage', icon: '/news.png' },
        { name: 'Validation', icon: '/binoculars.png' },
        { name: 'Schema', icon: '/file.png' },
    ],

    api: [ { name: '/commits', action: 'get' } ],
    storage: [{ name: 'Commits' }],
    validation: [{ name: 'Commit Name', field: 'body' }],
    schema: [{ name: 'Commit' }],

    view: { service: 'API' }
};

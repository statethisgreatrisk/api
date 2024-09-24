import { AppState } from "../interfaces/app.interface";

export const appState: AppState = {
    apis: [],
    storages: [],
    schemas: [],
    validators: [],
    workflows: [],
    apps: [],

    user: null,
    view: { service: '', serviceId: '', window: 'Workflow', windowId: '1' },
};

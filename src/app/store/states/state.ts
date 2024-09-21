import { AppState } from "../interfaces/app.interface";

export const appState: AppState = {
    apis: [],
    storages: [],
    schemas: [],
    validators: [],
    workflows: [],

    user: null,
    view: { service: '', serviceId: '', window: '', windowId: '' },
};

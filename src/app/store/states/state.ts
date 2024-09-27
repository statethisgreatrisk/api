import { AppState } from "../interfaces/app.interface";

export const appState: AppState = {
    apis: [],
    storages: [],
    schemas: [],
    validators: [],
    workflows: [],
    apps: [],

    deploys: [],
    logs: [],
    keys: [],
    billings: [],
    usages: [],

    user: null,
    view: { service: '', serviceId: '', window: '', windowId: '' },
};

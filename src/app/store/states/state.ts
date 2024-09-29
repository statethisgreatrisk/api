import { AppState } from "../interfaces/app.interface";

export const appState: AppState = {
    projects: [],
    apps: [],
    
    apis: [],
    storages: [],
    schemas: [],
    validators: [],
    workflows: [],
    fns: [],
    objs: [],

    deploys: [],
    logs: [],
    keys: [],
    billings: [],
    usages: [],

    user: null,
    view: { service: '', serviceId: '', window: '', windowId: '' },
};

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
    requests: [],
    documents: [],

    instances: [],
    deploys: [],
    logs: [],
    keys: [],
    billings: [],
    usages: [],
    subs: [],

    user: null,
    view: { service: '', serviceId: '', window: '', windowId: '' },
};

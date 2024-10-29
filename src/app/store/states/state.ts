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
    variables: [],
    websockets: [],
    queues: [],
    schedulers: [],
    registers: [],
    documents: [],
    argtypes: [],

    instances: [],
    deploys: [],
    logs: [],
    jobs: [],
    keys: [],
    billings: [],
    usages: [],
    subs: [],

    user: null,
    view: { service: '', serviceId: '', window: '', windowId: '' },
};

import { AppState } from "../interfaces/app.interface";

export const appState: AppState = {
    projects: [],
    
    apis: [],
    storages: [],
    schemas: [],
    validators: [],
    codes: [],
    chats: [],
    fns: [],
    requests: [],
    variables: [],
    websockets: [],
    queues: [],
    schedulers: [],
    registers: [],
    documents: [],

    instances: [],
    deploys: [],
    logs: [],
    jobs: [],
    keys: [],
    billings: [],
    usages: [],
    subs: [],
    pools: [],

    user: null,
    view: { service: '', serviceId: '', window: '', windowId: '' },
};

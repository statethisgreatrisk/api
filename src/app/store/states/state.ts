import { AppState } from "../interfaces/app.interface";

export const appState: AppState = {
    api: [],
    storage: [],
    schema: [],
    validator: [],
    workflow: [],

    user: null,
    view: { service: '', serviceDataId: '', window: '', windowId: '' },
};

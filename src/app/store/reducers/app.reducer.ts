import { AppState } from "../interfaces/app.interface";

export const logFn: (state: AppState, any: any) => AppState = (state: AppState, any: any) => {
    return { ...state };
}

export const selectServiceFn: (state: AppState, name: string) => AppState = (state: AppState, name: string) => {
    if (!name) return { ...state };

    return { ...state, view: { ...state.view, service: name} };
}

export const selectServiceDataFn: (state: AppState, serviceDataId: string) => AppState = (state: AppState, serviceDataId: string) => {
    if (!serviceDataId) return { ...state };

    return { ...state, view: { ...state.view, serviceDataId } };
}

export const deselectServiceDataFn: (state: AppState) => AppState = (state: AppState) => {
    return { ...state, view: { ...state.view, serviceDataId: '' } };
}

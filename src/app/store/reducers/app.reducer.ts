import { AppState } from "../interfaces/app.interface";

export const logFn: (state: AppState, any: any) => AppState = (state: AppState, any: any) => {
    return { ...state };
}

export const selectServiceFn: (state: AppState, name: string) => AppState = (state: AppState, name: string) => {
    if (!name) return { ...state };

    return { ...state, view: { ...state.view, service: name} };
}

import { AppState } from "../interfaces/app.interface";

export const logFn: (state: AppState, any: any) => AppState = (state: AppState, any: any) => {
    return { ...state };
}

export const selectServiceFn: (state: AppState, serviceName: string, serviceDataId: string) => AppState = (state: AppState, serviceName: string, serviceDataId: string) => {
    if (!serviceName || !serviceDataId) return { ...state };

    return { ...state, view: { service: serviceName, serviceDataId } };
}

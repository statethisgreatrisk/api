import { AppState } from "../interfaces/app.interface";

export const logFn: (state: AppState, any: any) => AppState = (state: AppState, any: any) => {
    return { ...state };
}

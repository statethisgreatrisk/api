import { createReducer, on } from "@ngrx/store";
import { appState } from "../states/state";
import { log, selectService } from "../actions/app.action";
import { logFn, selectServiceFn } from "./app.reducer";

export const appStateReducer = createReducer(
    appState,
    on(log, (state, { any }) => logFn(state, any)),
    on(selectService, (state, { serviceName, serviceDataId }) => selectServiceFn(state, serviceName, serviceDataId)),
);

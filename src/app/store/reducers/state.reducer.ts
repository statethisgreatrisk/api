import { createReducer, on } from "@ngrx/store";
import { appState } from "../states/state";
import { deselectServiceData, log, selectService, selectServiceData } from "../actions/app.action";
import { deselectServiceDataFn, logFn, selectServiceDataFn, selectServiceFn } from "./app.reducer";

export const appStateReducer = createReducer(
    appState,
    on(log, (state, { any }) => logFn(state, any)),
    on(selectService, (state, { name }) => selectServiceFn(state, name)),
    on(selectServiceData, (state, { serviceDataId }) => selectServiceDataFn(state, serviceDataId)),
    on(deselectServiceData, (state) => deselectServiceDataFn(state)),
);

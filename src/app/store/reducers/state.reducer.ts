import { createReducer, on } from "@ngrx/store";
import { appState } from "../states/state";
import { log } from "../actions/app.action";
import { logFn } from "./app.reducer";

export const appStateReducer = createReducer(
    appState,
    on(log, (state, { any }) => logFn(state, any)),
);

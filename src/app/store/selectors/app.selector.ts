import { createSelector } from "@ngrx/store";
import { AppState, AppStateInit } from "../interfaces/app.interface";

export const selectApp = (state: AppStateInit) => state.app;

export const selectUser = createSelector(selectApp, (state: AppState) => state.user);
export const selectView = createSelector(selectApp, (state: AppState) => state.view);
export const selectAPIs = createSelector(selectApp, (state: AppState) => state.apis);
export const selectStorages = createSelector(selectApp, (state: AppState) => state.storages);
export const selectSchemas = createSelector(selectApp, (state: AppState) => state.schemas);
export const selectValidators = createSelector(selectApp, (state: AppState) => state.validators);
export const selectWorkflows = createSelector(selectApp, (state: AppState) => state.workflows);
export const selectApps = createSelector(selectApp, (state: AppState) => state.apps);

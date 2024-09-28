import { createSelector } from "@ngrx/store";
import { API, Storage, AppState, AppStateInit, Schema, Validator, Billing, Deploy, Key, Log, Usage, Workflow } from "../interfaces/app.interface";

export const selectApp = (state: AppStateInit) => state.app;

export const selectUser = createSelector(selectApp, (state: AppState) => state.user);
export const selectView = createSelector(selectApp, (state: AppState) => state.view);
export const selectApps = createSelector(selectApp, (state: AppState) => state.apps);

export const selectProjects = createSelector(selectApp, (state: AppState) => state.projects);
export const selectMainProject = createSelector(selectApp, (state: AppState) => state.projects[0]);

export const selectAPIs = createSelector(selectApp, (state: AppState) => state.apis);
export const selectStorages = createSelector(selectApp, (state: AppState) => state.storages);
export const selectSchemas = createSelector(selectApp, (state: AppState) => state.schemas);
export const selectValidators = createSelector(selectApp, (state: AppState) => state.validators);
export const selectWorkflows = createSelector(selectApp, (state: AppState) => state.workflows);
export const selectDeploys = createSelector(selectApp, (state: AppState) => state.deploys);
export const selectLogs = createSelector(selectApp, (state: AppState) => state.logs);
export const selectKeys = createSelector(selectApp, (state: AppState) => state.keys);
export const selectBillings = createSelector(selectApp, (state: AppState) => state.billings);
export const selectUsages = createSelector(selectApp, (state: AppState) => state.usages);

export const selectProjectAPIs = (projectId: string) => createSelector(selectAPIs, (apis: API[]) => apis.filter((api) => projectId === api.projectId));
export const selectProjectStorages = (projectId: string) => createSelector(selectStorages, (storages: Storage[]) => storages.filter((storage) => projectId === storage.projectId));
export const selectProjectSchemas = (projectId: string) => createSelector(selectSchemas, (storages: Schema[]) => storages.filter((storage) => projectId === storage.projectId));
export const selectProjectValidators = (projectId: string) => createSelector(selectValidators, (validators: Validator[]) => validators.filter((validator) => projectId === validator.projectId));
export const selectProjectWorkflows = (projectId: string) => createSelector(selectWorkflows, (workflows: Workflow[]) => workflows.filter((workflow) => projectId === workflow.projectId));
export const selectProjectDeploys = (projectId: string) => createSelector(selectDeploys, (deploys: Deploy[]) => deploys.filter((deploy) => projectId === deploy.projectId));
export const selectProjectLogs = (projectId: string) => createSelector(selectLogs, (logs: Log[]) => logs.filter((log) => projectId === log.projectId));
export const selectProjectKeys = (projectId: string) => createSelector(selectKeys, (keys: Key[]) => keys.filter((key) => projectId === key.projectId));
export const selectProjectBillings = (projectId: string) => createSelector(selectBillings, (billings: Billing[]) => billings.filter((billing) => projectId === billing.projectId));
export const selectProjectUsages = (projectId: string) => createSelector(selectUsages, (usages: Usage[]) => usages.filter((usage) => projectId === usage.projectId));
